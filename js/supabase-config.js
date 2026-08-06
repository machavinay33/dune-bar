// Supabase configuration
const SUPABASE_URL = 'https://bksorbrteqhnupmhfmcf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc29yYnJ0ZXFobnVwbWhmbWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTM1ODUsImV4cCI6MjEwMTU2OTU4NX0.dRdSHanSM5tZsewY8HNoYouGkewgvH39VlKXn-YJ6G8';

// Initialize the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts
window.supabase = supabaseClient;
