import React from 'react'
import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router'

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
          <Link to={ROUTES.gamePage}>Игра</Link>;
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
  )
}

export default Header
