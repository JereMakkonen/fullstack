import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const content = anecdotes.find(a => a.id === id).content
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => { dispatch(setNotification('')) }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id) }>
            vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
