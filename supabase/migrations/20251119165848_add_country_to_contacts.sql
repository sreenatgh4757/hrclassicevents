/*
  # Add Country Column to Contacts Table

  ## Description
  This migration adds a `country` column to the contacts table to store the user's country/region selection from the contact form.

  ## Changes Made

  ### 1. Add Country Column
  - Added `country` column to `contacts` table
  - Type: TEXT (allows any country name)
  - Nullable: YES (optional field, not all submissions require it)
  - No default value (null if not provided)

  ## Business Context
  The contact form collects country/region information to:
  - Provide region-specific event planning services
  - Calculate appropriate budget ranges in local currencies
  - Understand geographic distribution of inquiries
  - Tailor responses to regional event preferences

  ## Impact
  - Existing records will have NULL for country (backward compatible)
  - New form submissions will include country data
  - No breaking changes to existing queries
*/

-- Add country column to contacts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'contacts'
    AND column_name = 'country'
  ) THEN
    ALTER TABLE public.contacts ADD COLUMN country TEXT;
  END IF;
END $$;
