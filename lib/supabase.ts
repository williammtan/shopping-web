import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = "https://owtwhdcxvshjrlydqpjl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dHdoZGN4dnNoanJseWRxcGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2OTUwNzQsImV4cCI6MjA1NTI3MTA3NH0.LZfF3YL-3C-JqGADLCtQDYY4KXIxsWCZP613-ec_Xac";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);