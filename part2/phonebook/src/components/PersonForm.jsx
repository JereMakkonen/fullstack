const PersonForm = ({ onSubmit, person, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input name="name" value={person.name} onChange={onChange} /></div>
      <div>number: <input name="number" value={person.number} onChange={onChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm
