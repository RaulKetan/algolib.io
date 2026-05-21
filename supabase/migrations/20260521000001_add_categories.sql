-- Migration: Add categories TEXT[] column to public.algorithms table
-- Keep single category TEXT column intact and sync bidirectionally using a trigger

-- 1. Add categories column
ALTER TABLE public.algorithms ADD COLUMN IF NOT EXISTS categories TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- 2. Populate categories from existing category column
UPDATE public.algorithms 
SET categories = regexp_split_to_array(category, '\s*,\s*')
WHERE (categories IS NULL OR categories = ARRAY[]::TEXT[]) AND category IS NOT NULL AND category != '';

-- 3. Create/Replace bidirectional sync function
CREATE OR REPLACE FUNCTION public.sync_algorithms_categories()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.categories IS NOT NULL AND array_length(NEW.categories, 1) > 0 THEN
      NEW.category := array_to_string(NEW.categories, ', ');
    ELSIF NEW.category IS NOT NULL THEN
      NEW.categories := regexp_split_to_array(NEW.category, '\s*,\s*');
    ELSE
      NEW.categories := ARRAY[]::TEXT[];
      NEW.category := '';
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.categories IS DISTINCT FROM OLD.categories THEN
      NEW.category := array_to_string(NEW.categories, ', ');
    ELSIF NEW.category IS DISTINCT FROM OLD.category THEN
      NEW.categories := regexp_split_to_array(NEW.category, '\s*,\s*');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger
DROP TRIGGER IF EXISTS trg_sync_algorithms_categories ON public.algorithms;
CREATE TRIGGER trg_sync_algorithms_categories
  BEFORE INSERT OR UPDATE ON public.algorithms
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_algorithms_categories();

-- 5. Create GIN index on categories
CREATE INDEX IF NOT EXISTS algorithms_categories_gin_idx ON public.algorithms USING GIN (categories);
