import { createClient } from '@supabase/supabase-js';

// يمكنك العثور على هذه المتغيرات في لوحة تحكم Supabase الخاصة بك:
// Settings -> API -> Project URL & Project API Keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY إلى ملف .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
