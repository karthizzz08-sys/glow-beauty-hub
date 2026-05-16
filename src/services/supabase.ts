import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced configuration logging
const isConfigured = supabaseUrl && supabaseAnonKey;

console.log('%c[Supabase Configuration]', 'color: #0ea5e9; font-weight: bold;');
console.log(`%cVITE_SUPABASE_URL: ${supabaseUrl ? '✓ Configured' : '✗ MISSING'}`, supabaseUrl ? 'color: #10b981;' : 'color: #ef4444;');
console.log(`%cVITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Configured' : '✗ MISSING'}`, supabaseAnonKey ? 'color: #10b981;' : 'color: #ef4444;');

if (!isConfigured) {
  console.warn('%c⚠️ Supabase Configuration Missing', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
  console.warn('%cTo fix this issue:', 'font-weight: bold;');
  console.log(`
1. LOCAL DEVELOPMENT:
   - Copy .env.example to .env
   - Add: VITE_SUPABASE_URL=https://your-project.supabase.co
   - Add: VITE_SUPABASE_ANON_KEY=your-anon-key
   - Restart: npm run dev

2. VERCEL DEPLOYMENT:
   - Go to: https://vercel.com/dashboard
   - Select project: glow-beauty-hub
   - Click Settings → Environment Variables
   - Add VITE_SUPABASE_URL (value: https://your-project.supabase.co)
   - Add VITE_SUPABASE_ANON_KEY (value: your-anon-key)
   - Select ALL environments (Production, Preview, Development)
   - Redeploy project

3. GET CREDENTIALS:
   - Visit: https://app.supabase.com
   - Select your project
   - Settings → API → Copy URL and Anon Key
  `);
}

// Initialize Supabase client (or create dummy if not configured)
let supabase: any = null;

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    console.log('%c✓ Supabase client initialized successfully', 'color: #10b981; font-weight: bold;');
  } catch (error) {
    console.error('%c✗ Failed to initialize Supabase client', 'color: #ef4444; font-weight: bold;', error);
    // Don't throw - allow app to load and show error when features are used
  }
} else {
  // Create a dummy client that will show helpful errors when methods are called
  console.log('%c⚠️ Running in degraded mode - Supabase features disabled', 'color: #f59e0b;');
}

const createErrorMessage = (methodName: string) => {
  return new Error(
    `Supabase ${methodName} failed: Missing environment variables.
    
REQUIRED ENVIRONMENT VARIABLES:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Configure these in:
1. Local: Create .env file in project root
2. Vercel: Settings → Environment Variables

Then restart your app.`
  );
};

// Export the configured supabase client
export { supabase };

// Auth Services
export const authService = {
  async signUpWithEmail(email: string) {
    if (!supabase) throw createErrorMessage('signUpWithEmail');
    return supabase.auth.signUp({ email });
  },

  async signUpWithPassword(email: string, password: string) {
    if (!supabase) throw createErrorMessage('signUpWithPassword');
    return supabase.auth.signUp({ email, password });
  },

  async signInWithPassword(email: string, password: string) {
    if (!supabase) throw createErrorMessage('signInWithPassword');
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signInWithOTP(email: string, token: string) {
    if (!supabase) throw createErrorMessage('signInWithOTP');
    return supabase.auth.verifyOtp({ email, token, type: 'email' });
  },

  async signOut() {
    if (!supabase) throw createErrorMessage('signOut');
    return supabase.auth.signOut();
  },

  async getCurrentUser() {
    if (!supabase) throw createErrorMessage('getCurrentUser');
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getSession() {
    if (!supabase) throw createErrorMessage('getSession');
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async resetPassword(email: string) {
    if (!supabase) throw createErrorMessage('resetPassword');
    return supabase.auth.resetPasswordForEmail(email);
  },

  async updatePassword(newPassword: string) {
    if (!supabase) throw createErrorMessage('updatePassword');
    return supabase.auth.updateUser({ password: newPassword });
  },
};

// User Services
export const userService = {
  async createUserProfile(userId: string, userData: any) {
    if (!supabase) throw createErrorMessage('createUserProfile');
    return supabase
      .from('users')
      .insert([{ id: userId, ...userData }])
      .select();
  },

  async getUserProfile(userId: string) {
    if (!supabase) throw createErrorMessage('getUserProfile');
    return supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
  },

  async updateUserProfile(userId: string, updates: any) {
    if (!supabase) throw createErrorMessage('updateUserProfile');
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
    if (!supabase) throw createErrorMessage('createProfile');
    return supabase
      .from('matrimony_profiles')
      .insert([profileData])
      .select();
  },

  async getProfile(profileId: string) {
    if (!supabase) throw createErrorMessage('getProfile');
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('id', profileId)
      .single();
  },

  async getUserProfiles(userId: string) {
    if (!supabase) throw createErrorMessage('getUserProfiles');
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('user_id', userId);
  },

  async updateProfile(profileId: string, updates: any) {
    if (!supabase) throw createErrorMessage('updateProfile');
    return supabase
      .from('matrimony_profiles')
      .update(updates)
      .eq('id', profileId)
      .select();
  },

  async searchProfiles(filters: any, page = 1, pageSize = 10) {
    if (!supabase) throw createErrorMessage('searchProfiles');
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
    if (!supabase) throw createErrorMessage('getRecentProfiles');
    return supabase
      .from('matrimony_profiles')
      .select('*')
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(limit);
  },

  async recordProfileView(profileId: string, userId: string) {
    if (!supabase) throw createErrorMessage('recordProfileView');
    return supabase
      .from('profile_views')
      .insert([{ profile_id: profileId, viewed_by_user_id: userId }]);
  },

  async addToShortlist(userId: string, profileId: string) {
    if (!supabase) throw createErrorMessage('addToShortlist');
    return supabase
      .from('shortlist')
      .insert([{ user_id: userId, profile_id: profileId }]);
  },

  async removeFromShortlist(userId: string, profileId: string) {
    if (!supabase) throw createErrorMessage('removeFromShortlist');
    return supabase
      .from('shortlist')
      .delete()
      .eq('user_id', userId)
      .eq('profile_id', profileId);
  },

  async getShortlist(userId: string) {
    if (!supabase) throw createErrorMessage('getShortlist');
    return supabase
      .from('shortlist')
      .select('matrimony_profiles(*)')
      .eq('user_id', userId);
  },
};

// Sangam Directory Services
export const sangamDirectoryService = {
  async createEntry(entryData: any) {
    if (!supabase) throw createErrorMessage('createEntry');
    return supabase
      .from('sangam_directory')
      .insert([entryData])
      .select();
  },

  async getEntry(entryId: string) {
    if (!supabase) throw createErrorMessage('getEntry');
    return supabase
      .from('sangam_directory')
      .select('*')
      .eq('id', entryId)
      .single();
  },

  async getUserEntries(userId: string) {
    if (!supabase) throw createErrorMessage('getUserEntries');
    return supabase
      .from('sangam_directory')
      .select('*')
      .eq('user_id', userId);
  },

  async updateEntry(entryId: string, updates: any) {
    if (!supabase) throw createErrorMessage('updateEntry');
    return supabase
      .from('sangam_directory')
      .update(updates)
      .eq('id', entryId)
      .select();
  },

  async deleteEntry(entryId: string) {
    if (!supabase) throw createErrorMessage('deleteEntry');
    return supabase
      .from('sangam_directory')
      .delete()
      .eq('id', entryId);
  },

  async searchEntries(filters: any, page = 1, pageSize = 10) {
    if (!supabase) throw createErrorMessage('searchEntries');
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
    if (!supabase) throw createErrorMessage('getAllEntries');
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
    if (!supabase) throw createErrorMessage('sendInterest');
    return supabase
      .from('interests')
      .insert([{ from_user_id: fromUserId, to_profile_id: toProfileId }])
      .select();
  },

  async getUserInterests(userId: string) {
    if (!supabase) throw createErrorMessage('getUserInterests');
    return supabase
      .from('interests')
      .select('matrimony_profiles(*)')
      .eq('to_profile_id', userId)
      .eq('status', 'pending');
  },

  async respondToInterest(interestId: string, status: 'accepted' | 'rejected') {
    if (!supabase) throw createErrorMessage('respondToInterest');
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
    if (!supabase) throw createErrorMessage('getPremiumStatus');
    return supabase
      .from('premium_memberships')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  async activatePremium(userId: string, profileId: string, planType: string) {
    if (!supabase) throw createErrorMessage('activatePremium');
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
    if (!supabase) throw createErrorMessage('uploadProfilePhoto');
    return supabase.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true });
  },

  async deleteFile(bucket: string, filePath: string) {
    if (!supabase) throw createErrorMessage('deleteFile');
    return supabase.storage
      .from(bucket)
      .remove([filePath]);
  },

  async getPublicUrl(bucket: string, filePath: string) {
    if (!supabase) throw createErrorMessage('getPublicUrl');
    return supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
  },
};

// OTP Services
export const otpService = {
  /**
   * Create and store OTP in database
   * @param email - User email
   * @param otpCode - 6-digit OTP code
   * @returns OTP record with id, email, code, and expiry time
   */
  async createOTP(email: string, otpCode: string) {
    if (!supabase) throw createErrorMessage('createOTP');
    
    try {
      // Step 1: Delete any existing OTP for this email (latest OTP overwrites old ones)
      console.log('[OTP Storage] Deleting old OTPs for email:', email);
      const deleteResult = await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', email);
      
      if (deleteResult.error) {
        console.warn('[OTP Storage] Error deleting old OTPs:', deleteResult.error);
      } else {
        console.log('[OTP Storage] Old OTPs deleted, count:', deleteResult.count);
      }

      // Step 2: Calculate expiry time (10 minutes from now)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const otpData = {
        email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
        is_verified: false,
      };

      console.log('[OTP Storage] Inserting new OTP:', {
        email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
      });

      // Step 3: Insert new OTP
      const { data, error } = await supabase
        .from('otp_verifications')
        .insert([otpData])
        .select()
        .single();

      if (error) {
        console.error('[OTP Storage] Insert error:', error);
        throw error;
      }

      if (!data) {
        console.error('[OTP Storage] No data returned from insert');
        throw new Error('OTP insert returned no data');
      }

      console.log('[OTP Storage] Successfully stored OTP:', {
        id: data.id,
        email: data.email,
        otp_code: data.otp_code,
        expires_at: data.expires_at,
        created_at: data.created_at,
      });

      return { data, error: null };
    } catch (err) {
      console.error('[OTP Storage] Exception:', err);
      return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  },

  /**
   * Verify OTP by matching email and code, and checking expiry
   * @param email - User email
   * @param otpCode - 6-digit OTP code to verify
   * @returns OTP record if valid, or error if invalid/expired
   */
  async verifyOTP(email: string, otpCode: string) {
    if (!supabase) throw createErrorMessage('verifyOTP');
    
    try {
      console.log('[OTP Verify] Verifying OTP for email:', email, 'code:', otpCode);
      
      // Query for matching OTP record
      const { data, error } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otpCode)
        .eq('is_verified', false)
        .maybeSingle(); // Use maybeSingle to avoid 406 error when no record found

      if (error) {
        console.error('[OTP Verify] Database error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      // Check if record was found
      if (!data) {
        console.warn('[OTP Verify] No matching OTP found for email:', email);
        throw new Error('Invalid OTP. Please check the code and try again.');
      }

      console.log('[OTP Verify] Found OTP record:', { id: data.id, email: data.email });

      // Check if OTP has expired
      if (data.expires_at) {
        const expiryTime = new Date(data.expires_at);
        const now = new Date();
        
        console.log('[OTP Verify] Checking expiry:', {
          now: now.toISOString(),
          expires_at: data.expires_at,
          isExpired: now > expiryTime,
        });
        
        if (now > expiryTime) {
          console.warn('[OTP Verify] OTP has expired');
          throw new Error('OTP has expired. Please request a new one.');
        }
      }

      console.log('[OTP Verify] OTP is valid');
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed';
      console.error('[OTP Verify Error]', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Mark OTP as verified after successful verification
   * @param otpId - OTP record ID
   * @returns Updated OTP record
   */
  async markOTPAsVerified(otpId: string) {
    if (!supabase) throw createErrorMessage('markOTPAsVerified');
    
    return supabase
      .from('otp_verifications')
      .update({ 
        is_verified: true, 
        verified_at: new Date().toISOString() 
      })
      .eq('id', otpId)
      .select()
      .single();
  },

  /**
   * Get the latest valid OTP for an email
   * @param email - User email
   * @returns Latest unverified OTP record
   */
  async getLatestOTP(email: string) {
    if (!supabase) throw createErrorMessage('getLatestOTP');
    
    return supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
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

// Community Members Services
export const communityMembersService = {
  async createMember(memberData: any) {
    if (!supabase) throw createErrorMessage('createMember');
    return supabase
      .from('community_members')
      .insert([memberData])
      .select();
  },

  async getMember(memberId: string) {
    if (!supabase) throw createErrorMessage('getMember');
    return supabase
      .from('community_members')
      .select('*')
      .eq('id', memberId)
      .single();
  },

  async getAllMembers() {
    if (!supabase) throw createErrorMessage('getAllMembers');
    return supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async searchMembers(filters: any) {
    if (!supabase) throw createErrorMessage('searchMembers');
    let query = supabase
      .from('community_members')
      .select('*');

    if (filters.city) query = query.eq('city', filters.city);
    if (filters.district) query = query.eq('district', filters.district);
    if (filters.profession) query = query.ilike('profession', `%${filters.profession}%`);

    return query.order('created_at', { ascending: false });
  },

  async filterByCity(city: string) {
    if (!supabase) throw createErrorMessage('filterByCity');
    return supabase
      .from('community_members')
      .select('*')
      .eq('city', city)
      .order('created_at', { ascending: false });
  },

  async filterByDistrict(district: string) {
    if (!supabase) throw createErrorMessage('filterByDistrict');
    return supabase
      .from('community_members')
      .select('*')
      .eq('district', district)
      .order('created_at', { ascending: false });
  },

  async deleteMember(memberId: string) {
    if (!supabase) throw createErrorMessage('deleteMember');
    return supabase
      .from('community_members')
      .delete()
      .eq('id', memberId);
  },
};
