const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'user1',
        password: 'passW1'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Blog User',
        username: 'user2',
        password: 'passW2'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'passW1')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'wrong')
      await expect(page.locator('.error')).toContainText('Wrong credentials')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'user1', 'passW1')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test', 'user', 'test.org')

      await expect(page.getByText('test by user added')).toBeVisible()
      await expect(page.getByText('test, user')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('test.org')).toBeVisible()
    })

    describe('blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'test1', 'user', 'test.org')
        await createBlog(page, 'test2', 'user', 'test.org')
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'test1' })

        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByText('likes 0')).toBeVisible()

        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted by correct user', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'test1' })
        page.on('dialog', async (dialog) => { await dialog.accept() })

        await expect(blog.getByText('test1')).toBeVisible()
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'remove' }).click()
        await expect(blog.getByText('test1')).not.toBeVisible()
      })

      test('only correct user sees the remove button', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'test1' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'user2', 'passW2')

        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        await expect(page.locator('.blog').first()).toContainText('test1')
        const blog = page.locator('.blog').filter({ hasText: 'test2' })

        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.getByText('likes 1')).toBeVisible()

        await expect(page.locator('.blog').first()).toContainText('test2')
        await expect(page.locator('.blog').last()).toContainText('test1')
      })
    })
  })
})
