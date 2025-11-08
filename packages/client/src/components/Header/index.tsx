import React from 'react'
import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router'
import { Button, Flex, HStack, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../store/hooks'
import { MdForum, MdLeaderboard, MdHome } from 'react-icons/md'
const Header = () => {
  const user = useAppSelector(state => state.userInfo)
  const isLoggedIn = !!user?.id

  const navLinks = [
    { to: ROUTES.mainPage, label: <MdHome /> },
    { to: ROUTES.leaderBoardPage, label: <MdLeaderboard /> },
    { to: ROUTES.forumPage, label: <MdForum /> },
  ]

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      h="80px"
      px="60px"
      bg="teal.50"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000">
      <HStack>
        <Link to={ROUTES.getStartGame}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="teal.600"
            _hover={{ color: 'teal.700', textDecoration: 'none' }}
            letterSpacing="wide">
            MemoryCard
          </Text>
        </Link>

        {navLinks.map(link => (
          <Text
            key={link.to}
            fontWeight="medium"
            color="green"
            _hover={{ color: 'green.300', textDecoration: 'underline' }}
            transition="color 0.2s ease"
            margin={4}>
            <Link to={link.to}>{link.label}</Link>
          </Text>
        ))}
      </HStack>

      <HStack>
        {isLoggedIn ? (
          <Text
            fontWeight="semibold"
            color="teal.700"
            _hover={{ color: 'teal.500' }}>
            <Link to={ROUTES.profilePage}>{user.login}</Link>
          </Text>
        ) : (
          <>
            <Button
              fontWeight="medium"
              bg="teal.500"
              color="white"
              variant="solid"
              _hover={{ bg: 'teal.600' }}>
              <Link to={ROUTES.loginPage}>Авторизация</Link>
            </Button>
            <Button
              fontWeight="medium"
              bg="orange.400"
              color="white"
              variant="solid"
              _hover={{ bg: 'orange.500' }}>
              <Link to={ROUTES.registrationPage}>Регистрация</Link>
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  )
}

export default Header
