import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import {
  CheckAuthResponse,
  LoginPageRequest,
} from '../../pages/loginPage/request'
import axios from 'axios'
import { urlAPI } from '../../constants/api'

export interface User {
  id: string
  login: string
  email?: string
  role?: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuth = useCallback(async () => {
    try {
      const result: CheckAuthResponse = await LoginPageRequest.checkAuth()
      if (result.success && result.user) {
        setUser(result.user)
      } else {
        setUser(null)
        navigate(ROUTES.loginPage)
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      setUser(null)
      navigate(ROUTES.loginPage)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const logout = useCallback(async () => {
    try {
      await axios.post(urlAPI + '/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Ошибка:' + error)
    } finally {
      setUser(null)
      navigate(ROUTES.loginPage)
    }
  }, [navigate])

  return { user, loading, isAuthenticated: !!user, logout, checkAuth }
}
