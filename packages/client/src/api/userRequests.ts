import axios from 'axios'
import { urlAPI } from '../constants/api'

interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface SuccessResponse {
  success: true
  data: UserInfo
}

export interface ErrorResponse {
  success: false
  error: string
  errorType?: number
}

export type Response = SuccessResponse | ErrorResponse

export class UserRequestsClass {
  public getUserInfo(): Promise<Response> {
    return axios
      .get(urlAPI + '/auth/user', { withCredentials: true })
      .then(response => {
        const result: SuccessResponse = { success: true, data: response.data }
        return result
      })
      .catch(error => {
        const result: ErrorResponse = {
          success: false,
          error: error.response.data?.reason,
          errorType: error.status,
        }
        return result
      })
  }
}

export const userRequests = new UserRequestsClass()
