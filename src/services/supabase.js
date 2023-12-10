import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qeonbuukmudyccasecjs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlb25idXVrbXVkeWNjYXNlY2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxNzg3MjcsImV4cCI6MjAxNzc1NDcyN30.yuWhnx-3pEKJeZJDHFpD-XvQZUive_1EvsPk4okY5XI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
