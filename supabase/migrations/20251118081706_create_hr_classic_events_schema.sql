/*
  # HR Classic Events Database Schema

  ## Overview
  This migration creates the complete database schema for HR Classic Events website,
  enabling dynamic content management and contact form submissions.

  ## New Tables

  ### 1. contacts
  Stores all contact form submissions from potential clients
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text, required) - Client's full name
  - `email` (text, required) - Client's email address
  - `phone` (text, optional) - Client's phone number
  - `event_type` (text, required) - Type of event (Wedding, Corporate, Private, etc.)
  - `event_date` (date, required) - Requested event date
  - `guest_count` (text, optional) - Estimated number of guests
  - `budget` (text, optional) - Budget range for the event
  - `venue` (text, optional) - Venue preference or location
  - `message` (text, optional) - Additional details or special requests
  - `status` (text, default 'new') - Submission status (new, contacted, converted, archived)
  - `created_at` (timestamptz) - Timestamp of submission
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. gallery_images
  Manages all gallery images displayed on the website
  - `id` (uuid, primary key) - Unique identifier for each image
  - `image_url` (text, required) - Full URL to the image
  - `alt_text` (text, required) - Accessibility description
  - `display_order` (integer, default 0) - Order for displaying images
  - `is_visible` (boolean, default true) - Controls image visibility
  - `category` (text, optional) - Image category (wedding, corporate, private, etc.)
  - `created_at` (timestamptz) - Upload timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. reviews
  Stores client testimonials and reviews
  - `id` (uuid, primary key) - Unique identifier for each review
  - `name` (text, required) - Client's name
  - `event_type` (text, required) - Type of event reviewed
  - `quote` (text, required) - The testimonial text
  - `rating` (integer, required) - Star rating (1-5)
  - `event_date` (text, required) - When the event took place
  - `is_approved` (boolean, default false) - Moderation status
  - `is_featured` (boolean, default false) - Whether to feature prominently
  - `display_order` (integer, default 0) - Order for displaying reviews
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Row Level Security (RLS) is enabled on all tables
  - Public read access for approved gallery images and reviews
  - Contact submissions are private (no public read access)
  - Insert policies allow public submissions for contacts table
  - Admin operations require authentication (future admin panel integration)

  ## Indexes
  - Indexes on frequently queried fields for optimal performance
  - Composite indexes for common query patterns
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_type text NOT NULL,
  event_date date NOT NULL,
  guest_count text,
  budget text,
  venue text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event_type text NOT NULL,
  quote text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  event_date text NOT NULL,
  is_approved boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_event_date ON contacts(event_date);

CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_visible ON gallery_images(is_visible) WHERE is_visible = true;
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);

CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_reviews_display_order ON reviews(display_order);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contacts table
-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view contacts (for future admin panel)
CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update contact status
CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for gallery_images table
-- Anyone can view visible gallery images
CREATE POLICY "Anyone can view visible gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Authenticated users can manage gallery images
CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for reviews table
-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- Anyone can submit reviews (will be moderated)
CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can manage reviews
CREATE POLICY "Authenticated users can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at management
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_images_updated_at ON gallery_images;
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
