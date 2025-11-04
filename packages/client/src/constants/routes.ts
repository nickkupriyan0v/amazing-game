export const ROUTES_WITH_NAMES = [
  {
    name: 'Логин',
    path: '/login',
  },
  {
    name: 'Регистрация',
    path: '/registration',
  },
  {
    name: 'Профиль',
    path: '/profile',
  },
  {
    name: 'Главная',
    path: '/',
  },
  {
    name: 'Игра',
    path: '/game',
  },
  {
    name: 'Лидерборд',
    path: '/leaderboard',
  },
  {
    name: 'Форум',
    path: '/forum',
  },
  {
    name: 'Топик',
    path: '/topic/:id',
  },
  // {
  //   name: '404',
  //   path: '*',
  // },
  // {
  //   name: '500',
  //   path: '/500',
  // },
]

export const ROUTES = {
  loginPage: '/login',
  registrationPage: '/registration',
  profilePage: '/profile',
  mainPage: '/',
  getStartGame: '/getStart',
  gamePage: '/getStart/game',
  leaderBoardPage: '/leaderboard',
  forumPage: '/forum',
  topicPage: '/topic/:id',
  notFoundPage: '*',
  internalServerError: '/500',
}
