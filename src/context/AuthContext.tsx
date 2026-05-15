import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService, userService } from '../services/supabase';
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
        throw new Error('Email not found');
      }

      // ✅ NEW: Verify OTP locally first
      if (!storedOTP) {
        throw new Error('OTP was not sent. Please request a new OTP.');
      }

      if (otp !== storedOTP) {
        throw new Error('Invalid OTP. Please check and try again.');
      }

      // ✅ NEW: Check if OTP has expired (10 minutes = 600000 ms)
      if (otpTimestamp) {
        const otpAge = Date.now() - otpTimestamp;
        const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
        if (otpAge > OTP_EXPIRY_MS) {
          throw new Error('OTP has expired. Please request a new OTP.');
        }
      }

      // ✅ NEW: Clear stored OTP after successful verification
      setStoredOTP(null);
      setOtpTimestamp(null);

      // Verify OTP with Supabase Auth
      const { data, error: authError } = await authService.signInWithOTP(email, otp);

      if (authError) {
        throw authError;
      }

      if (data.user) {
        // Create or get user profile
        const userProfile = await userService.getUserProfile(data.user.id);

        if (!userProfile.data) {
          // Create new user profile
          const newUserRes = await userService.createUserProfile(data.user.id, {
            id: data.user.id,
            email: email,
            verified: true,
            created_at: new Date().toISOString(),
          });

          if (newUserRes.data) {
            setUser(newUserRes.data[0] as User);
          }
        } else {
          setUser(userProfile.data as User);
        }

        setIsOTPSent(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  };;

  const resendOTP = async (otpEmail: string) => {
    try {
      setError(null);
      setLoading(true);

      await brevoOTPService.sendOTP(otpEmail);
      setIsOTPSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setError(errorMessage);
      throw err;
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
