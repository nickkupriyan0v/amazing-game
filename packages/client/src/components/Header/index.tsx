import React from 'react'
import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router'
import { Box, Flex } from '@chakra-ui/react'

const styleBox = {
  marginTop: '40px',
  width: '150px',
}
const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.loginPage}>Логин</Link>;
        </li>
        <li>
          <Link to={ROUTES.registrationPage}>Регистрация</Link>;
        </li>
        <li>
          <Link to={ROUTES.profilePage}>Профиль</Link>;
        </li>
        <li>
          <Link to={ROUTES.mainPage}>Главная</Link>;
        </li>
        <li>
          <Link to={ROUTES.getStartGame}>Игра</Link>;
        </li>
        <li>
          <Link to={ROUTES.leaderBoardPage}>Лидерборд</Link>;
        </li>
        <li>
          <Link to={ROUTES.forumPage}>Форум</Link>;
        </li>
        <li>
          <Link to={ROUTES.topicPage}>Топик</Link>;
        </li>
        <li>
          <Link to="404">404</Link>;
        </li>
        <li>
          <Link to={ROUTES.internalServerError}>500</Link>;
        </li>
      </ul>
    </div>
    <Flex justify="center" h="100px" marginBottom={'250px'} bg={'#e3eddeff'}>
      <Box style={styleBox}>
        <Link to={ROUTES.loginPage}>Логин</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.registrationPage}>Регистрация</Link>
      </Box>
      <Box style={styleBox}>
        <Link to={ROUTES.profilePage}>Профиль</Link>
      </Box>
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
