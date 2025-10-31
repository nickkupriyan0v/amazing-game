import axios from 'axios'
import { urlAPI } from '../../constants/api'

export interface AvatarResponse {
  success: boolean
  avatar?: string
  error?: string
  errorType?: number
}

export class AvatarModalRequestClass {
  public putAvatar(file: File): Promise<AvatarResponse> {
    const data = new FormData()
    data.append('avatar', file)

    return axios
      .put(urlAPI + '/user/profile/avatar', data, { withCredentials: true })
      .then(response => {
        return { success: true, avatar: response.data.avatar }
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

export const AvatarModalRequest = new AvatarModalRequestClass()
