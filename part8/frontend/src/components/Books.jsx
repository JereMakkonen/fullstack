import { useState } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState({ value: '', label: 'all' })
 
  const variables = genre.value ? { genre: genre.value } : undefined
  const genreResult = useQuery(ALL_GENRES)
  const bookResult = useQuery(ALL_BOOKS, { variables })

  if (!show) return null
  if (bookResult.loading || genreResult.loading) return <div>loading...</div>

  const options = [
    { value: '', label: 'all' }, 
    ...genreResult.data.allGenres.map(gen => ({ value: gen, label: gen }))
  ]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookResult.data.allBooks.map(book => ( 
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem"}}>
        Select genre:
        <Select value={genre} onChange={setGenre} options={options} />
      </div>
    </div>
  )
}

export default Books
