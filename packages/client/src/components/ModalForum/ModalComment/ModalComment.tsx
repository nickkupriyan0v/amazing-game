import { useForm } from 'react-hook-form'
import { useCreateCommentMutation } from '../../../api/forumApi/forumApi'
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

type FormFields = {
  login: string
  text: string
}
const ModalComment = ({ id }) => {
  const loginUser = useAppSelector(state => state.updateUser.login)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>()

  const [createComment, { isLoading }] = useCreateCommentMutation()

  const onSubmit = async (data: FormFields) => {
    try {
      await createComment({ ...data, login: loginUser, id }).unwrap()
      console.log('Комментарий создан!')
      reset()
    } catch (e) {
      console.error('Ошибка создания комментария', e)
    }
  }
  return (
    <Container justifyContent={'center'} w={'30%'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Field.Root invalid={!!errors.text}>
            {/* @ts-ignore */}
            <Field.Label>Ваш отзыв:</Field.Label>
            <Textarea
              {...register('text', { required: 'Введите текст темы' })}
            />
            {/* @ts-ignore */}
            <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" loading={isLoading} bg={'green'}>
            Подтвердить
          </Button>

          <Button type="button" onClick={() => reset()} bg={'red'}>
            Отмена
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
export default ModalComment
