/*
  # Enable RLS on Contacts with Permissive Policy

  ## Description
  This migration re-enables RLS on the contacts table with a properly configured
  PERMISSIVE policy that allows anonymous users to insert contact form submissions.

  ## Previous Issue Analysis
  The previous RLS policies were not working despite multiple attempts. This might have been due to:
  1. Policy type not explicitly set (PERMISSIVE vs RESTRICTIVE)
  2. Missing USAGE grants on the schema
  3. Policy ordering or conflicts
  
  ## Solution Approach
  1. Ensure schema permissions are granted
  2. Create explicit PERMISSIVE policy (default but making it explicit)
  3. Use simplified policy structure
  4. Test after each step

  ## Security Model
  - Anonymous users (anon): Can INSERT contact submissions only
  - Authenticated users: Can SELECT, UPDATE contact records
  - No one can DELETE (preserve all submissions)

  ## Changes Made
  1. Grant necessary schema and table permissions
  2. Enable RLS on contacts table
  3. Create PERMISSIVE INSERT policy for all users
  4. Create SELECT/UPDATE policies for authenticated users
*/

-- Step 1: Ensure schema and table permissions are properly granted
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant specific permissions on contacts table
GRANT SELECT, INSERT ON public.contacts TO anon;
GRANT SELECT, INSERT, UPDATE ON public.contacts TO authenticated;

-- Step 2: Enable RLS on contacts table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Step 3: Create PERMISSIVE policy for INSERT (allows anyone to submit forms)
-- Using PERMISSIVE explicitly and not specifying TO clause (applies to all roles)
CREATE POLICY "allow_insert_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Step 4: Create SELECT policy for authenticated users only
CREATE POLICY "allow_select_contacts_authenticated"
  ON public.contacts
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 5: Create UPDATE policy for authenticated users only
CREATE POLICY "allow_update_contacts_authenticated"
  ON public.contacts
  AS PERMISSIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Note: No DELETE policy - we want to preserve all contact submissions
-- Only superuser/service role can delete records

-- Update table comment to reflect new secure state
COMMENT ON TABLE public.contacts IS 
'Contact form submissions with RLS enabled.
- Anonymous users can INSERT (submit forms)
- Authenticated users can SELECT and UPDATE
- No DELETE policy (preserves all data)';
