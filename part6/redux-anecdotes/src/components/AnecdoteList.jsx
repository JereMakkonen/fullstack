import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  )

  const vote = id => {
    dispatch(addVote(id))
    const content = anecdotes.find(a => a.id === id).content
    dispatch(showNotification(`you voted '${content}'`, 5))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            {anecdote.content}
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
