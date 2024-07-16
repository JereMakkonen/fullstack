const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const correct = (user === null) ?
    false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correct))
    return response.status(401).json({ error: 'invalid username or password' })

  const token = jwt.sign({ username: user.username, id: user.id },
    process.env.SECRET, { expiresIn: 60 * 60 })
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
