import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { userService, supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  email: string | null;
  isOTPSent: boolean;
  isVerifying: boolean;
  register: (email: string, fullName: string, phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      sessionStorage.setItem('auth_user', JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem('auth_user');
    }
  };

  // ✅ Initialize session on app load
  useEffect(() => {
    const initializeSession = async () => {
      try {
        setLoading(true);

        // Check for existing Supabase session
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          console.log('[Auth] Session restored from Supabase:', data.session.user.id);
          const userProfile = await userService.getUserProfile(data.session.user.id);
          if (userProfile.data) {
            setUserState(userProfile.data);
            setEmail(data.session.user.email || null);
          }
        } else {
          // Check for stored auth state in sessionStorage
          const storedEmail = sessionStorage.getItem('verified_email');
          const storedOtpStatus = sessionStorage.getItem('otp_verified');
          
          if (storedEmail && storedOtpStatus === 'true') {
            console.log('[Auth] Restored OTP verification state from storage:', storedEmail);
            setEmail(storedEmail);
            setIsOTPSent(false); // OTP already verified
          }
        }
      } catch (err) {
        console.error('[Auth] Session initialization error:', err);
        // Don't show error to user on initialization
      } finally {
        setLoading(false);
      }
    };

    initializeSession();

    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('[Auth] Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          try {
            const userProfile = await userService.getUserProfile(session.user.id);
            if (userProfile.data) {
              setUserState(userProfile.data);
              setEmail(session.user.email || null);
            }
          } catch (err) {
            console.error('[Auth] Error fetching user profile:', err);
          }
        } else {
          setUserState(null);
        }
      });

      return () => subscription?.unsubscribe();
    }
  }, []);

  const register = async (registerEmail: string, fullName: string, phone: string) => {
    setError(null);
    setLoading(true);
    setEmail(registerEmail);

    try {
      console.log('[Auth] Starting OTP registration for:', registerEmail);

      // ✅ Send OTP using Supabase (handles both signup and login)
      console.log('[Auth] Sending OTP...');
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: registerEmail,
      });

      if (otpError) {
        console.error('[Auth] ❌ Failed to send OTP:', otpError.message);
        throw new Error(`Failed to send OTP: ${otpError.message}`);
      }

      console.log('[Auth] ✓ OTP auth session created');
      console.log('[Auth] OTP sent successfully, ready for verification');
      setIsOTPSent(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      console.error('[Auth] Registration error:', errorMessage);
      setError(errorMessage);
      // Don't re-throw - let finally handle cleanup
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      setError(null);
      setIsVerifying(true);

      if (!email) {
        throw new Error('Email not found. Please start registration again.');
      }

      console.log('[OTP Verify] Step 1: Verifying OTP for email:', email);

      // ✅ Verify OTP using Supabase auth - this creates an authenticated session
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (verifyError) {
        const errorMsg = verifyError.message || 'Invalid OTP. Please check and try again.';
        console.error('[OTP Verify] OTP verification failed:', errorMsg);
        throw new Error(errorMsg);
      }

      if (!data?.session?.user?.id) {
        console.error('[OTP Verify] ❌ No session created after OTP verification');
        throw new Error('Failed to create authenticated session');
      }

      console.log('[OTP Verify] Step 2: OTP verified successfully');
      console.log('[OTP Verify] ✓ Authenticated session created');
      console.log('[OTP Verify] User ID:', data.session.user.id);

      // ✅ Persist email for profile setup
      sessionStorage.setItem('verified_email', email);
      sessionStorage.setItem('otp_verified', 'true');
      console.log('[OTP Verify] Step 3: Email & OTP status stored in session');

      // ✅ Update context email to ensure consistency
      setEmail(email);
      console.log('[OTP Verify] ✓ Context updated');
      console.log('[OTP Verify] ========== ✅ OTP VERIFICATION COMPLETE ==========');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed';
      console.error('[OTP Verify] Error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOTP = async (otpEmail: string) => {
    setError(null);
    setLoading(true);

    try {
      console.log('[Auth] Resending OTP to:', otpEmail);

      // ✅ Resend OTP using Supabase auth
      const { error: resendError } = await supabase.auth.resendOtp({
        email: otpEmail,
        type: 'email',
      });

      if (resendError) {
        throw new Error(resendError.message || 'Failed to resend OTP');
      }

      setIsOTPSent(true);
      console.log('[Auth] OTP resent successfully');
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';

      // Handle specific error cases
      if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait 60 seconds before trying again.';
        console.error('[Auth] Rate limit error:', err);
      } else if (errorMessage.includes('email rate limit')) {
        errorMessage = 'Email service rate limit exceeded. Please wait before requesting another OTP.';
        console.error('[Auth] Email rate limit error:', err);
      } else if (errorMessage.includes('Invalid') || errorMessage.includes('not found')) {
        errorMessage = 'Email not found. Please start registration again.';
        console.error('[Auth] Email not found error:', err);
      } else {
        console.error('[Auth] Resend error:', err);
      }

      setError(errorMessage);
      // Don't re-throw - let finally handle cleanup
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('[Auth] Logging out');
      
      // Sign out from Supabase Auth if session exists
      await supabase.auth.signOut();
      
      // Clear state
      setUserState(null);
      setEmail(null);
      setIsOTPSent(false);
      setError(null);
      
      // Clear session storage
      sessionStorage.removeItem('verified_email');
      sessionStorage.removeItem('otp_verified');
      sessionStorage.removeItem('auth_user');
      
      console.log('[Auth] Logout complete');
    } catch (err) {
      console.error('[Auth] Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        email,
        isOTPSent,
        isVerifying,
        register,
        verifyOTP,
        logout,
        resendOTP,
        setUser,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
