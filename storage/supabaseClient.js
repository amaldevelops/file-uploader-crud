// supabaseClient.js
// const { createClient } = require('@supabase/supabase-js');
import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase URL and API key
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
