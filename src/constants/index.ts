// Application Constants

// Cities
export const CITIES = [
  'Chennai',
  'Coimbatore',
  'Salem',
  'Madurai',
  'Tirunelveli',
  'Kanyakumari',
  'Thanjavur',
  'Tiruchirapalli',
  'Vellore',
  'Ranipet',
  'Dharmapuri',
  'Krishnagiri',
  'Erode',
  'Nilgiri',
  'The Nilgiris',
  'Villupuram',
  'Chengalpattu',
  'Kanchipuram',
  'Tiruvallur',
  'Bangalore',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Pune',
  'USA',
  'Canada',
  'UK',
  'Australia',
  'Singapore',
  'UAE',
  'Malaysia',
  'Other',
];

// States in India
export const STATES = [
  'Tamil Nadu',
  'Karnataka',
  'Telangana',
  'Andhra Pradesh',
  'Maharashtra',
  'Gujarat',
  'Madhya Pradesh',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Goa',
  'Kerala',
  'Overseas',
];

// Education Levels
export const EDUCATION_LEVELS = [
  'High School',
  'Diploma',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Professional Qualification',
];

// Professions
export const PROFESSIONS = [
  'Doctor',
  'Engineer',
  'IT Professional',
  'Lawyer',
  'Accountant',
  'Teacher',
  'Business Owner',
  'Consultant',
  'Finance Professional',
  'Marketing Professional',
  'Sales Executive',
  'Manager',
  'Entrepreneur',
  'Government Job',
  'Homemaker',
  'Student',
  'Self Employed',
  'Others',
];

// Salary Ranges
export const SALARY_RANGES = [
  'Below 20,000',
  '20,000 - 50,000',
  '50,000 - 1,00,000',
  '1,00,000 - 2,00,000',
  '2,00,000 - 5,00,000',
  '5,00,000 - 10,00,000',
  'Above 10,00,000',
  'Prefer not to say',
];

// Community Sub-sects
export const CHETTIAR_SUB_SECTS = [
  'Nattukottai Chettiar',
  'Chettinad Chettiar',
  'Malabar Chettiar',
  'Bangarpet Chettiar',
  'Chandrasekharendra Saraswathi Chettiar',
  'Srivaishnava',
  'Shaivite',
  'Others',
];

// Function Types for Sangam Directory
export const FUNCTION_TYPES = [
  'Wedding',
  'Temple Functions',
  'Ear Piercing',
  'Puberty Function',
  'House Warming',
  'Community Events',
  'Business Networking',
  'Social Gathering',
  'Other',
];

// Premium Plans
export const PREMIUM_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2999,
    duration: 1,
    features: [
      'View limited profiles',
      'Send 5 interests per month',
      'Profile verification badge',
      'Chat with matches',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5999,
    duration: 1,
    features: [
      'Unlimited profile views',
      'Send unlimited interests',
      'Premium badge',
      'Priority verification',
      'Video call feature',
      'Advanced search filters',
      'Monthly compatibility report',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 9999,
    duration: 1,
    features: [
      'All Premium features',
      'Dedicated matchmaker support',
      '24/7 customer support',
      'Personality compatibility score',
      'Exclusive success stories',
      'Annual retreat invitation',
      'Premium profile showcase',
    ],
  },
];

// Gender
export const GENDER = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

// Age range for profile search
export const AGE_RANGES = {
  min: 18,
  max: 70,
};

// OTP Settings
export const OTP_SETTINGS = {
  length: 6,
  expiryMinutes: 10,
  resendWaitSeconds: 30,
};

// File Upload Settings
export const FILE_UPLOAD = {
  maxProfilePhotoSize: 5 * 1024 * 1024, // 5 MB
  maxHoroscopeSize: 3 * 1024 * 1024, // 3 MB
  allowedPhotoTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf'],
  profilePhotosBucket: 'profile-photos',
  horoscopeBucket: 'horoscopes',
};

// Language Codes
export const LANGUAGES = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
];

// Default Language
export const DEFAULT_LANGUAGE = 'en';

// API Response Status
export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
};

// Routes
export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  MATRIMONY: '/matrimony',
  MATRIMONY_SEARCH: '/matrimony/search',
  MATRIMONY_PROFILE: '/matrimony/profile/:id',
  MATRIMONY_EDIT: '/matrimony/edit',
  MATRIMONY_DASHBOARD: '/matrimony/dashboard',
  SANGAM_DIRECTORY: '/sangam-directory',
  DIRECTORY_SEARCH: '/sangam-directory/search',
  DIRECTORY_PROFILE: '/sangam-directory/profile/:id',
  DIRECTORY_EDIT: '/sangam-directory/edit',
  MEMBERSHIP_PLANS: '/membership-plans',
  SUCCESS_STORIES: '/success-stories',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_OTP: '/verify-otp',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROFILES: '/admin/profiles',
  ADMIN_USERS: '/admin/users',
  ADMIN_SUBSCRIPTIONS: '/admin/subscriptions',
  NOT_FOUND: '/404',
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please try again.',
  SIGNUP_SUCCESS: 'Account created successfully!',
  SIGNUP_ERROR: 'Registration failed. Please try again.',
  OTP_SENT: 'OTP sent to your email.',
  OTP_VERIFIED: 'Email verified successfully!',
  OTP_INVALID: 'Invalid OTP. Please try again.',
  PROFILE_CREATED: 'Profile created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PROFILE_DELETED: 'Profile deleted successfully!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  UPLOAD_ERROR: 'Failed to upload file.',
  INTEREST_SENT: 'Interest request sent!',
  ADDED_TO_SHORTLIST: 'Added to shortlist!',
  REMOVED_FROM_SHORTLIST: 'Removed from shortlist.',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
};

// Verification Badge Types
export const VERIFICATION_BADGE = {
  EMAIL: 'email_verified',
  PHONE: 'phone_verified',
  PROFILE: 'profile_verified',
  PREMIUM: 'premium_member',
};
