import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { matrimonyService, userService } from '../services/supabase';
import { MatrimonyProfile, User } from '../types';

const STEPS = [
  { id: 1, title: 'Basic Details', description: 'Name, Gender, DOB' },
  { id: 2, title: 'Personal Details', description: 'Education, Job, Income' },
  { id: 3, title: 'Horoscope Details', description: 'Family, Nakshatra, Rasi' },
  { id: 4, title: 'Complete', description: 'Review & Complete' },
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, email: otpEmail } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<Partial<MatrimonyProfile>>({
    full_name: user?.full_name || '',
    gender: 'male',
    date_of_birth: '',
    community: 'Chettiar',
    sub_sect: '',
    education: '',
    profession: '',
    salary: '',
    city: '',
    state: 'Tamil Nadu',
    phone_number: user?.phone_number || '',
    email: user?.email || otpEmail || '',
    about_me: '',
    partner_expectations: '',
  });

  useEffect(() => {
    // Allow access if user exists OR email is set from OTP verification
    if (!user && !otpEmail) {
      navigate('/register', { replace: true });
    }
  }, [user, otpEmail, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (): boolean => {
    setError('');

    if (currentStep === 1) {
      if (!profileData.full_name?.trim()) {
        setError('Full name is required');
        return false;
      }
      if (!profileData.date_of_birth) {
        setError('Date of birth is required');
        return false;
      }
    }

    if (currentStep === 2) {
      if (!profileData.education?.trim()) {
        setError('Education is required');
        return false;
      }
      if (!profileData.profession?.trim()) {
        setError('Profession is required');
        return false;
      }
    }

    if (currentStep === 3) {
      if (!profileData.city?.trim()) {
        setError('City is required');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      setLoading(true);
      setError('');

      const userEmail = user?.email || otpEmail;

      if (!userEmail) {
        throw new Error('Email not found. Please start registration again.');
      }

      // ✅ Generate UUID for new user (no Supabase Auth required)
      const userId = crypto.randomUUID();
      console.log('[ProfileSetup] Creating user with ID:', userId);

      // ✅ Create user record in users table
      const userData: User = {
        id: userId,
        email: userEmail,
        full_name: profileData.full_name || '',
        phone_number: profileData.phone_number || '',
        verified: true,
        user_type: 'matrimony',
        created_at: new Date().toISOString(),
      };

      console.log('[ProfileSetup] Creating user record:', userData);
      const { data: userCreated, error: userError } = await userService.createUserProfile(userId, userData);

      if (userError) {
        throw new Error(userError.message || 'Failed to create user');
      }

      console.log('[ProfileSetup] User record created successfully');

      // ✅ Prepare matrimony profile data
      const profileDataToSave = {
        user_id: userId,
        full_name: profileData.full_name,
        gender: profileData.gender,
        date_of_birth: profileData.date_of_birth,
        community: profileData.community || '',
        sub_sect: profileData.sub_sect || '',
        education: profileData.education || '',
        profession: profileData.profession || '',
        salary: profileData.salary || '',
        city: profileData.city || '',
        state: profileData.state || 'Tamil Nadu',
        phone_number: profileData.phone_number,
        email: profileData.email,
        about_me: profileData.about_me || '',
        partner_expectations: profileData.partner_expectations || '',
        is_premium: false,
        verified: false,
        photo_urls: [],
        view_count: 0,
        interest_count: 0,
      };

      // ✅ Save matrimony profile
      console.log('[ProfileSetup] Saving matrimony profile');
      const { data: profileCreated, error: profileError } = await matrimonyService.createProfile(profileDataToSave);

      if (profileError) {
        throw new Error(profileError.message || 'Failed to save profile');
      }

      console.log('[ProfileSetup] Matrimony profile created successfully');

      // ✅ Set user in context
      const { setUser } = useAuth();
      setUser(userData);

      // ✅ Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save profile';
      setError(errorMsg);
      console.error('[ProfileSetup] Error:', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Basic Details
  const Step1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Full Name *</label>
        <input
          type="text"
          name="full_name"
          value={profileData.full_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-maroon-900 mb-2">Gender *</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon-900 mb-2">Date of Birth *</label>
          <input
            type="date"
            name="date_of_birth"
            value={profileData.date_of_birth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Community</label>
        <input
          type="text"
          name="community"
          value={profileData.community}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="e.g., Chettiar"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Sub-Sect</label>
        <input
          type="text"
          name="sub_sect"
          value={profileData.sub_sect}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="Enter sub-sect (optional)"
        />
      </div>
    </div>
  );

  // Step 2: Personal Details
  const Step2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Education *</label>
        <input
          type="text"
          name="education"
          value={profileData.education}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="e.g., B.Tech, MBA"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Profession *</label>
        <input
          type="text"
          name="profession"
          value={profileData.profession}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="e.g., Software Engineer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Annual Income</label>
        <select
          name="salary"
          value={profileData.salary}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <option value="">Select income range</option>
          <option value="Below 25 Lakhs">Below 25 Lakhs</option>
          <option value="25-50 Lakhs">25-50 Lakhs</option>
          <option value="50-75 Lakhs">50-75 Lakhs</option>
          <option value="75-100 Lakhs">75-100 Lakhs</option>
          <option value="Above 100 Lakhs">Above 100 Lakhs</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">About Me</label>
        <textarea
          name="about_me"
          value={profileData.about_me}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  // Step 3: Horoscope Details
  const Step3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-maroon-900 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            placeholder="Enter city"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon-900 mb-2">State</label>
          <input
            type="text"
            name="state"
            value={profileData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            placeholder="Enter state"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-maroon-900 mb-2">Partner Expectations</label>
        <textarea
          name="partner_expectations"
          value={profileData.partner_expectations}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="What are you looking for in a partner?"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          💡 Horoscope details like Nakshatra and Rasi will be asked in next updates. You can upload them later.
        </p>
      </div>
    </div>
  );

  // Step 4: Review
  const Step4 = () => (
    <div className="space-y-6">
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">Profile Complete!</h3>
          <p className="text-green-700">
            Your profile has been created. Click "Complete Setup" to go to your dashboard.
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-700">Name:</span>
          <span className="font-semibold">{profileData.full_name}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-700">Gender:</span>
          <span className="font-semibold capitalize">{profileData.gender}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-700">Profession:</span>
          <span className="font-semibold">{profileData.profession}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-700">City:</span>
          <span className="font-semibold">{profileData.city}</span>
        </div>
      </div>
    </div>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className={`flex flex-col items-center flex-1 ${idx < STEPS.length - 1 ? 'relative' : ''}`}
              >
                {/* Line before */}
                {idx > 0 && (
                  <div
                    className={`absolute left-0 top-5 w-full h-1 -z-10 ${
                      currentStep > idx ? 'bg-gold-500' : 'bg-gray-300'
                    }`}
                    style={{ width: 'calc(100% - 32px)', left: '-50%' }}
                  />
                )}

                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                    currentStep >= step.id
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-serif">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-gray-600 mb-8">{STEPS[currentStep - 1].description}</p>

          {/* Error Message - only show on steps 1-3 */}
          {error && currentStep !== STEPS.length && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {getStepContent()}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 inline mr-2" />
                Previous
              </button>

              {currentStep === STEPS.length ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Completing...' : 'Complete Setup'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-lg transition"
                >
                  Next
                  <ChevronRight className="w-4 h-4 inline ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
