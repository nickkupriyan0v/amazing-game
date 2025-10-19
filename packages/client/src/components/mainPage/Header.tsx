'use client'

import { Link } from 'react-router'
import {
  Box,
  Container,
  HStack,
  Text,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react'

export default function Header() {
  return (
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
  )
}
