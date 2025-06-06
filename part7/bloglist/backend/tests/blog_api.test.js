const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token //authentication token for adding and deleting blogs

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await User.deleteMany()
  await api.post('/api/users').send(helper.newUser)
  token = (await api.post('/api/login').send(helper.newUser)).body.token
})

describe('api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.blogs.length)
  })

  test('blogs have correct id property', async () => {
    const response = await api.get('/api/blogs')
    assert.ok('id' in response.body[0])
  })
})

describe('adding a new blog', () => {
  test('blogs can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.blogs.length + 1)
    assert(titles.includes('Test blog'))
  })

  test('likes default to 0 if missing', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)

    assert.strictEqual(response.body.likes, 0)
  })

  test("blogs with missing data can't be added", async () => {
    const blog = { author: 'John Smith' }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog).expect(400)
  })

  test("can't add blogs with invalid token", async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${'FAKE' + token.slice(4)}`)
      .send(helper.newBlog)
      .expect(401)
  })
})

describe('deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)

    const blogsBefore = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, blogsBefore.length - 1)
  })

  test('deleting with wrong id fails', async () => {
    await api.delete('/api/blogs/wrong_id').set('Authorization', `Bearer ${token}`).expect(400)
  })
})

describe('updating a blog', () => {
  test('a blog can be updated', async () => {
    const blog = (await helper.blogsInDb())[0]
    await api.put(`/api/blogs/${blog.id}`).send(helper.newBlog).expect(200)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs[0].title, helper.newBlog.title)
  })

  test('updating with wrong id fails', async () => {
    await api.put('/api/blogs/wrong_id').send(helper.newBlog).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
