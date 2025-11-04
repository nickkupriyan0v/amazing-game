import React from 'react'
import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router'
import { Box, Flex } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const styleBox = {
  marginTop: '40px',
  width: '150px',
}
const Header = () => {
  const user = useAppSelector(state => state.userInfo)
  const isLoggedIn = !!user?.id
  return (
    <Flex justify="center" h="100px" bg={'#e3eddeff'}>
      {isLoggedIn ? (
        <Box style={styleBox}>
          <Link to={ROUTES.profilePage}>Профиль</Link>
        </Box>
      ) : (
        <>
          <Box style={styleBox}>
            <Link to={ROUTES.loginPage}>Авторизация</Link>
          </Box>
          <Box style={styleBox}>
            <Link to={ROUTES.registrationPage}>Регистрация</Link>
          </Box>
        </>
      )}
      <Box style={styleBox}>
        <Link to={ROUTES.mainPage}>Главная</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.getStartGame}>Игра</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.leaderBoardPage}>Лидерборд</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.forumPage}>Форум</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.topicPage}>Топик</Link>
      </Box>
      <Box style={styleBox}>
        <Link to="404">404</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.internalServerError}>500</Link>
      </Box>
    </Flex>
  )
}

export default Header
