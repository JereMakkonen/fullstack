import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const success = await addBlog({ title: title, author: author, url: url })
    if (success) {
      setTitle(''), setAuthor(''), setUrl('')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input type='text' value={title} name='title'
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input type='text' value={author} name='author'
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input type='text' value={url} name='url'
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm