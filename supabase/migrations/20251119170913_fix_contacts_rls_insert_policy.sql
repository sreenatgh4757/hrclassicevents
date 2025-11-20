/*
  # Fix Contacts RLS Insert Policy

  ## Description
  This migration ensures the RLS policy for inserting contact form submissions is properly configured.
  The policy allows anonymous users to submit contact forms without authentication.

  ## Issue Addressed
  Users were receiving "Internal Server Error" when submitting contact forms because the
  RLS policy was blocking INSERT operations for anonymous users.

  ## Changes Made

  ### 1. Drop and Recreate Insert Policy
  - Drop the existing "Anyone can submit contact forms" policy (if it exists)
  - Recreate it with proper permissions for both anonymous (anon) and authenticated users
  - Uses WITH CHECK (true) to allow all insertions without restrictions

  ## Security Considerations
  - This policy is intentionally permissive for contact form submissions
  - Anonymous users can only INSERT, not SELECT, UPDATE, or DELETE
  - Sensitive contact data is protected by separate SELECT policies (authenticated only)
  - Rate limiting and spam prevention should be handled at the application layer

  ## Testing
  After applying this migration:
  1. Anonymous users should be able to submit contact forms successfully
  2. Form submissions should save to the contacts table
  3. No authentication should be required for form submission
*/

-- Drop the existing policy if it exists (to handle any corrupted state)
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contacts;

-- Recreate the policy to ensure it's properly configured
CREATE POLICY "Anyone can submit contact forms"
  ON contacts 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Verify RLS is enabled on contacts table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
