const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => { logger.info('connected to MongoDB') })
  .catch(error => { logger.error('error connecting to MongoDB:', error.message) })

app.use(express.json())
app.use(morgan('dev', { stream: { write: m => logger.info(m.trim()) } }))
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
