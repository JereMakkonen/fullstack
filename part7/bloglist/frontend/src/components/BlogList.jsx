import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { ListGroup, Card } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Add a New Blog</Card.Title>
          <BlogForm />
        </Card.Body>
      </Card>
      <ListGroup>
        {blogs.map(blog => (
          <ListGroup.Item key={blog.id} as={Link} to={`/blogs/${blog.id}`}>
            <strong style={{ marginRight: '0.4rem' }}>{blog.title}</strong>
            <span className="text-muted"> by {blog.author}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
