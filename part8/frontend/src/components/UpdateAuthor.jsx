import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdateAuthor = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [year, setYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) =>
      console.log(error.graphQLErrors.map(e => e.message).join('\n'))
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: parseInt(year) }})
    setSelectedAuthor(null)
    setYear('')
  }

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <div style={{marginTop: "1rem"}}>
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
          placeholder="Select author"
        />
        <div style={{marginTop: "1rem"}}>
          born
          <input value={year} onChange={e => setYear(e.target.value)} />
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateAuthor