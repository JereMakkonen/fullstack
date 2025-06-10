import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ADD_BOOK, ALL_GENRES, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: result => {
    const genres = result.data?.addBook?.genres
    const queries = [
      { query: ALL_AUTHORS },
      { query: ALL_GENRES },
      { query: ALL_BOOKS },
      ...genres.map(genre => ({ query: ALL_BOOKS, variables: { genre } }))
    ]
    return queries
    },
    onError: (error) =>
      console.log(error.graphQLErrors.map((e) => e.message).join('\n')),
  })

  if (!props.show) return null

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published: parseInt(published), genres }})
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={e => setPublished(e.target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook