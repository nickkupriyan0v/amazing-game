import React, { useEffect, useState } from 'react'
import './getStartPage.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import {
  Box,
  Button,
  Card,
  Flex,
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
    <Card.Root
      mx="auto"
      mt={200}
      p={6}
      height="475px"
      width="500px"
      className="startGame"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Card.Title mb={50} mt={100}>
        Игра на память
      </Card.Title>
      {timer === null ? (
        <Card.Body className="start-content" mb={50}>
          <Card.Description>
            <Text textStyle="lg" mb={10} fontWeight="bold">
              Найди все пары одинаковых карточек как можно быстрее!{' '}
            </Text>
            <strong>Важно:</strong>{' '}
            <Text fontSize="m" as="u">
              чтобы каждая карта ассоциировалась с ярким и необычным образом, а
              образы сочетались с техникой «Локи» — ментальной картой мест. Это
              помогает быстро запомнить нужные карты и их комбинации.
            </Text>
          </Card.Description>
          <br />
          <Card.Footer justifyContent="center">
            <Button
              mt={100}
              color="white"
              bg={'green'}
              onClick={() => setTimer(3)}>
              Начать игру
            </Button>
          </Card.Footer>
        </Card.Body>
      ) : (
        <Card.Body className="start-content" mb={50}>
          <Card.Description fontSize="m" as="u" mb={50}>
            Игра начнется через {timer}...
          </Card.Description>
          <Card.Footer justifyContent="center">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </Card.Footer>
        </Card.Body>
      )}
    </Card.Root>
  )
}
