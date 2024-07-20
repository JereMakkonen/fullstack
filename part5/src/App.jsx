import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const addBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(
      blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user) {
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs((blogs.concat(blog)).sort((a, b) => b.likes - a.likes))
      showNotice(`${blog.title} by ${blog.author} added`, 'success')
      addBlogRef.current.toggleVis()
      return true
    } catch (error) {
      showNotice('title/url missing', 'error')
      return false
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updated = await blogService.update(blog)
      setBlogs((blogs.map(blog => (blog.id === updated.id ? updated : blog))
        .sort((a, b) => b.likes - a.likes)))
    } catch (error) {
      console.log(error.message)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      showNotice(`blog ${blog.title} by ${blog.author} was deleted`, 'success')
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      showNotice(error.message, 'error')
    }
  }

  const loginSubmit = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      showNotice('Wrong credentials', 'error')
    }
  }

  const logoutSubmit = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const showNotice = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, 3000)
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          {user.name || user.username} logged in{' '}
          <button onClick={logoutSubmit}>logout</button><br />
          <Toggle top={false} label={['new blog', 'cancel']} ref={addBlogRef}>
            <h3>create new blog</h3>
            <BlogForm addBlog={addBlog} />
          </Toggle>
          <BlogList blogs={blogs} user={user}
            update={updateBlog} remove={removeBlog} />
        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <LoginForm loginSubmit={loginSubmit} />
        </div>
      )}
    </div>
  )
}

export default App