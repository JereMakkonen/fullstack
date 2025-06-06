import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const showNotification = (notif, delay) => async dispatch => {
  dispatch(setNotification(notif))
  setTimeout(() => {
    dispatch(setNotification(null))
  }, delay * 1000)
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
