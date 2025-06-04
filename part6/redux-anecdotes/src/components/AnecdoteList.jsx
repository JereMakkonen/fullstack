import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  )
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>
            vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList