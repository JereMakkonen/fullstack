import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleHandler = event => setTitle(event.target.value)
  const authorHandler = event => setAuthor(event.target.value)
  const urlHandler = event => setUrl(event.target.value)

  const dispatch = useDispatch()

  const onSubmit = async event => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }))
    setTitle(''), setAuthor(''), setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>title: <input id="title" value={title} onChange={titleHandler} /></div>
        <div>author: <input id="author" value={author} onChange={authorHandler} /></div>
        <div>url: <input id="url" value={url} onChange={urlHandler} /></div>
        <div><button type="submit">create</button></div>
      </div>
    </form>
  )
}

export default BlogForm
