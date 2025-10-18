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
}
