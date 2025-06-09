import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { initCurrentUser } from './reducers/loginReducer'
import { initUsers } from './reducers/usersReducer'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  useEffect(() => {
    dispatch(initCurrentUser())
    dispatch(initUsers())
    dispatch(initBlogs())
  }, [])

  if (!user) return <LoginForm />

  return (
    <div className="container">
      <NavBar name={user.name || user.username} />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </div>
  )
}

export default App
