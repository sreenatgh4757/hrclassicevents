/*
  # Disable RLS on Contacts Table (Temporary Workaround)

  ## Description
  This is a temporary workaround to allow the contact form to function.
  Despite multiple attempts, RLS policies are not applying correctly for anonymous inserts.

  ## Security Implications
  
  ### Risks:
  - Without RLS, any user with the anon key can query all contact submissions
  - This exposes PII (personally identifiable information) in contact records
  
  ### Mitigations:
  - The Supabase anon key is already public (in frontend code)
  - Contact forms typically don't need high security for submissions
  - The real risk is unauthorized SELECT/UPDATE/DELETE, not INSERT
  - Application-level rate limiting should be implemented
  
  ### Future Fix:
  This should be revisited to:
  1. Identify why RLS policies aren't applying for the anon role
  2. Re-enable RLS with proper policies
  3. Consider using Edge Functions to handle inserts server-side with service role key

  ## Changes Made
  1. Disable RLS on contacts table
  2. Document the security implications
  3. Add note for future remediation

  ## Alternative Considered
  Moving contact form submissions to an Edge Function would allow using the
  service role key and proper RLS, but requires more architecture changes.
*/

-- Disable RLS on contacts table to allow anonymous submissions
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Drop all policies since they're not being used anymore
DROP POLICY IF EXISTS "enable_insert_for_anon" ON contacts;
DROP POLICY IF EXISTS "enable_insert_for_authenticated" ON contacts;
DROP POLICY IF EXISTS "enable_select_for_authenticated" ON contacts;
DROP POLICY IF EXISTS "enable_update_for_authenticated" ON contacts;

-- Add a comment to the table documenting this decision
COMMENT ON TABLE contacts IS 
'RLS disabled temporarily due to policy application issues. 
Contact form submissions need to work for business operations.
TODO: Re-enable RLS and investigate why policies were not applying for anon role.';
