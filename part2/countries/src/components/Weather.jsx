import { useState, useEffect } from "react"
import getWeather from "../services/weather"
import descriptions from "./descriptions.json"

const Weather = ({ latlng }) => {
  const [weather, setWeather] = useState(null)

  const info = weather === null ? null : 
    descriptions[weather.weathercode][weather.is_day ? "day" : "night"]

  useEffect(() => {
    getWeather(latlng[0], latlng[1]).then(weather => { 
      setWeather(weather.current_weather) 
    })
  }, latlng)

  return (
    weather === null ? null : 
    <div>
      <p>temperature {weather.temperature} Celsius</p>
      <img src={info.image} alt={info.description} />
      <p>wind {weather.windspeed} km/h</p>
    </div>
  )
}

export default Weather
