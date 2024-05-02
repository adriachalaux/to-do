import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_SUPABASE_KEY
const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL

export const supabase = createClient(PROJECT_URL, API_KEY)
