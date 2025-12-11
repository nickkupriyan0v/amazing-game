import { useForm } from 'react-hook-form'
import {
  useCreateCommentMutation,
  useCreateReplyMutation,
} from '../../../api/forumApi/forumApi'
import {
  Button,
  Container,
  Input,
  Stack,
  Field,
  Textarea,
  Card,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../store/hooks'
import { useState } from 'react'

const ModalReply = ({ id, closeModal }) => {
  const loginUser = useAppSelector(state => state.updateUser.login)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [createComment, { isLoading }] = useCreateReplyMutation()

  const onSubmit = async data => {
    try {
      await createComment({ ...data, login: loginUser, id }).unwrap()
      console.log('Комментарий создан!')
      reset()
      closeModal()
    } catch (e) {
      console.error('Ошибка создания ответа', e)
    }
  }
  return (
    <Container justifyContent={'center'} w={'30%'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Field.Root invalid={!!errors.text}>
            {/* @ts-ignore */}
            <Field.Label>Ваш отзыв: {id}</Field.Label>
            <Textarea
              {...register('text', { required: 'Введите текст темы' })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" loading={isLoading} bg={'green'}>
            Подтвердить
          </Button>

          <Button type="button" bg={'red'} onClick={closeModal}>
            Отмена
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
export default ModalReply
