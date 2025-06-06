import { useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import { setBlogs } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logout, initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
  }, [])

  const handleLogout = () => dispatch(logout())

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Notification />
          {user.name || user.username} logged in <button onClick={handleLogout}>logout</button>
          <Toggle id="blogForm" label={['new blog', 'cancel']}>
            <h3>create new blog</h3>
            <BlogForm />
          </Toggle>
          <BlogList />
        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </div>
      )}
    </div>
  )
}

export default App
