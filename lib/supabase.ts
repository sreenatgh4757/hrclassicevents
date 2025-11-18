import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  event_type: string;
  event_date: string;
  guest_count?: string;
  budget?: string;
  venue?: string;
  message?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id?: string;
  image_url: string;
  alt_text: string;
  display_order?: number;
  is_visible?: boolean;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id?: string;
  name: string;
  event_type: string;
  quote: string;
  rating: number;
  event_date: string;
  is_approved?: boolean;
  is_featured?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}
