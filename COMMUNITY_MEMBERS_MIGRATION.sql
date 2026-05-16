-- Community Members Table for Sangam Directory
-- Execute this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  profession VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_community_city ON community_members(city);
CREATE INDEX IF NOT EXISTS idx_community_district ON community_members(district);
CREATE INDEX IF NOT EXISTS idx_community_profession ON community_members(profession);

-- Grant access
GRANT ALL ON community_members TO authenticated;
GRANT ALL ON community_members TO anon;
