import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/sliceRecord'
import updateUserReducer from '../features/slices/sliceUser'
import { forumApi } from '../api/forumApi/forumApi'

export const reducer = combineReducers({
  counter: counterReducer,
  updateUser: updateUserReducer,
  [forumApi.reducerPath]: forumApi.reducer,
})
