import { supabase } from './supabaseClient'
import { LeaderboardResponse } from './types'

export async function setResult(seconds: number): Promise<LeaderboardResponse> {
  try {
    const name = localStorage.getItem('currentUserName') || '-'
    const { data, error } = await supabase
      .from('Scores')
      .insert([{ name, seconds }])
      .select()

    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getLeaderboard(limit = 10): Promise<LeaderboardResponse> {
  try {
    const { data, error } = await supabase
      .from('Scores')
      .select('*')
      .order('seconds', { ascending: true })
      .limit(limit)

    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}
