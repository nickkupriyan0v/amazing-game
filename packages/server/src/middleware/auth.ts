import { Request, Response, NextFunction } from 'express'
import axios, { AxiosError } from 'axios'

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Получаем куки из запроса
    // const cookies = req.headers.cookie
    // console.log('cookie', cookies)

    // if (!cookies) {
    //   return res.status(401).json({
    //     error: 'Не авторизован: отсутствуют куки'
    //   })
    // }

    // Извлекаем токен или сессионную куку
    // Предполагаем, что кука называется 'session' или 'token'
    // const sessionCookie = cookies
    //   .split(';')
    //   .find(c => c.trim().startsWith('session=') || c.trim().startsWith('token='))

    // if (!sessionCookie) {
    //   return res.status(401).json({
    //     error: 'Не авторизован: отсутствует сессионная кука'
    //   })
    // }
    // return
    const apiAdress = 'https://ya-praktikum.tech/api/v2'
    console.log('cookie', req.cookies)
    console.log(req.path)
    console.log(req.body)
    if (!req.cookies.user && req.path === `/auth/signin`) {
      if (Object.keys(req.body).length <= 0) {
        return
      }

      console.log(req.body)
      const response = await axios.post(apiAdress + '/auth/signin', req.body, {
        withCredentials: true,
      })
      // res.cookie('user', req.body)
      // response.data.cookie = response.headers['set-cookie']
      // console.log('header cookie', response.headers['set-cookie'])
      // res.header('set-cookie', response.headers['set-cookie'])
      // console.log(res.json(response.data))
      return res.json(response.data)
    }

    console.log('cookie', req.cookies)
    const baseUrl = 'https://ya-praktikum.tech/api/v2'
    // Отправляем запрос к API аутентификации с куками
    const response = await axios.get(`${baseUrl}/auth/user`, req.cookies.user)

    if (response.status !== 200) {
      return res.status(401).json({
        error: 'Не авторизован: невалидная сессия',
      })
    }

    // Сохраняем пользователя в объекте запроса
    req.user = response.data
    console.log('success')
    next()
  } catch (error) {
    // console.error('Auth middleware error:', error)

    // if (axios.isAxiosError(error)) {
    //   if (error.code === 'ECONNREFUSED') {
    //     return res.status(503).json({
    //       error: 'Сервис аутентификации недоступен'
    //     })
    //   }

    //   if (error.response) {
    //     return res.status(error.response.status).json({
    //       error: 'Ошибка аутентификации'
    //     })
    //   }
    // }

    // return res.status(500).json({
    //   error: 'Внутренняя ошибка сервера'
    // })
    console.log(error)
  }
}
