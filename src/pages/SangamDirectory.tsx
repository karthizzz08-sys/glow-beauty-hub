import { useState, useEffect } from 'react';
import { MapPin, Briefcase, X, CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { communityMembersService, otpService } from '../services/supabase';
import { brevoOTPService } from '../services/brevoOTP';
import { CITIES } from '../constants';

interface CommunityMember {
  id: string;
  name: string;
  city: string;
  district: string;
  phone: string;
  profession: string;
  created_at: string;
}

interface RegistrationForm {
  name: string;
  city: string;
  district: string;
  email: string;
  profession: string;
}

interface FormErrors {
  [key: string]: string;
}

type RegistrationStep = 'form' | 'otp-verification' | 'success';

const DISTRICTS = ['Thanjavur', 'Tiruchirapalli', 'Salem', 'Coimbatore', 'Erode', 'Tiruppur', 'Madurai', 'Dindigul', 'Virudhunagar', 'Tuticorin', 'Tirunelveli', 'Kanyakumari', 'Villupuram', 'Vellore', 'Ranipet', 'Krishnagiri', 'Dharmapuri', 'Chengalpattu', 'Kanchipuram', 'Tiruvallur', 'Chennai'];

export default function SangamDirectory() {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    district: '',
  });
  const [formData, setFormData] = useState<RegistrationForm>({
    name: '',
    city: '',
    district: '',
    email: '',
    profession: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // OTP States
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('form');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSending, setOtpSending] = useState(false);

  // OTP Timer useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpTimer]);

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await communityMembersService.searchMembers(filters);
      if (!error && data) {
        setMembers(data || []);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.district) errors.district = 'District is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleSendOTP();
  };

  const handleSendOTP = async () => {
    try {
      setOtpSending(true);
      setOtpError('');
      
      await brevoOTPService.sendOTP(formData.email, formData.name);
      
      setRegistrationStep('otp-verification');
      setOtpTimer(300);
      setOtp('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
      setFormErrors({ submit: errorMessage });
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setRegistrationLoading(true);
      setOtpError('');

      const { data: otpData } = await otpService.verifyOTP(formData.email, otp);

      if (!otpData) {
        setOtpError('Invalid OTP. Please try again.');
        return;
      }

      const { data, error } = await communityMembersService.createMember(formData);

      if (error) {
        setOtpError(error.message || 'Failed to register');
        return;
      }

      await otpService.markOTPAsVerified(otpData.id);

      setSuccessMessage('Successfully registered in community directory!');
      setRegistrationStep('success');
      await fetchMembers();

      setTimeout(() => {
        setFormData({
          name: '',
          city: '',
          district: '',
          email: '',
          profession: '',
        });
        setFormErrors({});
        setOtp('');
        setOtpError('');
        setRegistrationStep('form');
        setShowRegistrationModal(false);
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'OTP verification failed';
      setOtpError(errorMsg);
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setOtpSending(true);
      setOtpError('');
      
      await brevoOTPService.sendOTP(formData.email, formData.name);
      
      setOtpTimer(300);
      setOtp('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setOtpError(errorMessage);
    } finally {
      setOtpSending(false);
    }
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="text-2xl font-bold">
                {registrationStep === 'form' && 'Register Your Details'}
                {registrationStep === 'otp-verification' && 'Verify Email OTP'}
                {registrationStep === 'success' && 'Registration Complete'}
              </h2>
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  setRegistrationStep('form');
                  setOtp('');
                  setOtpError('');
                }}
                className="p-1 hover:bg-white/20 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {successMessage && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-semibold">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Registration Form Step */}
              {registrationStep === 'form' && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select city</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {formErrors.city && <p className="text-red-600 text-xs mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select district</option>
                      {DISTRICTS.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                    {formErrors.district && <p className="text-red-600 text-xs mt-1">{formErrors.district}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {formErrors.email && <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Profession</label>
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      placeholder="Your profession"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  {formErrors.submit && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-red-800 text-sm">{formErrors.submit}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRegistrationModal(false)}
                      className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      disabled={otpSending}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-50"
                    >
                      {otpSending ? 'Sending OTP...' : 'Continue'}
                    </Button>
                  </div>
                </form>
              )}

              {/* OTP Verification */}
              {registrationStep === 'otp-verification' && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <p className="text-blue-800 text-sm font-semibold">Verification Email</p>
                    </div>
                    <p className="text-blue-700 text-sm">
                      We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP *</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                        setOtpError('');
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-mono"
                      disabled={registrationLoading}
                      autoFocus
                    />
                    {otpError && <p className="text-red-600 text-xs mt-1">{otpError}</p>}
                  </div>

                  {otpTimer > 0 && (
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Expires in {formatTime(otpTimer)}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpTimer > 0 || otpSending}
                    className="w-full text-sm text-yellow-600 hover:text-yellow-700 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {otpTimer > 0 ? `Resend OTP in ${formatTime(otpTimer)}` : 'Resend OTP'}
                  </button>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setRegistrationStep('form');
                        setOtp('');
                        setOtpError('');
                      }}
                      className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                      disabled={registrationLoading}
                    >
                      Back
                    </button>
                    <Button
                      type="submit"
                      disabled={registrationLoading || otp.length !== 6}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-50"
                    >
                      {registrationLoading ? 'Verifying...' : 'Verify & Register'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Success */}
              {registrationStep === 'success' && (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600">You're now part of the Sangam Community Directory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-10">
        <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-serif mb-2">Community Directory</h1>
            <p className="text-white/90">Connect with community members</p>
          </div>
          <button
            onClick={() => setShowRegistrationModal(true)}
            className="bg-white text-yellow-600 font-bold px-6 py-3 rounded-lg hover:bg-yellow-50 shadow-lg"
          >
            Register Your Details
          </button>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">District</label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({ city: '', district: '' })}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Directory Cards */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading directory...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No members found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-l-4 border-yellow-500"
                  >
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>

                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold">{member.city}, {member.district}</span>
                      </div>

                      {member.profession && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Briefcase className="w-5 h-5 text-yellow-600" />
                          <span>{member.profession}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-5 h-5 text-yellow-600" />
                        <span className="font-mono">{member.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCallClick(member.phone)}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
