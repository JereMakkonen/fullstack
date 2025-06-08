import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

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

  if (!visible) return <button onClick={() => setVisible(true)}>new blog</button>

  return (
    <div>
      <h3>Create a new blog</h3>
      <div className="formInput">
        title: <input type="text" value={title} onChange={titleHandler} />
      </div>
      <div className="formInput">
        author: <input type="text" value={author} onChange={authorHandler} />
      </div>
      <div className="formInput">
        url: <input type="text" value={url} onChange={urlHandler} />
      </div>
      <div className="buttons">
        <button onClick={onSubmit}>create</button>
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default BlogForm
