import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { userService, otpService } from '../services/supabase';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const register = async (registerEmail: string, fullName: string, phone: string) => {
    try {
      setError(null);
      setLoading(true);
      setEmail(registerEmail);

      console.log('[Auth] Starting OTP registration for:', registerEmail);

      // Send OTP via Brevo (no Supabase Auth)
      await brevoOTPService.sendOTP(registerEmail, fullName);
      setIsOTPSent(true);

      console.log('[Auth] OTP sent successfully, ready for verification');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      console.error('[Auth] Registration error:', errorMessage);
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

      // ✅ Verify OTP against database (email + code + expiry)
      const { data: otpRecord, error: otpError } = await otpService.verifyOTP(email, otp);

      if (otpError || !otpRecord) {
        const errorMsg = otpError instanceof Error ? otpError.message : 'Invalid OTP. Please check and try again.';
        console.error('[Auth] OTP verification failed:', errorMsg);
        throw new Error(errorMsg);
      }

      console.log('[Auth] OTP verified successfully');

      // ✅ Mark OTP as verified in database
      await otpService.markOTPAsVerified(otpRecord.id);
      console.log('[Auth] OTP marked as verified in database');

      // ✅ Clear stored OTP (user creation will happen in ProfileSetup)
      console.log('[Auth] OTP verification complete - ready to proceed to profile setup');
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

      // Send OTP via Brevo
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
        console.error('[Auth] Email config error:', err);
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
      console.log('[Auth] Logging out');
      setUserState(null);
      setEmail(null);
      setIsOTPSent(false);
      setError(null);
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
