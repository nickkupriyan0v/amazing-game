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

  const handleAuthFailure = useCallback(() => {
    setUser(null)
    navigate(ROUTES.loginPage)
  }, [navigate])

  const checkAuth = useCallback(
    async (isMounted = true) => {
      try {
        const response = await LoginPageRequest.checkAuth()

        if (!isMounted) return

        if (response?.success && response.user) {
          setUser(response.user)
        } else {
          handleAuthFailure()
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Ошибка проверки авторизации:', error)
        }
        if (isMounted) handleAuthFailure()
      } finally {
        if (isMounted) setLoading(false)
      }
    },
    [handleAuthFailure]
  )

  useEffect(() => {
    let isMounted = true
    checkAuth(isMounted)
    return () => {
      isMounted = false
    }
  }, [checkAuth])

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/logout')
    } catch {
      //
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
