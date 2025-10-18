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

export class LoginPageRequest {
  private static instance: LoginPageRequest | null = null
  public static getInstance(): LoginPageRequest {
    if (!LoginPageRequest.instance) {
      LoginPageRequest.instance = new LoginPageRequest()
    }
    return LoginPageRequest.instance
  }

  public signIn(data: SignInData): Promise<SignInResponse> {
    return axios
      .post(urlAPI + '/auth/signin', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
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
