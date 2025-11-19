/*
  # Fix Contacts RLS - Add Public Role Policy

  ## Description
  This migration adds an explicit policy for the PUBLIC role to allow contact form submissions.
  The previous policy targeted 'anon' and 'authenticated' but may not have covered all cases.

  ## Issue Analysis
  The RLS error persists despite having a policy for anon/authenticated roles.
  This suggests we need to be more explicit about which roles can insert.

  ## Changes Made

  ### 1. Drop All Existing Contact Insert Policies
  - Ensures clean slate for policy recreation
  - Removes any conflicting or corrupted policies

  ### 2. Create New Policy for PUBLIC Role
  - PUBLIC role encompasses all users (anon and authenticated)
  - More permissive and simpler than targeting specific roles
  - Still maintains security by only allowing INSERT operations

  ### 3. Verify All Required Policies Exist
  - Ensures SELECT policy exists for authenticated users
  - Ensures UPDATE policy exists for authenticated users
  - Maintains separation of concerns for different operations

  ## Security Notes
  - PUBLIC can INSERT (submit forms) but cannot SELECT (view submissions)
  - Only authenticated users can view/update contact records
  - This is standard practice for public-facing contact forms
*/

-- Drop all existing policies on contacts table to start fresh
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contacts;
DROP POLICY IF EXISTS "Public can submit contact forms" ON contacts;

-- Create a new policy using PUBLIC role (covers anon and authenticated)
CREATE POLICY "Public can submit contact forms"
  ON contacts 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Ensure other required policies exist for authenticated users
-- Drop and recreate to ensure they're correct
DROP POLICY IF EXISTS "Authenticated users can view all contacts" ON contacts;
CREATE POLICY "Authenticated users can view all contacts"
  ON contacts 
  FOR SELECT 
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update contacts" ON contacts;
CREATE POLICY "Authenticated users can update contacts"
  ON contacts 
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
