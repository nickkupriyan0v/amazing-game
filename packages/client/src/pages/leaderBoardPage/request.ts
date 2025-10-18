import axios from 'axios'
import { urlAPI } from '../../constants/api'

const api = axios.create({
  baseURL: urlAPI,
  withCredentials: true,
})

export interface Leader {
  data: {
    id?: number
    userId?: number
    name?: string
    userName?: string
    username?: string
    score: number
  }
}

async function getLeaderboard() {
  try {
    const response = await api.post(
      'https://ya-praktikum.tech/api/v2/leaderboard/all',
      {
        ratingFieldName: 'score',
        cursor: 0,
        limit: 10,
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default getLeaderboard
