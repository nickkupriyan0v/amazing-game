import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { store } from './store/store'
import { Provider } from 'react-redux'
import useServiceWorker from './hooks/useServiceWorker/useServiceWorker'
import ErrorBoundary from './errorHandling'

const Root = () => {
  useServiceWorker()

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ChakraProvider value={defaultSystem}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
)
