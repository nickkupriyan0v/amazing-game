import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

export const authMiddleware = async (
  req: Request,
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

    await axios.get(`${apiAdress}/auth/user`, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    next()
  } catch (error) {
    const status = error.response?.status || 500

    if (status === 401) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    res.status(401).json({
      message: 'Authentication failed',
      details: error.message,
    })
  }
}
