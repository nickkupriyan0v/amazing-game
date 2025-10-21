import { Button, Container, Input, Stack, Field } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { urlAPI } from '../../constants/api'

interface FormValues {
  avatar: FileList
}

const ModalAvatar = ({ isVisible, onClose, onAvatarUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>()

  const uploadAvatar = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch(`${urlAPI}/user/profile/avatar`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Ошибка при загрузке аватара')
      }

      const result = await response.json()

      if (onAvatarUpdate && result.avatar) {
        onAvatarUpdate(result.avatar)
      }

      onClose()
      reset()
    } catch (err) {
      console.error('Ошибка загрузки аватара:', err)
    }
  }

  const onSubmit = (data: FormValues) => {
    if (data.avatar && data.avatar.length > 0) {
      uploadAvatar(data.avatar[0])
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
            <Field.Root invalid={!!errors.avatar}>
              {/* @ts-ignore */}
              <Field.Label>Аватар</Field.Label>
              <Input
                type="file"
                accept="image/*"
                {...register('avatar', {
                  required: 'Выберите файл аватара',
                })}
              />
              {/* @ts-ignore */}
              <Field.ErrorText>
                {errors.avatar?.message as string}
              </Field.ErrorText>
            </Field.Root>
            <Button type="submit" loading={isSubmitting}>
              Изменить аватар
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

export default ModalAvatar
