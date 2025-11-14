import axios, { AxiosError } from 'axios'
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
export interface CheckAuthResponse {
  success: boolean
  user?: {
    id: string
    login: string
    password: string
  }
  error?: string
}

export class LoginPageRequestClass {
  public signIn(data: SignInData): Promise<SignInResponse> {
    return axios
      .post(urlAPI + '/auth/signin', data, { withCredentials: true })
      .then(response => {
        return {
          success: response.status == 200,
          user: response.data.user,
        }
      })
      .catch(error => {
        const axiosError = error as AxiosError<{ reason?: string }>
        return {
          success: false,
          error: axiosError.response?.data?.reason || axiosError.message,
          errorType: axiosError.response?.status,
        }
      })
  }
  public async checkAuth(): Promise<CheckAuthResponse> {
    try {
      const response = await axios.get(urlAPI + '/auth/user', {
        withCredentials: true,
      })
      return {
        success: response.status === 200,
        user: response.data.user,
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ reason?: string }>
      return {
        success: false,
        error: axiosError.response?.data?.reason || axiosError.message,
      }
    }
  }

  async getYandexServiceId(redirectUri: string) {
    const url = `/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`

    const response = await axios.get(urlAPI + url, {
      withCredentials: true,
    })

    console.log('Yandex ServiceId response:', response.data)

    return response.data
  }

  async oauthSignIn(code: string, redirectUri: string) {
    const url = `/oauth/yandex`

    const response = await axios.post(
      urlAPI + url,
      { code, redirect_uri: redirectUri },
      { withCredentials: true }
    )

    return response.data
  }
}

export const LoginPageRequest = new LoginPageRequestClass()
