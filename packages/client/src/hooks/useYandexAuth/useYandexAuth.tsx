import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LoginPageRequest } from '../../pages/loginPage/request'
import { ROUTES } from '../../constants/routes'

export const useYandexAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) {
      return
    }

    const redirectUri = window.location.origin

    LoginPageRequest.oauthSignIn(code, redirectUri)
      .then(() => {
        navigate(ROUTES.profilePage)
      })
      .finally(() => {
        const url = new URL(window.location.href)
        url.searchParams.delete('code')
        window.history.replaceState({}, '', url.toString())
      })
  }, [])
}
