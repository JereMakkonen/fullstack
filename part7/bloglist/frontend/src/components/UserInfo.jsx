import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user) return null

  return (
    <div className="blog-list">
      <h3>Blogs created by {user.name || user.username}</h3>
      {user.blogs.map(blog => (
        <li key={blog.id} className="list">{blog.title}</li>
      ))}
    </div>
  )
}

export default UserInfo
