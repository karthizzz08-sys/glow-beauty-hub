// User related types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  avatar_url?: string;
  created_at: string;
  verified: boolean;
  user_type: 'matrimony' | 'directory' | 'admin';
}

// Matrimony Profile Types
export interface MatrimonyProfile {
  id: string;
  user_id: string;
  full_name: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  community: string;
  sub_sect: string;
  education: string;
  profession: string;
  salary: string;
  city: string;
  state: string;
  phone_number: string;
  email: string;
  profile_photo_url?: string;
  horoscope_url?: string;
  about_me: string;
  partner_expectations: string;
  is_premium: boolean;
  verified: boolean;
  photo_urls: string[];
  created_at: string;
  updated_at: string;
  view_count: number;
  interest_count: number;
}

// Sangam Directory Types
export interface SangamDirectoryEntry {
  id: string;
  user_id: string;
  name: string;
  family_name: string;
  photo_url?: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
  area: string;
  city: string;
  district: string;
  profession: string;
  function_types: string[]; // wedding, temple, ear piercing, puberty, house warming, community events
  description: string;
  created_at: string;
  updated_at: string;
}

// OTP Verification Types
export interface OTPVerification {
  id: string;
  email: string;
  otp_code: string;
  is_verified: boolean;
  created_at: string;
  expires_at: string;
  verified_at?: string;
}

// Premium Membership Types
export interface PremiumMembership {
  id: string;
  user_id: string;
  profile_id: string;
  plan_type: 'basic' | 'premium' | 'platinum';
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  payment_id?: string;
}

// Profile Views Types
export interface ProfileView {
  id: string;
  profile_id: string;
  viewed_by_user_id: string;
  created_at: string;
}

// Interest Request Types
export interface InterestRequest {
  id: string;
  from_user_id: string;
  to_profile_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Search Filters
export interface MatrimonySearchFilters {
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  city?: string;
  state?: string;
  profession?: string;
  education?: string;
  subSect?: string;
  isPremium?: boolean;
}

export interface DirectorySearchFilters {
  city?: string;
  district?: string;
  profession?: string;
  functionType?: string;
}

// Admin Dashboard Types
export interface AdminDashboardStats {
  totalUsers: number;
  matrimonyProfiles: number;
  sangamDirectories: number;
  premiumMembers: number;
  pendingVerifications: number;
}

export interface AdminVerificationRequest {
  id: string;
  profile_id: string;
  user_id: string;
  profile_type: 'matrimony' | 'directory';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}
