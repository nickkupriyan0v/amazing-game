import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import {
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Text,
  VStack,
  Flex,
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
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, teal.50, teal.100)"
      px={4}>
      <Box
        bg="white"
        boxShadow="2xl"
        borderRadius="2xl"
        p={10}
        w="500px"
        textAlign="center"
        transition="transform 0.3s ease"
        _hover={{ transform: 'scale(1.02)' }}>
        <Heading
          size="xl"
          mb={6}
          color="teal.600"
          letterSpacing="wide"
          fontWeight="extrabold">
          Игра на память
        </Heading>

        {timer === null ? (
          <VStack>
            <Text fontSize="lg" color="gray.700" fontWeight="medium">
              Найди все пары одинаковых карточек как можно быстрее!
            </Text>
            <Box
              fontSize="md"
              color="gray.600"
              bg="gray.50"
              p={4}
              borderRadius="md"
              textAlign="left">
              <Text mb={2}>
                <strong>Важно:</strong> чтобы каждая карта ассоциировалась с
                ярким образом, попробуй связать её с техникой <b>«Локи»</b> —
                ментальной картой мест. Это поможет запоминать пары быстрее.
              </Text>
            </Box>

            <Button
              mt={8}
              size="lg"
              color="white"
              bg="teal.500"
              _hover={{ bg: 'teal.600' }}
              onClick={() => setTimer(3)}
              w="200px">
              Начать игру
            </Button>
          </VStack>
        ) : (
          <VStack>
            <Text fontSize="xl" fontWeight="semibold" color="teal.600">
              Игра начнётся через {timer}...
            </Text>
            <Flex align="center" justify="center" gap={3}>
              <Spinner size="lg" color="teal.500" />
              <Text color="gray.600" fontWeight="medium">
                Подготовка...
              </Text>
            </Flex>
          </VStack>
        )}
      </Box>
    </Flex>
  )
}
