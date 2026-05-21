-- --- START OF 20251203_add_user_progress_fields.sql ---
-- Add code and is_favorite columns to user_progress table
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS code TEXT,
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT FALSE;

-- Create index for is_favorite for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_is_favorite ON public.user_progress(is_favorite);

-- Add missing DELETE policy for user_progress
DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
CREATE POLICY "Users can delete own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- --- END OF 20251203_add_user_progress_fields.sql ---

-- --- START OF 20251203_create_user_algorithm_data.sql ---
-- Create user_algorithm_data table to consolidate all user-specific algorithm data
-- This replaces and extends the user_progress table

CREATE TABLE IF NOT EXISTS public.user_algorithm_data (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  algorithm_id TEXT NOT NULL,
  
  -- Progress Tracking
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  
  -- Code Storage (JSON for multi-language support)
  code JSONB DEFAULT '{}'::jsonb,
  
  -- Submission History (Array of submission objects)
  submissions JSONB DEFAULT '[]'::jsonb,
  
  -- Notes & Whiteboard
  notes TEXT,
  whiteboard_data JSONB,
  
  -- Social Interactions
  is_favorite BOOLEAN DEFAULT FALSE,
  user_vote TEXT CHECK (user_vote IN ('like', 'dislike', NULL)),
  share_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_viewed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  
  -- Constraints
  UNIQUE(user_id, algorithm_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_user_id ON public.user_algorithm_data(user_id);
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_algorithm_id ON public.user_algorithm_data(algorithm_id);
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_completed ON public.user_algorithm_data(completed);
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_is_favorite ON public.user_algorithm_data(is_favorite);
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_user_vote ON public.user_algorithm_data(user_vote);
CREATE INDEX IF NOT EXISTS idx_user_algorithm_data_user_algo ON public.user_algorithm_data(user_id, algorithm_id);

-- Enable Row Level Security
ALTER TABLE public.user_algorithm_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own algorithm data"
  ON public.user_algorithm_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own algorithm data"
  ON public.user_algorithm_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own algorithm data"
  ON public.user_algorithm_data FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own algorithm data"
  ON public.user_algorithm_data FOR DELETE
  USING (auth.uid() = user_id);

-- Migrate existing data from user_progress table
INSERT INTO public.user_algorithm_data (
  user_id,
  algorithm_id,
  completed,
  completed_at,
  code,
  is_favorite,
  created_at,
  updated_at
)
SELECT 
  user_id,
  algorithm_id,
  completed,
  completed_at,
  CASE 
    WHEN code IS NOT NULL THEN jsonb_build_object('default', code)
    ELSE '{}'::jsonb
  END as code,
  COALESCE(is_favorite, FALSE) as is_favorite,
  created_at,
  COALESCE(updated_at, created_at) as updated_at
FROM public.user_progress
ON CONFLICT (user_id, algorithm_id) DO NOTHING;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_user_algorithm_data_updated_at
  BEFORE UPDATE ON public.user_algorithm_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table for documentation
COMMENT ON TABLE public.user_algorithm_data IS 'Stores all user-specific algorithm data including progress, code, notes, whiteboard, and social interactions';

-- --- END OF 20251203_create_user_algorithm_data.sql ---

