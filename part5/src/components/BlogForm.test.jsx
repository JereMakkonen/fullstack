import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('event handler is called correctly', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Nero Claudius',
    url: 'test.com'
  }

  const addBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm addBlog={addBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByText('create')

  await user.type(inputs[0], blog.title)
  await user.type(inputs[1], blog.author)
  await user.type(inputs[2], blog.url)
  await user.click(button)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual(blog)
})
