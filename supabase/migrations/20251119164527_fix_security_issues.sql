/*
  # Fix Security Issues

  ## Description
  This migration addresses security concerns by:
  1. Removing unused indexes that provide no performance benefit but increase storage overhead
  2. Fixing the search_path for the update_updated_at_column function to prevent security vulnerabilities

  ## Changes Made

  ### 1. Removed Unused Indexes
  The following indexes were identified as unused and have been dropped:
  
  **Reviews Table:**
  - `idx_reviews_featured` - Index on is_featured column
  - `idx_reviews_display_order` - Index on display_order column  
  - `idx_reviews_approved` - Index on is_approved column
  
  **Contacts Table:**
  - `idx_contacts_created_at` - Index on created_at column
  - `idx_contacts_status` - Index on status column
  - `idx_contacts_event_date` - Index on event_date column
  
  **Gallery Images Table:**
  - `idx_gallery_display_order` - Index on display_order column
  - `idx_gallery_visible` - Index on is_visible column
  - `idx_gallery_category` - Index on category column

  ### 2. Fixed Function Search Path
  - Recreated `update_updated_at_column` function with explicit schema qualification
  - Removed mutable search_path vulnerability by using fully qualified object names

  ## Security Impact
  - Reduces database surface area by removing unnecessary indexes
  - Prevents potential SQL injection via search_path manipulation
  - Improves database maintenance by removing unused objects

  ## Performance Impact
  - Slightly reduces storage usage
  - Improves INSERT/UPDATE performance (fewer indexes to maintain)
  - No negative impact on query performance (indexes were unused)
*/

-- Drop unused indexes on reviews table
DROP INDEX IF EXISTS idx_reviews_featured;
DROP INDEX IF EXISTS idx_reviews_display_order;
DROP INDEX IF EXISTS idx_reviews_approved;

-- Drop unused indexes on contacts table
DROP INDEX IF EXISTS idx_contacts_created_at;
DROP INDEX IF EXISTS idx_contacts_status;
DROP INDEX IF EXISTS idx_contacts_event_date;

-- Drop unused indexes on gallery_images table
DROP INDEX IF EXISTS idx_gallery_display_order;
DROP INDEX IF EXISTS idx_gallery_visible;
DROP INDEX IF EXISTS idx_gallery_category;

-- Recreate the update_updated_at_column function with secure search_path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Recreate triggers that use this function
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_images_updated_at ON public.gallery_images;
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
