import { createSlice } from '@reduxjs/toolkit'

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {},
  reducers: {
    toggleVisibility: (state, action) => {
      state[action.payload] = !state[action.payload]
    },
    setVisibility: (state, action) => {
      state[action.payload] = false
    }
  }
})

export const { toggleVisibility, setVisibility } = toggleSlice.actions
export default toggleSlice.reducer
