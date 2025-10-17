import { Button, Container } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

const GameOver = ({ reset }) => {
  const navigate = useNavigate()

  return (
    <Container
      maxW="container.md"
      display="flex"
      gap="10px"
      alignItems="center"
      justifyContent="center">
      <Button variant="outline" size="xl" onClick={reset}>
        Повторить
      </Button>
      <Button variant="ghost" size="xl" onClick={() => navigate('/')}>
        Вернуться в главное меню
      </Button>
    </Container>
  )
}

export default GameOver
