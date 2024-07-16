const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs?.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs?.length) return null

  const f = blogs.reduce((max, blog) =>
    (blog.likes > max.likes ? blog : max), blogs[0])

  return { title: f.title, author: f.author, likes: f.likes }
}

const mostBlogs = (blogs) => {
  if (!blogs?.length) return null

  const count = blogs.reduce((sum, blog) =>
    (sum[blog.author] = (sum[blog.author] || 0) + 1, sum), {})

  const n = Object.entries(count)
    .reduce((a, b) => (b[1] > a[1] ? b : a), [null, -Infinity])

  return { author: n[0], blogs: n[1] }
}

const mostLikes = (blogs) => {
  if (!blogs?.length) return null

  const count = blogs.reduce((sum, blog) =>
    (sum[blog.author] = (sum[blog.author] || 0) + blog.likes, sum), {})

  const n = Object.entries(count)
    .reduce((a, b) => (b[1] > a[1] ? b : a), [null, -Infinity])

  return { author: n[0], likes: n[1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
