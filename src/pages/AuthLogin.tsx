import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

export default function AuthLogin() {
  const navigate = useNavigate();
  const { resendOTP, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !validateEmail(formData.email)) {
      setFormErrors({ email: 'Please enter a valid email' });
      return;
    }

    try {
      // Send OTP to email
      await resendOTP(formData.email);
      // Redirect to OTP verification
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('[AuthLogin] OTP request failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-up">
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

          {/* Auth Method Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-700 text-sm">
              🔐 Sign in with OTP for secure access. We'll send you a 6-digit code to verify your email.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOTPSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-maroon-900 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
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
