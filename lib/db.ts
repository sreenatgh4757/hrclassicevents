import { createClient } from '@supabase/supabase-js';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type: string;
  event_date: string;
  guest_count?: string;
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
  budget?: string;
  venue?: string;
  message?: string;
}): Promise<ContactRecord[]> {
  const dbClient = getDbClient();

  const { data, error } = await dbClient
    .from('contacts')
    .insert([
      {
        ...contactData,
        status: 'new',
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return (data || []) as ContactRecord[];
}
