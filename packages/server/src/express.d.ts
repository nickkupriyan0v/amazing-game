import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        first_name: string
        second_name: string
        display_name: string
        phone: string
        login: string
        avatar: string
        email: string
      }
    }
  }
}
