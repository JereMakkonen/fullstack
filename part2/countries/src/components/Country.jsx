import Weather from "./Weather"

const Countries = ({ countries, onClick }) => {
  return countries.map((country) =>
    <div key={country.name.common}> {country.name.common}&nbsp;
      <button onClick={() => onClick(country)}>show</button>
    </div>
  )
}

const Info = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}<br />area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) =>
          <li key={key}> {value}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.capital[0]}</h2>
      <Weather latlng={country.capitalInfo.latlng} />
    </div>
  )
}

const Country = ({ countries, showCountry }) => {
  if (countries.length === 1)
    return <Info country={countries[0]} />

  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>

  if (countries.length)
    return <Countries countries={countries} onClick={showCountry} />

  return null
}

export default Country
