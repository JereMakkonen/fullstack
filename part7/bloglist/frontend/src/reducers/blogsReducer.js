import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const initBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const addBlog = newBlog => async dispatch => {
  try {
    const blog = await blogService.create(newBlog)
    dispatch(appendBlog(blog))
    dispatch(showNotification(`${blog.title} by ${blog.author} added`, 5))
  } catch (error) {
    dispatch(showNotification(error.message, 5))
  }
}

export const likeBlog = blog => async (dispatch, getState) => {
  try {
    await blogService.update(blog)
    dispatch(setBlogs(getState().blogs.map(b => (b.id === blog.id ? blog : b))))
  } catch (error) {
    dispatch(showNotification(error.message, 5))
  }
}

export const removeBlog = blog => async (dispatch, getState) => {
  try {
    await blogService.remove(blog.id)
    dispatch(showNotification(`blog ${blog.title} by ${blog.author} was deleted`, 5))
    dispatch(setBlogs(getState().blogs.filter(b => b.id !== blog.id)))
  } catch (error) {
    dispatch(showNotification(error.message, 5))
  }
}

export const commentBlog = (comment, id) => async (dispatch, getState) => {
  try {
    const blog = await blogService.comment({ comment: comment }, id)
    dispatch(setBlogs(getState().blogs.map(b => (b.id === blog.id ? blog : b))))
  } catch (error) {
    dispatch(showNotification(error.message, 5))
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
