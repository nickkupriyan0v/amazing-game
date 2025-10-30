import { Button, Container, Input, Stack, Field } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { PasswordModalRequst } from './request'

interface FormValues {
  oldPassword: string
  newPassword: string
}

const ModalPassword = ({ isVisible, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>()

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const passwordRequest = PasswordModalRequst

    passwordRequest
      .putPassword({ oldPassword: oldPassword, newPassword: newPassword })
      .then(result => {
        if (result.success) {
          onClose()
          reset()
        }
      })
  }

  const onSubmit = (data: FormValues) => {
    if (data.oldPassword && data.newPassword) {
      changePassword(data.oldPassword, data.newPassword)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Container
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width="md"
      background="white"
      padding="6"
      borderRadius="md"
      boxShadow="lg">
      <Container
        maxW="container.md"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack gap="4" align="flex-start" maxW="sm" width="100%">
            <Field.Root invalid={!!errors.oldPassword}>
              {/* @ts-ignore */}
              <Field.Label>Старый пароль</Field.Label>
              <Input type="password" {...register('oldPassword')} />
              {/* @ts-ignore */}
              <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.newPassword}>
              {/* @ts-ignore */}
              <Field.Label>Новый пароль</Field.Label>
              <Input type="password" {...register('newPassword')} />
              {/* @ts-ignore */}
              <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
            </Field.Root>
            <Button type="submit" loading={isSubmitting}>
              Изменить пароль
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </Stack>
        </form>
      </Container>
    </Container>
  )
}

export default ModalPassword
