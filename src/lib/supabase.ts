import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Package {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  highlights?: string[];
  created_at: string;
  updated_at: string;
}
