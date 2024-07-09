import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SUPABASE_PROJECT_URL!
const supabaseKey = process.env.NEXT_SUPABASE_API_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
