import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const userResult = useQuery(ME)
  const bookResult = useQuery(ALL_BOOKS, { 
    variables: { genre },
    skip: !genre 
  })

  useEffect(() => {
    if (userResult.data?.me?.favoriteGenre) {
      setGenre(userResult.data.me.favoriteGenre)
    }
  }, [userResult])

  if (!show) return null
  if (userResult.loading || bookResult.loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookResult.data?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend