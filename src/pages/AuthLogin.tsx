import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

export default function AuthLogin() {
  const navigate = useNavigate();
  const { sendOTP, loginWithPassword, loading, error } = useAuth();
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await sendOTP(formData.email, 'User');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      await loginWithPassword(formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
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

          {/* Auth Method Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => {
                setAuthMethod('otp');
                setFormErrors({});
              }}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMethod === 'otp'
                  ? 'bg-maroon-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              OTP
            </button>
            <button
              onClick={() => {
                setAuthMethod('password');
                setFormErrors({});
              }}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMethod === 'password'
                  ? 'bg-maroon-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Password
            </button>
          </div>

          {/* Form */}
          <form onSubmit={authMethod === 'otp' ? handleOTPSubmit : handlePasswordSubmit} className="space-y-5">
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

            {/* Password Field - Only show for password method */}
            {authMethod === 'password' && (
              <div>
                <label className="block text-sm font-semibold text-maroon-900 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 rounded-lg mt-6"
            >
              {loading ? 'Signing in...' : authMethod === 'otp' ? 'Send OTP' : 'Sign In'}
            </Button>
          </form>

          {/* Info Message */}
          {authMethod === 'otp' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-blue-700 text-sm">
                We'll send you a 6-digit OTP to verify your email address.
              </p>
            </div>
          )}

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
