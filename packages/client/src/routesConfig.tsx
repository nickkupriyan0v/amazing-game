import { Route, Routes } from 'react-router'
import { ROUTES } from './constants/routes'
import RegistrationPage from './pages/registrationPage'
import ProfilePage from './pages/profilePage'
import MainPage from './pages/mainPage'
import GamePage from './pages/gamePage'
import LeaderBoardPage from './pages/leaderBoardPage'
import ForumPage from './pages/forumPage'
import TopicPage from './pages/topicPage'
import NotFoundPage from './pages/notFoundPage'
import LoginPage from './pages/loginPage'
import InternalServerError from './pages/internalServerErrorPage'
import { GetStartPage } from './pages/getStartPage/getStartPage'

const RoutesConfig = () => (
  <Routes>
    <Route path={ROUTES.loginPage} element={<LoginPage />} />
    <Route path={ROUTES.registrationPage} element={<RegistrationPage />} />
    <Route path={ROUTES.profilePage} element={<ProfilePage />} />
    <Route path={ROUTES.mainPage} element={<MainPage />} />
    <Route
      path={ROUTES.gamePage}
      element={
        <GetStartPage
          getStart={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      }
    />
    <Route path={ROUTES.leaderBoardPage} element={<LeaderBoardPage />} />
    <Route path={ROUTES.forumPage} element={<ForumPage />} />
    <Route path={ROUTES.topicPage} element={<TopicPage />} />
    <Route path={ROUTES.notFoundPage} element={<NotFoundPage />} />
    <Route
      path={ROUTES.internalServerError}
      element={<InternalServerError />}
    />
  </Routes>
)

export default RoutesConfig
