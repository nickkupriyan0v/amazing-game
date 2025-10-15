import { Button, Container, Field, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'

interface FormValues {
  login: string
  password: string
  first_name: string
  second_name: string
  email: string
  phone: string
}

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data: FormValues) => {
    navigate(ROUTES.mainPage)
  })
  const navigate = useNavigate()
  return (
    <Container
      maxW="container.md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="-10%">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.first_name}>
            {/* @ts-ignore */}
            <Field.Label>Имя</Field.Label>
            <Input {...register('first_name')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.second_name}>
            {/* @ts-ignore */}
            <Field.Label>Фамилия</Field.Label>
            <Input {...register('second_name')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.second_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.login}>
            {/* @ts-ignore */}
            <Field.Label>Логин</Field.Label>
            <Input {...register('login')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            {/* @ts-ignore */}
            <Field.Label>Почта</Field.Label>
            <Input {...register('email')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            {/* @ts-ignore */}
            <Field.Label>Пароль</Field.Label>
            <Input {...register('password')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.phone}>
            {/* @ts-ignore */}
            <Field.Label>Телефон</Field.Label>
            <Input {...register('phone')} />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" loading={isSubmitting}>
            Зарегистрироваться
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default RegistrationPage
