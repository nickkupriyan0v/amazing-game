import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nokfdnoihxsuqimeqzqr.supabase.co'
const supabaseKey = 'sb_publishable_xCiaan8BhNsg8JLO3TzXZQ_20hyW3ia'
export const supabase = createClient(supabaseUrl, supabaseKey)
