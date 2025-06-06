import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const initUser = () => dispatch => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (user) {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const login = credentials => async dispatch => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  } catch (error) {
    dispatch(showNotification('Wrong credentials', 5))
  }
}

export const logout = () => dispatch => {
  window.localStorage.removeItem('loggedUser')
  blogService.setToken(null)
  dispatch(setUser(null))
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
