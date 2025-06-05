import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => { 
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
      notifDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' created` })
      setTimeout(() => { notifDispatch({ type: "CLEAR" }) }, 5000)
    },
    onError: (err) => {
      notifDispatch({ type: "SET", payload: err.response.data.error })
      setTimeout(() => { notifDispatch({ type: "CLEAR" }) }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
