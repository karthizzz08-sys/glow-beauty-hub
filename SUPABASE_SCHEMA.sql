-- Chettiar Connect - Supabase Database Schema
-- Execute these SQL commands in your Supabase project

-- ================================================
-- 1. USERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone_number VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  verified BOOLEAN DEFAULT FALSE,
  user_type VARCHAR(50) DEFAULT 'user', -- 'matrimony', 'directory', 'admin'
  last_login TIMESTAMP WITH TIME ZONE,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- ================================================
-- 2. MATRIMONY PROFILES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS matrimony_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL, -- 'male' or 'female'
  date_of_birth DATE NOT NULL,
  community VARCHAR(100) DEFAULT 'Chettiar',
  sub_sect VARCHAR(100),
  education VARCHAR(100),
  profession VARCHAR(100),
  salary VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(100),
  phone_number VARCHAR(20),
  email VARCHAR(255),
  profile_photo_url TEXT,
  horoscope_url TEXT,
  about_me TEXT,
  partner_expectations TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  interest_count INTEGER DEFAULT 0,
  CONSTRAINT unique_user_profile UNIQUE(user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_matrimony_gender ON matrimony_profiles(gender);
CREATE INDEX IF NOT EXISTS idx_matrimony_city ON matrimony_profiles(city);
CREATE INDEX IF NOT EXISTS idx_matrimony_verified ON matrimony_profiles(verified);
CREATE INDEX IF NOT EXISTS idx_matrimony_premium ON matrimony_profiles(is_premium);

-- ================================================
-- 3. SANGAM DIRECTORY TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS sangam_directory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  family_name VARCHAR(255),
  photo_url TEXT,
  phone_number VARCHAR(20) NOT NULL,
  whatsapp_number VARCHAR(20),
  address TEXT NOT NULL,
  area VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  profession VARCHAR(100),
  function_types TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of function types
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_directory_user UNIQUE(user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_directory_city ON sangam_directory(city);
CREATE INDEX IF NOT EXISTS idx_directory_district ON sangam_directory(district);
CREATE INDEX IF NOT EXISTS idx_directory_profession ON sangam_directory(profession);

-- ================================================
-- 4. OTP VERIFICATIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '10 minutes',
  verified_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT otp_format CHECK (LENGTH(otp_code) = 6)
);

-- Create index for OTP lookups
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verifications(email);
CREATE INDEX IF NOT EXISTS idx_otp_code ON otp_verifications(otp_code);

-- ================================================
-- 5. PREMIUM MEMBERSHIPS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS premium_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'basic', 'premium', 'platinum'
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  payment_id VARCHAR(255),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_premium_user ON premium_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_premium_active ON premium_memberships(is_active);

-- ================================================
-- 6. PROFILE VIEWS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  viewed_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profile_view_profile ON profile_views(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_view_user ON profile_views(viewed_by_user_id);

-- ================================================
-- 7. INTERESTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_profile_id UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_interest UNIQUE(from_user_id, to_profile_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interest_from_user ON interests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_interest_to_profile ON interests(to_profile_id);
CREATE INDEX IF NOT EXISTS idx_interest_status ON interests(status);

-- ================================================
-- 8. SHORTLIST TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS shortlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_shortlist UNIQUE(user_id, profile_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_shortlist_user ON shortlist(user_id);

-- ================================================
-- 9. SUCCESS STORIES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id_1 UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  profile_id_2 UUID NOT NULL REFERENCES matrimony_profiles(id) ON DELETE CASCADE,
  story_title VARCHAR(255),
  story_description TEXT,
  wedding_date DATE,
  photo_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- 10. ENABLE ROW LEVEL SECURITY
-- ================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matrimony_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sangam_directory ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- ================================================
-- 11. ROW LEVEL SECURITY POLICIES
-- ================================================

-- Users table - Users can only see/update their own data
CREATE POLICY "Users can see their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Matrimony profiles - Public profiles are visible, users own theirs
CREATE POLICY "Verified matrimony profiles are public" ON matrimony_profiles
  FOR SELECT USING (verified = true);

CREATE POLICY "Users can see their own matrimony profile" ON matrimony_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create matrimony profiles" ON matrimony_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own matrimony profile" ON matrimony_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Sangam directory - Public visibility
CREATE POLICY "Sangam directory is publicly visible" ON sangam_directory
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own directory entry" ON sangam_directory
  FOR ALL USING (auth.uid() = user_id);

-- Profile views
CREATE POLICY "Users can view all profile views" ON profile_views
  FOR SELECT USING (true);

CREATE POLICY "Users can create profile views" ON profile_views
  FOR INSERT WITH CHECK (auth.uid() = viewed_by_user_id);

-- Interests
CREATE POLICY "Users can see their own interests" ON interests
  FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() IN (
    SELECT user_id FROM matrimony_profiles WHERE id = to_profile_id
  ));

CREATE POLICY "Users can send interests" ON interests
  FOR INSERT WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update their received interests" ON interests
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM matrimony_profiles WHERE id = to_profile_id
  ));

-- Shortlist
CREATE POLICY "Users can see their shortlist" ON shortlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their shortlist" ON shortlist
  FOR ALL USING (auth.uid() = user_id);

-- Success stories
CREATE POLICY "Success stories are public" ON success_stories
  FOR SELECT USING (true);

-- ================================================
-- 12. STORAGE BUCKETS SETUP
-- ================================================
-- Create storage buckets for file uploads
-- Execute these via Supabase dashboard or API:
-- 1. Create bucket: profile-photos (Public)
-- 2. Create bucket: horoscopes (Private)

-- ================================================
-- 13. HELPFUL FUNCTIONS
-- ================================================

-- Function to calculate age
CREATE OR REPLACE FUNCTION calculate_age(dob DATE)
RETURNS INTEGER AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(dob));
END;
$$ LANGUAGE plpgsql;

-- Function to update matrimony profile view count
CREATE OR REPLACE FUNCTION increment_profile_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE matrimony_profiles
  SET view_count = view_count + 1
  WHERE id = NEW.profile_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_profile_views
AFTER INSERT ON profile_views
FOR EACH ROW
EXECUTE FUNCTION increment_profile_views();

-- Function to update matrimony profile interest count
CREATE OR REPLACE FUNCTION increment_profile_interests()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE matrimony_profiles
  SET interest_count = interest_count + 1
  WHERE id = NEW.to_profile_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_profile_interests
AFTER INSERT ON interests
FOR EACH ROW
EXECUTE FUNCTION increment_profile_interests();
