import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdateAuthor = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [year, setYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) =>
      console.log(error.graphQLErrors.map(e => e.message).join('\n'))
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name, setBornTo: parseInt(year) }})
    setSelectedAuthor(null)
    setYear('')
  }

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <div>
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
          placeholder="Select author"
        />
        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor