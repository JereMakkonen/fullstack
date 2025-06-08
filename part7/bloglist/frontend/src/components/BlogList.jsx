import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <BlogForm />
      {blogs.map(blog => (
        <li key={blog.id} className="blogList">
          <a href={`/blogs/${blog.id}`}>
            {blog.title}, {blog.author}
          </a>
        </li>
      ))}
    </div>
  )
}

export default BlogList
