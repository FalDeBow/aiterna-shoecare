import { createClient } from '@supabase/supabase-js';

// Menggunakan URL & Key Asli Supabase Aiterna
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://bkwqdxkthdpocezqpdqu.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_j__EOrPfYMvosl8Loy1mbg_E7XLTMhC';

export const supabase = createClient(supabaseUrl, supabaseKey);