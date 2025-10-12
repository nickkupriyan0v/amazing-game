import { Button, Container, Field, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'

interface FormValues {
  login: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data: FormValues) => console.log(data))
  const navigate = useNavigate()

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

          <Button onClick={() => navigate(ROUTES.mainPage)} type="submit">
            Войти
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default LoginPage
