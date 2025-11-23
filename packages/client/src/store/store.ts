import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/sliceRecord'
import updateUserReducer from '../features/slices/sliceUser'
import { useStore as useStoreBase } from 'react-redux'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const store = configureStore({
  reducer: { counter: counterReducer, updateUser: updateUserReducer },
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export const reducer = combineReducers({
  counter: counterReducer,
  updateUser: updateUserReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = {
  counter: ReturnType<typeof counterReducer>
  updateUser: ReturnType<typeof updateUserReducer>
}

export const useStore: () => typeof store = useStoreBase
