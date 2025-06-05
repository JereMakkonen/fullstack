import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification(`you added '${content}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
