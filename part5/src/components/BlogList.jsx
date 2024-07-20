import Blog from './Blog'

const blogList = ({ blogs, user, update, remove }) => {
  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id}
        blog={blog} user={user} update={update} remove={remove} />)}
    </div>
  )
}

export default blogList