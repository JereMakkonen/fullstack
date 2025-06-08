import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.currentUser.username)

  if (!blog) return null

  const handleLike = () => dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  return (
    <div>
      <h4>
        {blog.title} by {blog.author}
      </h4>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name || blog.user.username}</div>
      {blog.user.username === user && <button onClick={handleRemove}>remove</button>}
    </div>
  )
}

export default Blog
