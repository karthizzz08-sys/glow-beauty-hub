import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService, userService, otpService } from '../services/supabase';
import { brevoOTPService } from '../services/brevoOTP';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  email: string | null;
  isOTPSent: boolean;
  isVerifying: boolean;
  register: (email: string, fullName: string, phone: string) => Promise<void>;
  registerWithPassword: (email: string, password: string, fullName: string) => Promise<void>;
  sendOTP: (email: string, fullName: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [storedOTP, setStoredOTP] = useState<string | null>(null);
  const [otpTimestamp, setOtpTimestamp] = useState<number | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const userProfile = await userService.getUserProfile(session.user.id);
          if (userProfile.data) {
            setUser(userProfile.data as User);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (registerEmail: string, fullName: string, phone: string) => {
    try {
      setError(null);
      setLoading(true);
      setEmail(registerEmail);

      // Send OTP for verification and store it
      const generatedOTP = await brevoOTPService.sendOTP(registerEmail, fullName);
      setStoredOTP(generatedOTP);
      setOtpTimestamp(Date.now());
      setIsOTPSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (otpEmail: string, fullName: string) => {
    try {
      setError(null);
      setLoading(true);
      setEmail(otpEmail);

      // Send OTP for verification and store it
      const generatedOTP = await brevoOTPService.sendOTP(otpEmail, fullName);
      setStoredOTP(generatedOTP);
      setOtpTimestamp(Date.now());
      setIsOTPSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
      setError(errorMessage);
      throw err;
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

      console.log('[Auth] Verifying OTP for email:', email);

      // ✅ FIXED: Verify OTP against database (email + code + expiry)
      const { data: otpRecord, error: otpError } = await otpService.verifyOTP(email, otp);

      if (otpError || !otpRecord) {
        const errorMsg = otpError instanceof Error ? otpError.message : 'Invalid OTP. Please check and try again.';
        console.error('[Auth] OTP verification failed:', errorMsg);
        throw new Error(errorMsg);
      }

      console.log('[Auth] OTP verified successfully');

      // ✅ FIXED: Mark OTP as verified in database
      await otpService.markOTPAsVerified(otpRecord.id);
      console.log('[Auth] OTP marked as verified');

      // ✅ FIXED: Create Supabase Auth user ONLY after OTP verification
      // Generate a temporary password for the user
      const tempPassword = Math.random().toString(36).slice(-8);
      
      console.log('[Auth] Creating Supabase Auth user...');
      const { data: authData, error: signUpError } = await authService.signUpWithPassword(email, tempPassword);

      if (signUpError) {
        // Check if user already exists
        if (signUpError.message.includes('already registered') || signUpError.message.includes('User already exists')) {
          console.log('[Auth] User already exists in Supabase Auth, using existing account');
          
          // Try to get the existing user
          try {
            const { data: signInData } = await authService.signInWithPassword(email, tempPassword);
            if (signInData.user) {
              console.log('[Auth] Successfully signed in existing user:', signInData.user.id);
            }
          } catch (e) {
            console.warn('[Auth] Could not sign in with temp password, continuing with profile creation');
          }
        } else {
          console.error('[Auth] Signup error:', signUpError.message);
          throw signUpError;
        }
      } else if (authData?.user) {
        console.log('[Auth] New Supabase Auth user created:', authData.user.id);
      }

      const userId = authData?.user?.id;

      if (userId) {
        // Create or get user profile
        console.log('[Auth] Checking user profile for:', userId);
        const { data: userProfile } = await userService.getUserProfile(userId);

        if (!userProfile) {
          // Create new user profile
          console.log('[Auth] Creating new user profile...');
          const { data: newUser } = await userService.createUserProfile(userId, {
            id: userId,
            email: email,
            verified: true,
            user_type: 'matrimony',
            created_at: new Date().toISOString(),
          } as User);

          if (newUser && newUser.length > 0) {
            console.log('[Auth] User profile created successfully');
            setUser(newUser[0] as User);
          }
        } else {
          console.log('[Auth] User profile already exists');
          setUser(userProfile as User);
        }

        setIsOTPSent(false);
      }

      // Clear stored OTP from client state
      setStoredOTP(null);
      setOtpTimestamp(null);
      
      console.log('[Auth] OTP verification flow completed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed';
      console.error('[Auth] Verification error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOTP = async (otpEmail: string) => {
    try {
      setError(null);
      setLoading(true);

      console.log('[Auth] Resending OTP to:', otpEmail);

      await brevoOTPService.sendOTP(otpEmail);
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
      } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
        errorMessage = 'Email service configuration error. Please contact support.';
        console.error('[Auth] Auth config error:', err);
      } else {
        console.error('[Auth] Resend error:', err);
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setEmail(null);
      setIsOTPSent(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const registerWithPassword = async (registerEmail: string, password: string, fullName: string) => {
    try {
      setError(null);
      setLoading(true);
      setEmail(registerEmail);

      // Sign up with password
      const { data, error: authError } = await authService.signUpWithPassword(registerEmail, password);

      if (authError) {
        throw authError;
      }

      if (data.user) {
        // Create user profile
        const newUserRes = await userService.createUserProfile(data.user.id, {
          id: data.user.id,
          email: registerEmail,
          full_name: fullName,
          verified: true,
          created_at: new Date().toISOString(),
        });

        if (newUserRes.data) {
          setUser(newUserRes.data[0] as User);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithPassword = async (loginEmail: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      setEmail(loginEmail);

      // Sign in with password
      const { data, error: authError } = await authService.signInWithPassword(loginEmail, password);

      if (authError) {
        throw authError;
      }

      if (data.user) {
        // Get user profile
        const userProfile = await userService.getUserProfile(data.user.id);

        if (userProfile.data) {
          setUser(userProfile.data as User);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
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
        registerWithPassword,
        sendOTP,
        verifyOTP,
        loginWithPassword,
        logout,
        resendOTP,
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
