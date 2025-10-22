import React, { useEffect, useState } from 'react'
import './getStartPage.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import {
  Box,
  Button,
  Container,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react'

interface GetStartPageProps {
  getStart?: () => void
}

export default function GetStartPage({ getStart }: GetStartPageProps) {
  const [timer, setTimer] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (timer === null || timer === 0) return

    const countdown = setTimeout(() => setTimer(timer - 1), 1000)

    if (timer === 1) {
      if (getStart) getStart()
      navigate(ROUTES.gamePage)
    }

    return () => clearTimeout(countdown)
  }, [timer])

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      {timer === null ? (
        <Box className="start-content">
          <Heading
            color="
purple">
            Игра на память
          </Heading>
          <Text fontSize="m">
            Найди все пары одинаковых карточек как можно быстрее!
          </Text>
          <Button color="white" bg={'green'} onClick={() => setTimer(3)}>
            Начать игру
          </Button>
        </Box>
      ) : (
        <Box className="count-down">
          <Heading className="game-countdown">
            Игра начнется через {timer}...
          </Heading>
          <Spinner color="red.500" />
        </Box>
      )}
    </Container>
  )
}
