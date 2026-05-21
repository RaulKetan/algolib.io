-- --- START OF 20251223_add_profile_privacy.sql ---
-- Add is_public field to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- Create index for performance on public profile queries
CREATE INDEX IF NOT EXISTS idx_profiles_is_public ON public.profiles(is_public);
CREATE INDEX IF NOT EXISTS idx_profiles_username_public ON public.profiles(username, is_public) WHERE username IS NOT NULL;

-- Update RLS policies to allow public access to public profiles
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Create new policy that allows viewing public profiles
CREATE POLICY "Anyone can view public profiles"
  ON public.profiles FOR SELECT
  USING (is_public = true OR auth.uid() = id);

-- Users can still update their own profiles
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Insert profile_private feature flag
INSERT INTO public.feature_flags (key, description, is_enabled)
VALUES (
  'profile_private',
  'Enables users to make their profiles private. When disabled, all profiles are public.',
  false
)
ON CONFLICT (key) DO NOTHING;

-- --- END OF 20251223_add_profile_privacy.sql ---

-- --- START OF 20251223_allow_public_profile_data.sql ---
-- Update RLS policies to allow viewing public profile data

-- Drop existing restrictive policy on user_algorithm_data
DROP POLICY IF EXISTS "Users can view own data" ON public.user_algorithm_data;

-- Create new policy that allows:
-- 1. Users can view their own data
-- 2. Users can view data of users with public profiles
CREATE POLICY "Users can view own data or public profile data"
  ON public.user_algorithm_data FOR SELECT
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = user_algorithm_data.user_id 
      AND profiles.is_public = true
    )
  );

-- Also update profiles policy to allow viewing public profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own or public profiles"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    is_public = true
  );

-- --- END OF 20251223_allow_public_profile_data.sql ---

-- --- START OF 20251223_auto_generate_username.sql ---
-- Update handle_new_user function to auto-generate username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate base username from full name or email
  IF NEW.raw_user_meta_data->>'full_name' IS NOT NULL THEN
    -- Remove spaces, convert to lowercase, take first 15 chars
    base_username := lower(regexp_replace(
      substring(NEW.raw_user_meta_data->>'full_name', 1, 15),
      '[^a-zA-Z0-9]', '', 'g'
    ));
  ELSE
    -- Use part of email if no name provided
    base_username := lower(split_part(NEW.email, '@', 1));
  END IF;
  
  -- Ensure we have at least something
  IF base_username = '' OR base_username IS NULL THEN
    base_username := 'user';
  END IF;
  
  -- Add random suffix to make it unique
  final_username := 'user_' || base_username || '_' || floor(random() * 10000)::text;
  
  -- Ensure uniqueness (retry if collision)
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    counter := counter + 1;
    final_username := 'user_' || base_username || '_' || floor(random() * 10000)::text;
    
    -- Prevent infinite loop
    IF counter > 10 THEN
      final_username := 'user_' || gen_random_uuid()::text;
      EXIT;
    END IF;
  END LOOP;
  
  INSERT INTO public.profiles (id, email, full_name, username)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    final_username
  );
  RETURN NEW;
END;
$$;

-- --- END OF 20251223_auto_generate_username.sql ---

