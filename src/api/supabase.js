const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3RtZG5pZGhvc2RjdmRvbm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNjc1MTksImV4cCI6MjAyNjg0MzUxOX0.7PO-38EsqR920Tq9aACATHW2r9A62ZXmSdtoFjbJRMU'

const PROJECT_URL = 'https://wvktmdnidhosdcvdonmz.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
