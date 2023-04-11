// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.DB_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.DB_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const createBrowserSupabaseClient = () => {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
