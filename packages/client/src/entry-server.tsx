import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import { reducer } from './store/store'
import './index.css'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router'
import { routes } from './routes'
import { createFetchRequest } from './entry-server.utils'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)
  if (context instanceof Response) {
    throw context
  }
  const store = configureStore({
    reducer,
  })

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <ChakraProvider value={defaultSystem}>
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
        </Provider>
      </ChakraProvider>
    ),
    initialState: store.getState(),
  }
}
