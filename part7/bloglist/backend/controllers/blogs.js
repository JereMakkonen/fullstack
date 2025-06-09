const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
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
  const { title, author, url, likes } = request.body

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  ).populate('user', { username: 1, name: 1, id: 1 })

  if (!blog) return response.status(400).send({ error: 'malformatted id' })
  response.json(blog)
})

blogsRouter.post('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  .populate('user', { username: 1, name: 1, id: 1 })

  if (!blog) return response.status(400).send({ error: 'malformatted id' })

  blog.comments = blog.comments.concat(request.body.comment)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog) 
})

module.exports = blogsRouter
