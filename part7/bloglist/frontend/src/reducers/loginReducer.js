import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setcurrentUser(state, action) {
      return action.payload
    }
  }
})

export const initCurrentUser = () => dispatch => {
  const user = JSON.parse(window.localStorage.getItem('currentUser'))
  if (user) {
    blogService.setToken(user.token)
    dispatch(setcurrentUser(user))
  }
}

export const login = credentials => async dispatch => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('currentUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setcurrentUser(user))
  } catch (error) {
    dispatch(showNotification('Wrong credentials', 5))
  }
}

export const logout = () => dispatch => {
  window.localStorage.removeItem('currentUser')
  blogService.setToken(null)
  dispatch(setcurrentUser(null))
}

export const { setcurrentUser } = loginSlice.actions
export default loginSlice.reducer
