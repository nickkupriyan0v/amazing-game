import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

const initialState: UserInfo = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  login: '',
  avatar: '',
  email: '',
}

const userInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    userInfo(state, action: PayloadAction<UserInfo>) {
      return action.payload
    },
  },
})

export const { userInfo } = userInfoSlice.actions
export default userInfoSlice.reducer
