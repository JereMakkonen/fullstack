import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'
import { Card, Button, Row, Col } from 'react-bootstrap'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.currentUser.username)

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4" as="h4">{blog.title}</Card.Title>
        <Card.Text>
          <a href={blog.url}>{blog.url}</a>
        </Card.Text>
        <Row className="align-items-center mb-3">
          <Col xs="auto">Likes: {blog.likes}</Col>
          <Col xs="auto">
            <Button variant="outline-primary" size="sm" onClick={handleLike}>
              Like
            </Button>
          </Col>
        </Row>
        <Card.Text className="text-muted">
          Added by {blog.user.name || blog.user.username}
        </Card.Text>
        {blog.user.username === user && (
          <Button variant="outline-danger" size="sm" onClick={handleRemove}>
            Remove
          </Button>
        )}
      </Card.Body>
      <Card.Footer><Comments blog={blog} />
      </Card.Footer>
    </Card>
  )
}

export default Blog
