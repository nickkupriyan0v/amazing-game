import { Button, Container } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { useRef } from 'react'
import { useKeyClick } from '../../constants/hotkey'

interface IGameOver {
  reset: () => void
}
const GameOver = ({ reset }: IGameOver) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useKeyClick(buttonRef, 'Enter')

  const navigate = useNavigate()

  return (
    <Container
      maxW="container.md"
      display="flex"
      gap="10px"
      alignItems="center"
      justifyContent="center">
      <Button
        variant="outline"
        ref={buttonRef}
        size="xl"
        onClick={reset}
        bg={'green'}>
        Повторить
      </Button>
      <Button
        variant="ghost"
        size="xl"
        onClick={() => navigate(ROUTES.mainPage)}>
        Вернуться в главное меню
      </Button>
    </Container>
  )
}

export default GameOver
