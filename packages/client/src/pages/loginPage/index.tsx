import { Button, Container, Field, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { LoginPageRequest } from './request'

interface FormValues {
  login: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>()

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data: FormValues) => {
    const loginRequest = LoginPageRequest

    loginRequest.signIn(data).then(result => {
      if (result.success) {
        navigate(ROUTES.profilePage)
      } else {
        setError('password', {
          type: 'server',
          message: result.error,
        })
      }
    })
  })

  const handleYandexLogin = async () => {
    const redirectUri = window.location.origin

    try {
      const res = await LoginPageRequest.getYandexServiceId(redirectUri)
      const clientId =
        (res && (res.serviceId || res.service_id || res.clientId || res.id)) ||
        ''
      if (!clientId) {
        return
      }

      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${encodeURIComponent(redirectUri)}`

      window.location.href = authUrl
    } catch (err: { message: string }) {
      setError('login', {
        type: 'server',
        message: err?.message ?? 'Ошибка при запросе serviceId',
      })
    }
  }

  return (
    <Container
      minH="100vh"
      maxW="container.md"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.login}>
            {/* @ts-ignore */}
            <Field.Label>Логин</Field.Label>
            <Input {...register('login')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            {/* @ts-ignore */}
            <Field.Label>Пароль</Field.Label>
            <Input {...register('password')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Вход..."
            bg={'blue.600'}
            width={350}>
            Войти
          </Button>

          <Button
            onClick={handleYandexLogin}
            bg="white"
            color="black"
            width={350}>
            Войти через Яндекс
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default LoginPage
