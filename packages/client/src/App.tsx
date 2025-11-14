import RoutesConfig from './routesConfig'
import Header from './components/Header'
import { useYandexAuth } from './hooks/useYandexAuth/useYandexAuth'

const App = () => {
  useYandexAuth()
  return (
    <>
      <Header />
      <RoutesConfig />
    </>
  )
}

export default App
