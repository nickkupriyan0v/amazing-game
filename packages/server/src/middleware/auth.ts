import { Request, Response, NextFunction } from 'express'
import axios, { AxiosError } from 'axios'

export interface IUser {
  id: number
  login: string
  display_name: string | null
  avatar: string | null
  email: string
  first_name: string
  second_name: string
  phone: string
}

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return next()
    }

    const cookies = req.headers.cookie

    if (!cookies) {
      return res.status(401).json({
        error: 'Не авторизован: отсутствуют куки',
      })
    }

    const apiAdress = 'https://ya-praktikum.tech/api/v2'

    const response = await axios.get(`${apiAdress}/auth/user`, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    req.user = response.data

    next()
  } catch (error) {
    const err = error as AxiosError<{ reason?: string }>
    const status = err.response?.status || 500

    if (status === 401) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    res.status(401).json({
      message: 'Authentication failed',
      details: err.message,
    })
  }
}
