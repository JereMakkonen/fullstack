import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ show, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors.map(e => e.message).join('\n'))
    }
  })

  useEffect(() => {    
    if (result.data) {        
      onLogin(result.data.login.value)
      localStorage.setItem('user-token', result.data.login.value)
      client.refetchQueries({ include: [ME] })
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div style={{marginTop: "1rem"}}>
      <form onSubmit={submit}>
        <div >
          username
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm