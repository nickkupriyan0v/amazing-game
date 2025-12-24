import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { routes } from './routes'
import { addUserInfo2Store } from './features/addUserInfo2Store'
import { ColorModeProvider } from './components/ui/color-mode'

const router = createBrowserRouter(routes)

const initApp = async () => {
  await addUserInfo2Store(store.dispatch)

  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <RouterProvider router={router} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

initApp()
