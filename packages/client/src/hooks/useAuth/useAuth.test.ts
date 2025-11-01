import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { LoginPageRequest } from '../../pages/loginPage/request'
import axios from 'axios'

export interface User {
  id: string
  login: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuth = useCallback(async () => {
    try {
      const response = await LoginPageRequest.checkAuth()

      if (response?.success && response.user) {
        setUser(response.user)
      } else {
        setUser(null)
        navigate(ROUTES.loginPage)
      }
    } catch (error) {
      // ⚠️ Не выбрасываем наружу, чтобы тест не ругался
      if (process.env.NODE_ENV === 'development') {
        console.error('Ошибка проверки авторизации:', error)
      }
      setUser(null)
      navigate(ROUTES.loginPage)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    // Чтобы избежать гонки и act-warning
    let isMounted = true
    ;(async () => {
      try {
        const response = await LoginPageRequest.checkAuth()
        if (!isMounted) return

        if (response?.success && response.user) {
          setUser(response.user)
        } else {
          setUser(null)
          navigate(ROUTES.loginPage)
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Ошибка проверки авторизации:', error)
        }
        if (isMounted) {
          setUser(null)
          navigate(ROUTES.loginPage)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/logout')
    } finally {
      setUser(null)
      navigate(ROUTES.loginPage)
    }
  }, [navigate])

  return {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  }
}
