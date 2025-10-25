import { Button, Container, Field, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { LoginPageRequest } from './request'
import { addUserInfo2Store } from '../../features/addUserInfo2Store'
import { useAppDispatch } from '../../store/hooks'

interface FormValues {
  login: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data: FormValues) => {
    const loginRequest = LoginPageRequest

    loginRequest.signIn(data).then(result => {
      if (result.success) {
        addUserInfo2Store(dispatch)
        navigate(ROUTES.mainPage)
      } else {
        setError('password', {
          type: 'server',
          message: result.error,
        })
      }
    })
  })

  return (
    <Container
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

          <Button type="submit" loading={isSubmitting} loadingText="Вход...">
            Войти
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default LoginPage
