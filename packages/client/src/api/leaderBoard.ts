import axios from 'axios'
import { urlAPI } from '../constants/api'

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

export async function getLeaderboard() {
  try {
    const response = await api.post('/leaderboard/cinnamoroll', {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function setResult(result: number) {
  try {
    const response = await api.post('/leaderboard', {
      data: {},
      ratingFieldName: result,
      teamName: 'cinnamoroll',
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
