import axios from 'axios'
import { urlAPI } from '../../constants/api'

export interface PasswordData {
  oldPassword: string
  newPassword: string
}

export interface PasswordResponse {
  success: boolean
  error?: string
  errorType?: number
}

export class PasswordRequestClass {
  public putPassword(data: PasswordData): Promise<PasswordResponse> {
    return axios
      .put(urlAPI + '/user/password', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        return { success: true }
      })
      .catch(error => {
        return {
          success: false,
          error: error.response.data?.reason,
          errorType: error.status,
        }
      })
  }
}

export const PasswordModalRequst = new PasswordRequestClass()
