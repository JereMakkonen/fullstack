import Toggle from './Toggle'

const Blog = ({ blog, user, update, remove }) => {

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      remove(blog)
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title}, {blog.author}{' '}
      <Toggle top={true} label={['view', 'hide']}>
        <a href={blog.url}>{blog.url}</a>
        <br />likes {blog.likes}{' '}
        <button onClick={() => update({ ...blog, likes: blog.likes + 1 })}>like</button>
        <br />{blog.user.name || blog.user.username}<br />
        {blog.user.username === user.username &&
          <button onClick={handleRemove}>remove</button>}
      </Toggle>
    </div>
  )
}

export default Blog
