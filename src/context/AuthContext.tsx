import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { userService, supabase, otpService } from '../services/supabase';
import { brevoOTPService } from '../services/brevoOTP';

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

      // ✅ Send OTP via Brevo email
      console.log('[Auth] Sending OTP via Brevo...');
      await brevoOTPService.sendOTP(registerEmail, fullName);

      console.log('[Auth] ✓ OTP sent successfully via Brevo');
      console.log('[Auth] User ready for OTP verification');
      setIsOTPSent(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      console.error('[Auth] Registration error:', errorMessage);
      setError(errorMessage);
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

      console.log('[OTP Verify] ========== STARTING OTP VERIFICATION VIA BACKEND ==========');
      console.log('[OTP Verify] Step 1: Calling backend API to verify OTP...');

      // ✅ STEP 1: Call backend API to verify OTP and create Supabase user
      const apiUrl = import.meta.env.VITE_API_URL || '/api/verify-otp';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          fullName: email.split('@')[0], // Fallback to email prefix
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error || 'OTP verification failed. Please try again.';
        console.error('[OTP Verify] Backend error:', errorMsg);
        throw new Error(errorMsg);
      }

      const result = await response.json();

      if (!result.success || !result.user) {
        throw new Error('OTP verification failed. Please try again.');
      }

      console.log('[OTP Verify] ✓ Step 1 Complete: OTP verified by backend');
      console.log('[OTP Verify] User ID:', result.user.id);
      console.log('[OTP Verify] Email:', result.user.email);

      // ✅ STEP 2: Update context with authenticated user
      console.log('[OTP Verify] Step 2: Setting up authenticated session...');
      
      const authenticatedUser: User = {
        id: result.user.id,
        email: result.user.email,
        full_name: result.user.full_name,
        phone_number: '',
        verified: true,
        user_type: 'matrimony',
        created_at: new Date().toISOString(),
      };

      setUser(authenticatedUser);
      setEmail(result.user.email);

      // ✅ STEP 3: Store in session storage for persistence
      sessionStorage.setItem('verified_email', result.user.email);
      sessionStorage.setItem('otp_verified', 'true');
      sessionStorage.setItem('authenticated_user_id', result.user.id);
      console.log('[OTP Verify] ✓ Step 2 Complete: Session data stored');

      console.log('[OTP Verify] ========== ✅ OTP VERIFICATION COMPLETE ==========');
      console.log('[OTP Verify] User is now authenticated and ready for profile setup');

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

      // ✅ Resend OTP via Brevo
      await brevoOTPService.sendOTP(otpEmail);
      setIsOTPSent(true);

      console.log('[Auth] ✓ OTP resent successfully via Brevo');
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';

      // Handle specific error cases
      if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait 60 seconds before trying again.';
        console.error('[Auth] Rate limit error:', err);
      } else if (errorMessage.includes('email rate limit')) {
        errorMessage = 'Email service rate limit exceeded. Please wait before requesting another OTP.';
        console.error('[Auth] Email rate limit error:', err);
      } else if (errorMessage.includes('Database error') || errorMessage.includes('already exists')) {
        errorMessage = 'Failed to resend OTP. Please try again.';
        console.error('[Auth] Database error:', err);
      } else {
        console.error('[Auth] Resend error:', err);
      }

      setError(errorMessage);
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
