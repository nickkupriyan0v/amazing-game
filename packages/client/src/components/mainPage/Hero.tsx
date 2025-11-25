import { useState } from 'react'
import { Link } from 'react-router'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react'
import { ROUTES } from '../../constants/routes'

export const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <Box
      bg="linear-gradient(135deg, #6b5dff 0%, #4ecdc4 100%)"
      py={{ base: 16, md: 24 }}
      color="white">
      <Container maxW="1200px">
        <VStack gap={8} align="center" textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="bold">
            Игра Память
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="600px">
            Проверьте свою память и обострите ум, сопоставляя пары карточек.{' '}
            <Text as="span" fontWeight="bold">
              Сколько пар вы сможете найти?
            </Text>
          </Text>

          <HStack gap={6} justify="center" py={8}>
            {[
              { emoji: '🎮', color: '#a78bfa' },
              { emoji: '🧠', color: '#4ecdc4' },
              { emoji: '⚡', color: '#ffc857' },
            ].map((item, index) => (
              <Box
                key={index}
                w="100px"
                h="100px"
                bg={item.color}
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="48px"
                cursor="pointer"
                transform={hoveredCard === index ? 'scale(1.1)' : 'scale(1)'}
                transition="all 0.3s ease"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                boxShadow={
                  hoveredCard === index
                    ? '0 8px 24px rgba(0,0,0,0.2)'
                    : '0 4px 12px rgba(0,0,0,0.1)'
                }>
                {item.emoji}
              </Box>
            ))}
          </HStack>

          <Link to={ROUTES.gamePage}>
            <Button
              size="lg"
              bg="white"
              color="#6b5dff"
              fontWeight="bold"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
              transition="all 0.3s ease">
              Начать игру
            </Button>
          </Link>

          <Text fontSize="sm" opacity={0.9}>
            Без регистрации • Играйте сразу • Испытайте себя
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
export default Hero
