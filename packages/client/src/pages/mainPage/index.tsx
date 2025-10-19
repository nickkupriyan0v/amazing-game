'use client'

import { useState } from 'react'
import { Link } from 'react-router'
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Grid,
} from '@chakra-ui/react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <Box bg="#f8f9fa" minH="100vh">
      {/* Navigation */}
      <Box
        bg="white"
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
        position="sticky"
        top="0"
        zIndex="100">
        <Container maxW="1200px" py={4}>
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="#6b5dff">
              Игра Память
            </Heading>
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              <Link to="/">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Главная
                </Text>
              </Link>
              <Link to="/game">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Игра
                </Text>
              </Link>
              <Link to="/leaderboard">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Лидерборд
                </Text>
              </Link>
              <Link to="/forum">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Форум
                </Text>
              </Link>
              <Link to="/topic">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Топик
                </Text>
              </Link>
              <Link to="/profile">
                <Text _hover={{ color: '#6b5dff' }} cursor="pointer">
                  Профиль
                </Text>
              </Link>
              <Link to="/login">
                <Button variant="ghost" color="#6b5dff">
                  Логин
                </Button>
              </Link>
              <Link to="/register">
                <Button bg="#6b5dff" color="white" _hover={{ bg: '#5a4dd9' }}>
                  Регистрация
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Intro Section */}

      {/* Hero Section */}
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

            {/* Card Showcase */}
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

            <Link to="/game">
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

      {/* Features Section */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="#333">
            Почему играть в Игру Память?
          </Heading>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={8}>
            {[
              {
                title: 'Улучшить память',
                description: 'Развивайте когнитивные способности и запоминание',
                emoji: '🧠',
              },
              {
                title: 'Быстрые сеансы',
                description:
                  'Играйте в любое время и в любом месте за несколько минут',
                emoji: '⚡',
              },
              {
                title: 'Тренировка мозга',
                description:
                  'Улучшайте концентрацию и внимание с помощью забавных вызовов',
                emoji: '🎯',
              },
              {
                title: 'Отслеживать прогресс',
                description:
                  'Следите за своими улучшениями и побивайте свои рекорды',
                emoji: '📊',
              },
            ].map((feature, index) => (
              <Box
                key={index}
                p={8}
                bg="#f8f9fa"
                borderRadius="12px"
                textAlign="center"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
                transition="all 0.3s ease">
                <Text fontSize="40px" mb={4}>
                  {feature.emoji}
                </Text>
                <Heading as="h3" size="md" mb={3} color="#333">
                  {feature.title}
                </Heading>
                <Text color="#666" fontSize="sm">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={{ base: 16, md: 24 }} bg="#f8f9fa">
        <Container maxW="1200px">
          <Heading as="h2" size="xl" textAlign="center" mb={12} color="#333">
            Как это работает
          </Heading>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={8}>
            {[
              {
                step: '1',
                title: 'Переворачивайте карточки',
                description:
                  'Нажимайте на карточки, чтобы открыть скрытые символы',
              },
              {
                step: '2',
                title: 'Найдите пары',
                description:
                  'Сопоставьте две одинаковые карточки, чтобы заработать очки',
              },
              {
                step: '3',
                title: 'Завершите уровень',
                description: 'Сопоставьте все пары, чтобы закончить игру',
              },
              {
                step: '4',
                title: 'Побейте свой рекорд',
                description: 'Испытайте себя, чтобы завершить игру быстрее',
              },
            ].map((item, index) => (
              <Box
                key={index}
                p={8}
                bg="white"
                borderRadius="12px"
                textAlign="center"
                boxShadow="0 2px 8px rgba(0,0,0,0.05)">
                <Box
                  w="50px"
                  h="50px"
                  bg="#6b5dff"
                  color="white"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="24px"
                  fontWeight="bold"
                  mx="auto"
                  mb={4}>
                  {item.step}
                </Box>
                <Heading as="h3" size="md" mb={3} color="#333">
                  {item.title}
                </Heading>
                <Text color="#666" fontSize="sm">
                  {item.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            {[
              { number: '10K+', label: 'Игроков' },
              { number: '50K+', label: 'Игр сыграно' },
              { number: '4.8★', label: 'Рейтинг' },
            ].map((stat, index) => (
              <Box key={index} textAlign="center" py={8}>
                <Heading as="h3" size="2xl" color="#6b5dff" mb={2}>
                  {stat.number}
                </Heading>
                <Text color="#666" fontSize="lg">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        bg="linear-gradient(135deg, #4ecdc4 0%, #6b5dff 100%)"
        py={{ base: 16, md: 24 }}
        color="white">
        <Container maxW="1200px">
          <VStack gap={8} align="center" textAlign="center">
            <Heading as="h2" size="xl">
              Готовы испытать свою память?
            </Heading>
            <Text fontSize="lg" maxW="600px">
              Начните играть прямо сейчас и посмотрите, сколько пар вы сможете
              сопоставить!
            </Text>
            <Link to="/game">
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
                Играть сейчас
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="#333" color="white" py={8} textAlign="center">
        <Text>&copy; 2025 Игра Память. Все права защищены.</Text>
      </Box>
    </Box>
  )
}
