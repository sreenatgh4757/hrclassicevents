/*
  # Fix RLS - Apply INSERT Policy to ALL Roles

  ## Description
  Previous attempts to create RLS policies for anon role have failed.
  This migration tries a different approach by not specifying the TO clause,
  which should make the policy apply to ALL roles by default.

  ## Debugging Steps
  1. Drop all existing policies completely
  2. Verify RLS is enabled
  3. Create the simplest possible PERMISSIVE INSERT policy
  4. Do NOT specify TO clause (applies to all roles)
  5. Use AS PERMISSIVE explicitly

  ## Technical Note
  When no role is specified in CREATE POLICY, it defaults to PUBLIC which
  includes all roles (anon, authenticated, service_role, etc.)
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_insert_contacts" ON public.contacts;
DROP POLICY IF EXISTS "allow_select_contacts_authenticated" ON public.contacts;
DROP POLICY IF EXISTS "allow_update_contacts_authenticated" ON public.contacts;

-- Verify RLS is enabled
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible INSERT policy
-- No TO clause means it applies to PUBLIC (all roles)
CREATE POLICY "contacts_allow_all_insert"
  ON public.contacts
  AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Create SELECT policy for authenticated only
CREATE POLICY "contacts_allow_authenticated_select"
  ON public.contacts
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for authenticated only
CREATE POLICY "contacts_allow_authenticated_update"
  ON public.contacts
  AS PERMISSIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
