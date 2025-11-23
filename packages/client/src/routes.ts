import LoginPage from './pages/loginPage'
import RegistrationPage from './pages/registrationPage'
//import { App as ProfilePage } from './pages/profilePage'
import ProfilePage from './pages/profilePage'
import Home from './pages/mainPage'
import ForumPage from './pages/forumPage/index'
import GetStartPage from './pages/getStartPage/getStartPage'
import GamePage from './pages/gamePage'
import LeaderBoardPage from './pages/leaderBoardPage'
import TopicPage from './pages/topicPage'
import NotFoundPage from './pages/notFoundPage'
import InternalServerError from './pages/internalServerErrorPage'
import { RouteObject } from 'react-router-dom'

export const routes = [
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/registration',
    Component: RegistrationPage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/getStart',
    Component: GetStartPage,
  },
  {
    path: '/getStart/game',
    Component: GamePage,
  },
  {
    path: '/leaderboard',
    Component: LeaderBoardPage,
  },
  {
    path: '/forum',
    Component: ForumPage,
  },
  {
    path: '/topic/:id',
    Component: TopicPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
  {
    path: '/500',
    Component: InternalServerError,
  },
] as RouteObject[]
