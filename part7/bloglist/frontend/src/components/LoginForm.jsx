import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

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
    <div className="login">
      <h2>log in</h2>
      <Notification />
      <Form onSubmit={handleLogin} style={{ width: '20rem' }}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" value={username} onChange={nameHandler} />
          <Form.Label>username:</Form.Label>
          <Form.Control type="password" value={password} onChange={passwordHandler} />
        </Form.Group>
        <Button className="buttons" variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
