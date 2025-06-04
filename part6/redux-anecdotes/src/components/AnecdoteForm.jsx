import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => { dispatch(setNotification('')) }, 5000)
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