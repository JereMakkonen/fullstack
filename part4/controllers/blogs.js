const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog(request.body)

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) return response.status(400).send({ error: 'malformatted id' })
  if (blog.user.toString() !== user.id.toString())
    return response.status(401).json({ error: 'permission denied' })

  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog  = await Blog.findByIdAndUpdate(request.params.id,
    request.body, { new: true, runValidators: true })

  if (!blog) return response.status(400).send({ error: 'malformatted id' })
  response.json(blog)
})

module.exports = blogsRouter
