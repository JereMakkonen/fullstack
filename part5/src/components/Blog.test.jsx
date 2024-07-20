import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test blog',
  author: 'Nero Claudius',
  url: 'test.com',
  likes: 3,
  user: {
    username: 'nero123',
    name: 'Nero Claudius',
  }
}

const user = {
  username: 'test_user',
  name: 'test',
}

const update = vi.fn()
let container

beforeEach(() => {
  const component = render(<Blog blog={blog} user={user} update={update}/>)
  container = component.container
})

test('Renders title and author', () => {
  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.likes)
})

test('clicking view shows url and likes', async () => {
  const usr = userEvent.setup()
  const button = screen.getByText('view')
  await usr.click(button)

  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(blog.likes)
})

test('clicking likes calls event handler correctly', async () => {
  const usr = userEvent.setup()
  const button = screen.getByText('view')
  await usr.click(button)

  const like = screen.getByText('like')
  await usr.dblClick(like)
  expect(update.mock.calls).toHaveLength(2)
})