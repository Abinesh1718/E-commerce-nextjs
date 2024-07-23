// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyqkxbpvhylidnwfrrda.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cWt4YnB2aHlsaWRud2ZycmRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTQ1NDYxMSwiZXhwIjoyMDM3MDMwNjExfQ.9rGeEdD0dPTpsrwkTpEPZddQaFlIT_Lata7uDvYR32U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
