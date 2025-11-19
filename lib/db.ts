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
  status: string;
  created_at: string;
  updated_at: string;
}

function getDbClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Database credentials not found. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in environment variables.');
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

  const { data: contactId, error } = await dbClient.rpc('insert_contact_submission', {
    p_name: contactData.name,
    p_email: contactData.email,
    p_phone: contactData.phone || null,
    p_event_type: contactData.event_type,
    p_event_date: contactData.event_date,
    p_guest_count: contactData.guest_count || null,
    p_country: contactData.country || null,
    p_budget: contactData.budget || null,
    p_venue: contactData.venue || null,
    p_message: contactData.message || null,
  });

  if (error) {
    throw error;
  }

  return [{ id: contactId as string } as ContactRecord];
}
