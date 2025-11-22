import { createClient } from '@supabase/supabase-js';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type: string;
  event_date: string;
  guest_count?: string;
  country?: string;
  budget?: string;
  venue?: string;
  message?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

function getDbClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Database credentials not found.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function insertContact(contactData: {
  name: string;
  email: string;
  phone?: string;
  event_type: string;
  event_date: string;
  guest_count?: string;
  country?: string;
  budget?: string;
  venue?: string;
  message?: string;
}): Promise<ContactRecord[]> {
  const dbClient = getDbClient();

  const { data, error } = await dbClient
    .from('contacts')
    .insert({
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || null,
      event_type: contactData.event_type,
      event_date: contactData.event_date,
      guest_count: contactData.guest_count || null,
      country: contactData.country || null,
      budget: contactData.budget || null,
      venue: contactData.venue || null,
      message: contactData.message || null,
    })
    .select();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  return data as ContactRecord[];
}