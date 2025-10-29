import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RecordState {
  value: number
}

const initialState: RecordState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'Counter',
  initialState,
  reducers: {
    record(state, action: PayloadAction<number>) {
      state.value =
        state.value > action.payload || state.value === 0
          ? action.payload
          : state.value
    },
  },
})

export const { record } = counterSlice.actions
export default counterSlice.reducer
