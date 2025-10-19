import { Button, Container, Input, Stack, Field } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface FormValues {
  avatar: File
}

const Modal = () => {
  console.log('modal')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  return (
    <Container
      position="absolute"
      top="50%"
      right="50%"
      transform="translate(-50%, -50%)"
      width="md"
      height="sm">
      {/* <form>
				<Input type="file"/>
				<Button type="submit">Отправить</Button>
			</form> */}

      <Container
        maxW="container.md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="-10%">
        <form onSubmit={onSubmit}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field.Root invalid={!!errors.avatar}>
              {/* @ts-ignore */}
              <Field.Label>Аватар</Field.Label>
              <Input {...register('avatar')} />
              {/* @ts-ignore */}
              <Field.ErrorText>{errors.avatar?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" loading={isSubmitting}>
              Изменить аватар
            </Button>
          </Stack>
        </form>
      </Container>
    </Container>
  )
}

export default Modal
