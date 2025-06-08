import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const nameHandler = event => setUsername(event.target.value)
  const passwordHandler = event => setPassword(event.target.value)

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div className="formInput">
          username:
          <input type="text" value={username} onChange={nameHandler} />
        </div>
        <div className="formInput">
          password:
          <input type="password" value={password} onChange={passwordHandler} />
        </div>
        <button className="buttons" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
