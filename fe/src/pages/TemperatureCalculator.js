import { useState } from "react"

const scales = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const toCelsius = f => (f - 32) * 5 / 9

const toFahrenheit = c => (c * 9 / 5) + 32

const convert = (temperature, convertFunction) => {
  const input = parseFloat(temperature)

  if (Number.isNaN(input))
    return ''

  const output = Math.round(convertFunction(input) * 1000) / 1000
  return String(output)
}

const TemperatureInput = (props) => {
  const scale = props.scale
  const temperature = props.temperature
  const handleChange = e => props.onTemperatureChange(e.target.value)

  return (
    <fieldset>
      <label>Enter temperature in {scales[scale]}</label><br />
      <input value={temperature} onChange={e => handleChange(e)} />
    </fieldset>
  )
}

const BoilingInfo = (props) => {
  return (
    <div>
      {props.c ? <p>Current Celsius: {props.c}</p> : null}
      {props.f ? <p>Current Fahrenheit: {props.f}</p> : null}
      {props.c >= 100
        ? <p>Water boiling...</p>
        : <p>Water not boiling...</p>
      }
    </div>
  )
}

const TemperatureCalculator = () => {
  const [temperature, setTemperature] = useState("")
  const [scale, setScale] = useState("c")

  const handleCelsiusChange = t => {
    setScale('c')
    setTemperature(t)
  }

  const handleFahrenheitChange = t => {
    setScale('f')
    setTemperature(t)
  }

  const celsius = scale === 'c'
    ? temperature
    : convert(temperature, toCelsius)

  const fahrenheit = scale === 'f'
    ? temperature
    : convert(temperature, toFahrenheit)

  return (
    <div>
      {/* celsius input */}
      <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={(e) => handleCelsiusChange(e)} />
      {/* fahrenheit input */}
      <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={(e) => handleFahrenheitChange(e)} />
      {/* Boiling info */}
      <BoilingInfo c={parseFloat(celsius)} f={parseFloat(fahrenheit)} />
    </div>
  )
}

export default TemperatureCalculator