import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll().then(initialPersons => { setPersons(initialPersons) })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newPerson.name)

    if (person && window.confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`))
      updatePerson(person)
    else {
      const personObject = {
        name: newPerson.name,
        number: newPerson.number,
      }
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNotification({ type: "success", message: `Added ${person.name}` })
          setTimeout(() => { setNotification(null) }, 5000)
          setNewPerson({ name: '', number: '' })
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => { setPersons(persons.filter(person => person.id !== id)) })
        .catch(() => {
          setNotification({ type: "error", message: `${name} was already removed` })
          setTimeout(() => { setNotification(null) }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updatePerson = (person) => {
    const changedPerson = { ...person, number: newPerson.number }
    personService
      .update(person.id, changedPerson)
      .then(person => {
        setPersons(persons.map(p => p.id !== person.id ? p : person))
        setNotification({ type: "success", message: `Updated ${person.name}` })
        setTimeout(() => { setNotification(null) }, 5000)
        setNewPerson({ name: '', number: '' })
      })
      .catch(() => {
        setNotification({ type: "error", message: `${person.name} was already removed` })
        setTimeout(() => { setNotification(null) }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handlePersonChange = ({ target }) => {
    setNewPerson(person => ({ ...person, [target.name]: target.value }))
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} person={newPerson} onChange={handlePersonChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App
