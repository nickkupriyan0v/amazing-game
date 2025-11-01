'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { useGame } from '../../hooks/useGame'
import GameCanvas from '../../components/GameCanvas'
import './styles.css'

const SETTINGS = {
  cardWidth: 80,
  cardHeight: 80,
}

export default function GamePage() {
  const {
    cards,
    flipped,
    matched,
    disabled,
    count,
    handleCardClick,
    reset,
    isGameComplete,
    canvasSize,
  } = useGame()

  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    if (isGameComplete) {
      setShowModal(true)
    }
  }, [isGameComplete])

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #6b5dff 0%, #4ecdc4 100%)"
      py={{ base: 16, md: 24 }}
      color="white">
      <Container maxW="100%" px={4}>
        <VStack display={'flex'} gap={8} align="center">
          <Heading
            as="h1"
            size="4xl"
            color="white"
            textAlign="center"
            animation="fadeInScale 0.6s ease-out">
            Игра на память
          </Heading>

          <Box
            bg="white"
            p={8}
            borderRadius="20px"
            boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <GameCanvas
              cards={cards}
              flipped={flipped}
              matched={matched}
              onCardClick={handleCardClick}
              canvasSize={{ ...canvasSize, ...SETTINGS }}
            />
          </Box>

          <HStack gap={4}>
            <Button
              bg="#6b5dff"
              color="white"
              size="lg"
              onClick={reset}
              _hover={{
                bg: '#5a4dd6',
                transform: 'scale(1.05)',
                transition: 'all 0.2s',
              }}>
              Новая игра
            </Button>
            <Link to="/">
              <Button
                variant="outline"
                borderColor="#6b5dff"
                color="#6b5dff"
                size="lg"
                _hover={{
                  bg: '#f5f3ff',
                  transform: 'scale(1.05)',
                }}>
                На главную
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>

      {showModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(4px)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}>
          <Box
            bg="white"
            borderRadius="20px"
            boxShadow="0 20px 60px rgba(107, 93, 255, 0.3)"
            border="2px solid #6b5dff"
            p={10}
            maxW="500px"
            minW="500px"
            textAlign="center"
            animation="slideUp 0.4s ease-out">
            <VStack gap={6}>
              <Heading as="h2" size="xl" color="#6b5dff">
                🎉 Поздравляем! 🎉
              </Heading>
              <Text fontSize="md" color="#666">
                Вы успешно прошли игру!
              </Text>
              <Box
                bg="linear-gradient(135deg, #6b5dff 0%, #4ecdc4 100%)"
                color="white"
                py={6}
                px={8}
                borderRadius="16px"
                width="100%">
                <Text fontSize="4xl" fontWeight="bold">
                  {count}
                </Text>
                <Text fontSize="md" mt={2}>
                  ходов(а)
                </Text>
              </Box>
              <VStack gap={4} width="100%" pt={4}>
                <Button
                  bg="#6b5dff"
                  color="white"
                  width="100%"
                  size="lg"
                  onClick={() => {
                    reset()
                    setShowModal(false)
                  }}
                  _hover={{ bg: '#5a4dd6' }}>
                  Играть снова
                </Button>
                <Link to="/" style={{ width: '100%' }}>
                  <Button
                    variant="outline"
                    borderColor="#6b5dff"
                    color="#6b5dff"
                    width="100%"
                    size="lg"
                    _hover={{ bg: '#f5f3ff' }}>
                    На главную
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}
