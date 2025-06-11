import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const userToken = localStorage.getItem('user-token')
    if (userToken) setToken(userToken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      alert(`Book added: ${book.title} by ${book.author.name}`)
      
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { 
          allBooks: allBooks?.some(b => b.id === book.id) ? 
          allBooks : allBooks.concat(book) 
        }      
      })
    }
  })

  const login = (userToken) => {
    setToken(userToken)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
         : <button onClick={() => setPage("login")}>login</button>
        }
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm show={page === "login"} onLogin={login} />
    </div>
  )
}

export default App
