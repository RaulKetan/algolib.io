-- Migration: Add published column and list_types TEXT[] column to public.algorithms table
-- Keeping list_type intact for production compatibility

-- Add published column
ALTER TABLE public.algorithms ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT true;

-- Add list_types column
ALTER TABLE public.algorithms ADD COLUMN IF NOT EXISTS list_types TEXT[] NOT NULL DEFAULT ARRAY['core'];

-- Migrate existing list_type data to list_types
-- Handles the core+blind75 hack and maps others appropriately
UPDATE public.algorithms SET list_types = CASE
  WHEN list_type = 'core+blind75' THEN ARRAY['core', 'blind75']
  WHEN list_type = 'blind75' THEN ARRAY['blind75']
  WHEN list_type IS NULL OR list_type = '' THEN ARRAY['core']
  ELSE ARRAY[list_type]
END
WHERE list_types = ARRAY['core']; -- only migrate if not already modified or if default

-- Recreate policy to allow public read access only for published algorithms or admins
DROP POLICY IF EXISTS "Allow public read access" ON public.algorithms;

CREATE POLICY "Allow public read access"
    ON public.algorithms
    FOR SELECT
    TO public
    USING (published = true OR public.is_algorithms_admin());

-- Create GIN index for search performance on the list_types array
CREATE INDEX IF NOT EXISTS algorithms_list_types_gin_idx ON public.algorithms USING GIN (list_types);
