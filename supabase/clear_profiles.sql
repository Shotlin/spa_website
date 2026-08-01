-- SQL Script to remove/clear profile records from the database table.
-- You can run this script directly in the Supabase SQL Editor if any test profiles were inserted into the database.

BEGIN;

-- Truncate all profile listings from the profiles table
TRUNCATE TABLE public.profiles CASCADE;

COMMIT;
