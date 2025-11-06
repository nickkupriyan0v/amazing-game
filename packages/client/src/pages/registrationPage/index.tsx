import { Button, Container, Field, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { validations } from './validation'
import axios, { AxiosError } from 'axios'
import { urlAPI } from '../../constants/api'

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
  const navigate = useNavigate()
  const signUpPost = async (data: FormValues) => {
    return axios
      .post(urlAPI + '/auth/signup', data, { withCredentials: true })
      .then(response => {
        navigate(ROUTES.profilePage)
        return {
          success: response.status === 200,
          user: response.data,
        }
      })
      .catch(error => {
        const axiosError = error as AxiosError<{ reason?: string }>
        return {
          success: false,
          error: axiosError.response?.data?.reason || axiosError.message,
          errorType: axiosError.response?.status,
        }
      })
  }

  const onSubmit = handleSubmit(async (values: FormValues) => {
    await signUpPost(values)
    navigate(ROUTES.profilePage)
  })
  return (
    <Container
      maxW="container.md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="10%">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.first_name}>
            {/* @ts-ignore */}
            <Field.Label>Имя</Field.Label>
            <Input
              {...register('first_name', {
                required: `Введите ${validations.first_name.name}`,
                pattern: {
                  value: validations.first_name.regex,
                  message: validations.first_name.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.second_name}>
            {/* @ts-ignore */}
            <Field.Label>Фамилия</Field.Label>
            <Input
              {...register('second_name', {
                required: `Введите ${validations.second_name.name}`,
                pattern: {
                  value: validations.second_name.regex,
                  message: validations.second_name.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.second_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.login}>
            {/* @ts-ignore */}
            <Field.Label>Логин</Field.Label>
            <Input
              {...register('login', {
                required: `Введите ${validations.login.name}`,
                pattern: {
                  value: validations.login.regex,
                  message: validations.login.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            {/* @ts-ignore */}
            <Field.Label>Почта</Field.Label>
            <Input
              {...register('email', {
                required: `Введите ${validations.email.name}`,
                pattern: {
                  value: validations.email.regex,
                  message: validations.email.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            {/* @ts-ignore */}
            <Field.Label>Пароль</Field.Label>
            <Input
              {...register('password', {
                required: `Введите ${validations.password.name}`,
                pattern: {
                  value: validations.password.regex,
                  message: validations.password.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.phone}>
            {/* @ts-ignore */}
            <Field.Label>Телефон</Field.Label>
            <Input
              {...register('phone', {
                required: `Введите ${validations.phone.name}`,
                pattern: {
                  value: validations.phone.regex,
                  message: validations.phone.errorMessage,
                },
              })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" loading={isSubmitting} bg={'blue.600'} w={200}>
            Зарегистрироваться
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default RegistrationPage
