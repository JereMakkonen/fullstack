import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Toggle from './Toggle'

const Blog = ({ blog }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 10
  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLike = () => dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) 
      dispatch(removeBlog(blog))
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>{blog.title}, {blog.author}</div>
      <Toggle id={blog.id} label={['view', 'hide']}>
        <a href={blog.url}>{blog.url}</a>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name || blog.user.username}</div>
        {blog.user.username === user.username && <button onClick={handleRemove}>remove</button>}
      </Toggle>
    </div>
  )
}

export default Blog
