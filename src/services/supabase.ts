import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variables
console.log('[Supabase Config] URL:', supabaseUrl ? '✓ Loaded' : '✗ Missing');
console.log('[Supabase Config] Anon Key:', supabaseAnonKey ? '✓ Loaded' : '✗ Missing');
console.log('[Supabase Config] Full env:', import.meta.env);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth Services
export const authService = {
  async signUpWithEmail(email: string) {
    return supabase.auth.signUp({ email });
  },

  async signInWithOTP(email: string, token: string) {
    return supabase.auth.verifyOtp({ email, token, type: 'email' });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },
};

// User Services
export const userService = {
  async createUserProfile(userId: string, userData: any) {
    return supabase
      .from('users')
      .insert([{ id: userId, ...userData }])
      .select();
  },

  async getUserProfile(userId: string) {
    return supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
  },

  async updateUserProfile(userId: string, updates: any) {
    return supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();
  },
};

// Matrimony Profile Services
export const matrimonyService = {
  async createProfile(profileData: any) {
    return supabase
      .from('matrimony_profiles')
      .insert([profileData])
      .select();
  },

  async getProfile(profileId: string) {
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('id', profileId)
      .single();
  },

  async getUserProfiles(userId: string) {
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('user_id', userId);
  },

  async updateProfile(profileId: string, updates: any) {
    return supabase
      .from('matrimony_profiles')
      .update(updates)
      .eq('id', profileId)
      .select();
  },

  async searchProfiles(filters: any, page = 1, pageSize = 10) {
    let query = supabase
      .from('matrimony_profiles')
      .select('*', { count: 'exact' })
      .eq('verified', true);

    if (filters.gender) query = query.eq('gender', filters.gender);
    if (filters.city) query = query.eq('city', filters.city);
    if (filters.profession) query = query.ilike('profession', `%${filters.profession}%`);
    if (filters.education) query = query.eq('education', filters.education);
    if (filters.subSect) query = query.eq('sub_sect', filters.subSect);

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    return query.range(start, end);
  },

  async getRecentProfiles(limit = 10) {
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(limit);
  },

  async recordProfileView(profileId: string, userId: string) {
    return supabase
      .from('profile_views')
      .insert([{ profile_id: profileId, viewed_by_user_id: userId }]);
  },

  async addToShortlist(userId: string, profileId: string) {
    return supabase
      .from('shortlist')
      .insert([{ user_id: userId, profile_id: profileId }]);
  },

  async removeFromShortlist(userId: string, profileId: string) {
    return supabase
      .from('shortlist')
      .delete()
      .eq('user_id', userId)
      .eq('profile_id', profileId);
  },

  async getShortlist(userId: string) {
    return supabase
      .from('shortlist')
      .select('matrimony_profiles(*)')
      .eq('user_id', userId);
  },
};

// Sangam Directory Services
export const sangamDirectoryService = {
  async createEntry(entryData: any) {
    return supabase
      .from('sangam_directory')
      .insert([entryData])
      .select();
  },

  async getEntry(entryId: string) {
    return supabase
      .from('sangam_directory')
      .select('*')
      .eq('id', entryId)
      .single();
  },

  async getUserEntries(userId: string) {
    return supabase
      .from('sangam_directory')
      .select('*')
      .eq('user_id', userId);
  },

  async updateEntry(entryId: string, updates: any) {
    return supabase
      .from('sangam_directory')
      .update(updates)
      .eq('id', entryId)
      .select();
  },

  async deleteEntry(entryId: string) {
    return supabase
      .from('sangam_directory')
      .delete()
      .eq('id', entryId);
  },

  async searchEntries(filters: any, page = 1, pageSize = 10) {
    let query = supabase
      .from('sangam_directory')
      .select('*', { count: 'exact' });

    if (filters.city) query = query.eq('city', filters.city);
    if (filters.district) query = query.eq('district', filters.district);
    if (filters.profession) query = query.ilike('profession', `%${filters.profession}%`);
    if (filters.functionType) {
      query = query.contains('function_types', [filters.functionType]);
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    return query.range(start, end);
  },

  async getAllEntries(page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    return supabase
      .from('sangam_directory')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end);
  },
};

// Interest Services
export const interestService = {
  async sendInterest(fromUserId: string, toProfileId: string) {
    return supabase
      .from('interests')
      .insert([{ from_user_id: fromUserId, to_profile_id: toProfileId }])
      .select();
  },

  async getUserInterests(userId: string) {
    return supabase
      .from('interests')
      .select('matrimony_profiles(*)')
      .eq('to_profile_id', userId)
      .eq('status', 'pending');
  },

  async respondToInterest(interestId: string, status: 'accepted' | 'rejected') {
    return supabase
      .from('interests')
      .update({ status })
      .eq('id', interestId)
      .select();
  },
};

// Premium Membership Services
export const premiumService = {
  async getPremiumStatus(userId: string) {
    return supabase
      .from('premium_memberships')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  async activatePremium(userId: string, profileId: string, planType: string) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    return supabase
      .from('premium_memberships')
      .insert([{
        user_id: userId,
        profile_id: profileId,
        plan_type: planType,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        is_active: true,
      }])
      .select();
  },
};

// File Upload Services
export const fileService = {
  async uploadProfilePhoto(bucket: string, filePath: string, file: File) {
    return supabase.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true });
  },

  async deleteFile(bucket: string, filePath: string) {
    return supabase.storage
      .from(bucket)
      .remove([filePath]);
  },

  async getPublicUrl(bucket: string, filePath: string) {
    return supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
  },
};

// OTP Services
export const otpService = {
  async createOTP(email: string) {
    return supabase
      .from('otp_verifications')
      .insert([{ email }])
      .select();
  },

  async verifyOTP(email: string, otpCode: string) {
    return supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otpCode)
      .eq('is_verified', false)
      .single();
  },

  async markOTPAsVerified(otpId: string) {
    return supabase
      .from('otp_verifications')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('id', otpId)
      .select();
  },
};

// Admin Services
export const adminService = {
  async getDashboardStats() {
    const [usersRes, matrimonyRes, sangamRes, premiumRes] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact' }),
      supabase.from('matrimony_profiles').select('*', { count: 'exact' }),
      supabase.from('sangam_directory').select('*', { count: 'exact' }),
      supabase.from('premium_memberships').select('*', { count: 'exact' }).eq('is_active', true),
    ]);

    return {
      totalUsers: usersRes.count,
      matrimonyProfiles: matrimonyRes.count,
      sangamDirectories: sangamRes.count,
      premiumMembers: premiumRes.count,
    };
  },

  async getPendingVerifications() {
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('verified', false)
      .order('created_at', { ascending: true });
  },

  async verifyProfile(profileId: string) {
    return supabase
      .from('matrimony_profiles')
      .update({ verified: true })
      .eq('id', profileId)
      .select();
  },

  async rejectProfile(profileId: string) {
    return supabase
      .from('matrimony_profiles')
      .delete()
      .eq('id', profileId);
  },

  async getAllProfiles() {
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async getAllDirectoryEntries() {
    return supabase
      .from('sangam_directory')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async deleteUser(userId: string) {
    return supabase
      .from('users')
      .delete()
      .eq('id', userId);
  },

  async togglePremiumStatus(memberId: string, status: boolean) {
    return supabase
      .from('premium_memberships')
      .update({ is_active: status })
      .eq('id', memberId)
      .select();
  },
};
