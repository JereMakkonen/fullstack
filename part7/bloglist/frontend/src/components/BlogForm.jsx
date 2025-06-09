import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const titleHandler = event => setTitle(event.target.value)
  const authorHandler = event => setAuthor(event.target.value)
  const urlHandler = event => setUrl(event.target.value)

  const dispatch = useDispatch()

  const onSubmit = async event => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  if (!visible)
    return (
      <Button variant="primary" onClick={() => setVisible(true)}>
        new blog
      </Button>
    )

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control type="text" name="title" onChange={titleHandler} />
        <Form.Label>author:</Form.Label>
        <Form.Control type="text" name="author" onChange={authorHandler} />
        <Form.Label>url:</Form.Label>
        <Form.Control type="text" name="url" onChange={urlHandler} />
      </Form.Group>
      <div className="buttons">
        <Button variant="primary" type="submit">
          create
        </Button>
        <Button variant="secondary" onClick={() => setVisible(false)}>
          cancel
        </Button>
      </div>
    </Form>
  )
}

export default BlogForm
