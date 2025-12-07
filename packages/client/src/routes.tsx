import LoginPage from './pages/loginPage'
import RegistrationPage from './pages/registrationPage'
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
import { RootLayout } from './components/Themes/RootLayout'
import { ComponentType } from 'react'

const withLayout = (Component: ComponentType) => (
  <RootLayout>
    <Component />
  </RootLayout>
)

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: withLayout(LoginPage),
  },
  {
    path: '/registration',
    element: withLayout(RegistrationPage),
  },
  {
    path: '/profile',
    element: withLayout(ProfilePage),
  },
  {
    path: '/',
    element: withLayout(Home),
  },
  {
    path: '/getStart',
    element: withLayout(GetStartPage),
  },
  {
    path: '/getStart/game',
    element: withLayout(GamePage),
  },
  {
    path: '/leaderboard',
    element: withLayout(LeaderBoardPage),
  },
  {
    path: '/forum',
    element: withLayout(ForumPage),
  },
  {
    path: '/forum/:id',
    element: withLayout(TopicPage),
  },
  {
    path: '*',
    element: withLayout(NotFoundPage),
  },
  {
    path: '/500',
    element: withLayout(InternalServerError),
  },
]
