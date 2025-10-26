import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import useServiceWorker from './hooks/useServiceWorker/useServiceWorker'

const Root = () => {
  useServiceWorker()

  return (
    <React.StrictMode>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
)
