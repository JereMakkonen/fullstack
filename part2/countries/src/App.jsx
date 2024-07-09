import { useState, useEffect } from "react"
import getCountries from "./services/countries"
import Country from "./components/Country"

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getCountries().then(allCountries => { setAllCountries(allCountries) })
  }, [])

  const handleFilterChange = ({ target: { value } }) => {
    setCountries(value ? allCountries.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())) : [])
    setFilter(value)
  }

  const showCountry = country => setCountries([country])

  return (
    <div>
      Find countries <input value={filter} onChange={handleFilterChange} />
      <Country countries={countries} showCountry={showCountry} />
    </div>
  )
}

export default App
