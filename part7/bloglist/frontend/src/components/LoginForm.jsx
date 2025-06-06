import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const nameHandler = event => setUsername(event.target.value)
  const passHandler = event => setPassword(event.target.value)

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setPassword(''), setUsername('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} name="Username" onChange={nameHandler} />
      </div><div>
        password <input type="password" value={password} name="Password" onChange={passHandler} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
