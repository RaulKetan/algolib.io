-- Migration: Allow public read access to the feedback table
-- This enables the public feedback screen to load submissions for all users

CREATE POLICY "Anyone can view feedback" 
ON public.feedback 
FOR SELECT 
USING (true);
