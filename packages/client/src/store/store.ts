import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/sliceRecord'
import updateUserReducer from '../features/slices/sliceUser'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const store = configureStore({
  reducer: { counter: counterReducer, updateUser: updateUserReducer },
  preloadedState: window.APP_INITIAL_STATE,
})

export const reducer = combineReducers({ user: updateUserReducer })

export type AppDispatch = typeof store.dispatch
//export type RootState = ReturnType<typeof store.getState>
export type RootState = {
  counter: ReturnType<typeof counterReducer>
  updateUser: ReturnType<typeof updateUserReducer>
}
