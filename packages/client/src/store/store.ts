import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/sliceRecord'
import userInfoReducer from '../features/slices/sliceUser'

export const store = configureStore({
  reducer: { counter: counterReducer, userInfo: userInfoReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
