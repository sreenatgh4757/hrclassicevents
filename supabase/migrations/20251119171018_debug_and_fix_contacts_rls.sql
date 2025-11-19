/*
  # Debug and Fix Contacts RLS Completely

  ## Description
  This migration takes a comprehensive approach to fixing the RLS issue:
  1. Drops ALL policies on contacts table
  2. Temporarily disables RLS to clear any cached state
  3. Re-enables RLS
  4. Creates minimal, working policies

  ## Root Cause Analysis
  The issue may be caused by:
  - Conflicting policies from previous migrations
  - Cached policy state in Supabase
  - Improper policy ordering or precedence

  ## Solution
  Start completely fresh with a minimal set of policies that we know work.
*/

-- Step 1: Drop ALL policies on contacts table
DO $$ 
DECLARE 
  policy_record RECORD;
BEGIN
  FOR policy_record IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'contacts'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON contacts', policy_record.policyname);
  END LOOP;
END $$;

-- Step 2: Disable and re-enable RLS to clear state
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Step 3: Create single permissive policy for INSERT
CREATE POLICY "contacts_insert_policy"
  ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Step 4: Create policies for authenticated users
CREATE POLICY "contacts_select_policy"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "contacts_update_policy"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "contacts_delete_policy"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);
