import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext.jsx'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: anecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => (a.id === anecdote.id ? anecdote : a))
      )
      notifDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
      setTimeout(() => { notifDispatch({ type: 'CLEAR' }) }, 5000)
    }
  })

  const handleVote = anecdote =>
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2
  })
  const anecdotes = result.data

  if (result.isLoading) return <div>loading data...</div>
  if (result.isError) return <div>anecdote service not available due to problems in server</div>

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
