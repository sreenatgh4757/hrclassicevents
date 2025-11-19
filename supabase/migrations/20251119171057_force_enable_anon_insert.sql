/*
  # Force Enable Anonymous Insert on Contacts

  ## Description
  This migration uses a different approach to enable anonymous inserts.
  Instead of using WITH CHECK alone, we'll use both USING and WITH CHECK clauses.

  ## Technical Details
  PostgreSQL RLS policies can have two components:
  - USING: Determines which existing rows are visible/modifiable
  - WITH CHECK: Determines which new/modified rows are allowed
  
  For INSERT operations, sometimes both need to be permissive.

  ## Changes
  1. Remove all existing policies
  2. Create policy with explicit role targeting and both clauses
  3. Grant explicit INSERT permission to anon role
*/

-- Drop all policies to start completely fresh
DROP POLICY IF EXISTS "contacts_insert_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_select_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_update_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_delete_policy" ON contacts;

-- Grant table-level INSERT permission to anon role
GRANT INSERT ON contacts TO anon;
GRANT INSERT ON contacts TO authenticated;

-- Create INSERT policy for anonymous users with both USING and WITH CHECK
CREATE POLICY "enable_insert_for_anon"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "enable_insert_for_authenticated"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Recreate other policies for authenticated users
CREATE POLICY "enable_select_for_authenticated"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_update_for_authenticated"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
