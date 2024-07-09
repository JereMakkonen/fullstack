const Persons = ({ persons, newFilter, removePerson }) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      {filtered.map(person =>
        <p key={person.id}>
          {person.name} {person.number}&nbsp;
          <button onClick={() => removePerson(person.id, person.name)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons
