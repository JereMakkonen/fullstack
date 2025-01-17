import { useState } from 'react'

const LoginForm = ({ loginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    await loginSubmit({ username, password })
    setPassword('')
    setUsername('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm