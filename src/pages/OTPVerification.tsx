import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, isVerifying, loading, error } = useAuth();

  const email = (location.state as { email?: string })?.email || '';
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setOtpError('');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }

    try {
      setOtpError('');
      
      // ✅ Only verify OTP - no additional emails or auth triggers
      await verifyOTP(otp);
      
      // Clear form and redirect to profile setup
      setOtp('');
      navigate('/signup', { replace: true });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'OTP verification failed';
      setOtpError(errorMsg);
      console.error('[OTPVerification] Error:', errorMsg);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || resendTimer > 0) {
      return; // Prevent multiple simultaneous requests
    }

    try {
      setIsResending(true);
      setOtpError('');
      
      await resendOTP(email);
      
      // Set 60-second countdown timer after successful resend
      setResendTimer(60);
      setOtp('');
      
      console.log('[OTP] Resend successful, timer set to 60 seconds');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      
      // Handle specific error cases
      if (errorMessage.includes('429') || errorMessage.includes('rate limit') || errorMessage.includes('Too Many Requests')) {
        setOtpError('Too many requests. Please wait before requesting another OTP.');
        setResendTimer(60); // Still set timer even on rate limit
      } else if (errorMessage.includes('email rate limit')) {
        setOtpError('Email rate limit exceeded. Please wait before requesting another OTP.');
        setResendTimer(60);
      } else {
        setOtpError(errorMessage);
      }
      
      console.error('[OTP Resend Error]', errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gold-600" />
            </div>
            <h1 className="text-3xl font-bold text-maroon-900 font-serif mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              Enter the 6-digit OTP sent to {email}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-maroon-900 mb-3">
                Enter OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-center text-3xl font-bold tracking-widest focus:outline-none focus:border-gold-500"
              />
              {otpError && (
                <p className="text-red-500 text-xs mt-2">{otpError}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                This OTP expires in 10 minutes
              </p>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={isVerifying || loading || otp.length !== 6}
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 rounded-lg"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          {/* Resend OTP */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-3">Didn't receive the OTP?</p>
            {resendTimer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in <span className="font-bold text-maroon-600">{resendTimer}s</span>
              </p>
            ) : isResending ? (
              <p className="text-gray-500">Sending OTP...</p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isResending || resendTimer > 0}
                className="inline-flex items-center gap-2 text-maroon-600 font-semibold hover:text-maroon-700 disabled:text-gray-400 disabled:cursor-not-allowed transition"
              >
                <RotateCcw className="w-4 h-4" />
                Resend OTP
              </button>
            )}
            {resendTimer > 0 && (
              <p className="text-xs text-gray-500 mt-2">Please wait before requesting another OTP</p>
            )}
          </div>

          {/* Change Email */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-gold-600 text-sm hover:underline"
            >
              Use a different email
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-xs text-blue-700">
            🔒 Your information is secure. We never share your details with anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
