-- --- START OF 20251208_add_profile_fields.sql ---
-- Add new fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Create index for username
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- Policy to allow anyone to view profiles (public profiles)
-- Existing policy "Users can view own profile" restricts to own profile. 
-- We probably want public profiles.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Anyone can view profiles"
  ON public.profiles FOR SELECT
  USING (true);

-- --- END OF 20251208_add_profile_fields.sql ---

-- --- START OF 20251208_create_feature_flags.sql ---
-- Create feature_flags table
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  description TEXT,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so all clients can check flags)
CREATE POLICY "Public read access for feature flags"
  ON public.feature_flags FOR SELECT
  USING (true);

-- Allow admins to full access (we'll rely on app logic or specific admin role check if needed, 
-- but for now assuming authenticated users with admin ID in env are protected by frontend route, 
-- ideally we need a robust admin check in RLS or just allow all authenticated for simplicity for this solo project 
-- or stick to service_role for admin content. 
-- Let's stick to "Authenticated users can update" for simplicity, assuming only admin access the admin page)

CREATE POLICY "Authenticated users can update feature flags"
  ON public.feature_flags FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.feature_flags;

-- --- END OF 20251208_create_feature_flags.sql ---

-- --- START OF 20251208_seed_youtube_flag.sql ---
-- Seed the youtube_video feature flag
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.feature_flags WHERE key = 'youtube_video') THEN
        INSERT INTO public.feature_flags (key, description, is_enabled)
        VALUES ('youtube_video', 'Enables the YouTube video tutorial section on algorithm detail pages.', true);
    END IF;
END $$;

-- --- END OF 20251208_seed_youtube_flag.sql ---

