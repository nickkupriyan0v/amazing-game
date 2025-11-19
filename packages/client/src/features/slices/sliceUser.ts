import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
  isLoading: boolean
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
  isLoading: false,
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async (_: void) => {
    const url = `http://localhost:3001/user`
    return fetch(url).then(res => res.json())
  }
)

const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserInfo>) {
      return action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending.type, state => {
        Object.assign(state, initialState)
        state.isLoading = true
      })
      .addCase(
        fetchUserThunk.fulfilled.type,
        (state, { payload }: PayloadAction<UserInfo>) => {
          Object.assign(state, payload)
          state.isLoading = false
        }
      )
      .addCase(fetchUserThunk.rejected.type, state => {
        state.isLoading = false
      })
  },
})

export const selectUser = (state: RootState) => state.updateUser
export const { updateUser } = updateUserSlice.actions
export default updateUserSlice.reducer
