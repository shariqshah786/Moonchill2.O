import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aWdtbnhtZnJtdXRvbXh6Z2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNzEsImV4cCI6MjA2OTI2NDM3MX0.9DiPofhNTYfRAHfcYSrYZ0L1x2937_RGKFD-yxGs-rs

export const supabase = createClient(supabaseUrl, supabaseKey);
