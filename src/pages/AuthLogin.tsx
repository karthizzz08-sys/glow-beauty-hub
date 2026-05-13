import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

export default function AuthLogin() {
  const navigate = useNavigate();
  const { sendOTP, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    try {
      await sendOTP(email, 'User');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-maroon-900 font-serif mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your Chettiar Connect account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-maroon-900 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 rounded-lg mt-6"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-blue-700 text-sm">
              We'll send you a 6-digit OTP to verify your email address.
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-maroon-600 font-semibold hover:text-maroon-700"
            >
              Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
