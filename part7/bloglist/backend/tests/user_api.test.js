const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('pw12345', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('User creation succeeds with a valid username and password', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = { username: 'test123', password: 'secret123' }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(newUser.username))
})

test('User creation fails with a invalid username/password', async () => {
  let newUser = { username: 'ab', password: 'abcd' }
  await api.post('/api/users').send(newUser).expect(400)

  newUser = { username: 'abcd', password: 'ab' }
  await api.post('/api/users').send(newUser).expect(400)

  newUser = { username: 'root', password: 'abcd' }
  await api.post('/api/users').send(newUser).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
