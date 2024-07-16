const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('when list has one blog', () => {
    assert.strictEqual(listHelper.totalLikes([helper.blogs[0]]), 7)
  })
  test('when list has many blogs', () => {
    assert.strictEqual(listHelper.totalLikes(helper.blogs), 36)
  })
  test('when list has no blogs', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favorite blog', () => {
  test('when list has one blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([helper.blogs[0]]), {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })
  test('when list has many blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(helper.blogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
  test('when list has no blogs', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
})

describe('most blogs', () => {
  test('when list has one blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([helper.blogs[0]]),
      { author: 'Michael Chan', blogs: 1 })
  })
  test('when list has many blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(helper.blogs),
      { author: 'Robert C. Martin', blogs: 3 })
  })
  test('when list has no blogs', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })
})

describe('most likes', () => {
  test('when list has one blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes([helper.blogs[0]]),
      { author: 'Michael Chan', likes: 7 })
  })
  test('when list has many blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(helper.blogs),
      { author: 'Edsger W. Dijkstra', likes: 17 })
  })
  test('when list has no blogs', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })
})
