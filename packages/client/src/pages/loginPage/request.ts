import axios from 'axios'
import { urlAPI } from '../../constants/api'

export interface SignInData {
  login: string
  password: string
}

export interface SignInResponse {
  success: boolean
  error?: string
  errorType?: number
}

export class LoginPageRequestClass {
  public signIn(data: SignInData): Promise<SignInResponse> {
    return axios
      .post(urlAPI + '/auth/signin', data, { withCredentials: true })
      .then(response => {
        return { success: response.status == 200 }
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

export const LoginPageRequest = new LoginPageRequestClass()
