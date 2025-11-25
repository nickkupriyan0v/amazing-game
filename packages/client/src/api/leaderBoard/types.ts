export interface Score {
  id: string
  name: string
  seconds: number
  created_at: string
}

export interface LeaderboardResponse {
  data: Score[] | null
  error: unknown
}
