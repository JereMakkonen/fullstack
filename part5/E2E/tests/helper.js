const loginWith = async (page, username, password)  => {
  const inputs = await page.getByRole('textbox').all()
  await inputs[0].fill(username)
  await inputs[1].fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  const inputs = await page.getByRole('textbox').all()
  await inputs[0].fill(title)
  await inputs[1].fill(author)
  await inputs[2].fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} by ${author} added`).waitFor()
}

export { loginWith, createBlog }