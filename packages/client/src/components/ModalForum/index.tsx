import {
  Button,
  Container,
  Input,
  Stack,
  Field,
  Textarea,
  Card,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useCreateTopicMutation } from '../../api/forumApi/forumApi'
import { useAppSelector } from '../../store/hooks'

type FormFields = {
  title: string
  text: string
}
const ModalForum = () => {
  const loginUser = useAppSelector(state => state.updateUser.login)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>()

  const [createTopic, { isLoading }] = useCreateTopicMutation()

  const onSubmit = async (data: FormFields) => {
    try {
      await createTopic({ ...data, login: loginUser }).unwrap()
      console.log('Тема создана!')
      reset()
    } catch (e) {
      console.error('Ошибка создания темы', e)
    }
  }
  return (
    <Container>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack>
            {/* Title */}
            <Field.Root invalid={!!errors.title}>
              {/* @ts-ignore */}
              <Field.Label>Название темы</Field.Label>
              <Input
                {...register('title', { required: 'Введите название темы' })}
              />
              {/* @ts-ignore */}
              <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
            </Field.Root>

            {/* Text */}
            <Field.Root invalid={!!errors.text}>
              {/* @ts-ignore */}
              <Field.Label>Описание</Field.Label>
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
    </Container>
  )
}

export default ModalForum
