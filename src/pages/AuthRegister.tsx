import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

export default function AuthRegister() {
  const navigate = useNavigate();
  const { register, registerWithPassword, loading, error } = useAuth();
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('password');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateOTPForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOTPForm()) return;

    try {
      await register(formData.email, formData.fullName, '');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    try {
      await registerWithPassword(formData.email, formData.password, formData.fullName);
      navigate('/home');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-maroon-900 font-serif mb-2">
              Register with Us
            </h1>
            <p className="text-gray-600">
              Join the Chettiar Connect community today
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
                setAuthMethod('password');
                setErrors({});
              }}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMethod === 'password'
                  ? 'bg-maroon-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => {
                setAuthMethod('otp');
                setErrors({});
              }}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                authMethod === 'otp'
                  ? 'bg-maroon-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              OTP
            </button>
          </div>

          {/* Form */}
          <form onSubmit={authMethod === 'password' ? handlePasswordSubmit : handleOTPSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-maroon-900 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field - Only for password method */}
            {authMethod === 'password' && (
              <>
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
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-maroon-900 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 rounded-lg mt-6"
            >
              {loading ? 'Processing...' : authMethod === 'password' ? 'Create Account' : 'Continue with OTP'}
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

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-maroon-600 font-semibold hover:text-maroon-700"
            >
              Sign In
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By registering, you agree to our{' '}
            <a href="#" className="text-gold-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-gold-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
