import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/sliceRecord'
import updateUserReducer from '../features/slices/sliceUser'
import { useStore as useStoreBase } from 'react-redux'
import { reducer } from './reducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import { forumApi } from '../api/forumApi/forumApi'
declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(forumApi.middleware),
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = {
  counter: ReturnType<typeof counterReducer>
  updateUser: ReturnType<typeof updateUserReducer>
}

export const useStore: () => typeof store = useStoreBase
