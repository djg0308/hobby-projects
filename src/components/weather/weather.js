import React ,{ useEffect, useState} from 'react'
import './weather.css'
import { Link } from 'react-router-dom'
import MySVGIcons from './MySVGIcons'
import { windByDirection } from './windDirection'
import { WeatherPhotoChange } from './weatherPhoto'
import { URLs } from './urls'
import Spinner from '../spinner/spinner'
import { customStyles } from './customStyles'

export default function Weather() {
const [isDevMode, setIsDevMode] = useState(false)
const [isLoaded, setIsLoaded] = useState(false)
const [forecast, setForecast] = useState('')
const [lastUpdated , setLastUpdated] = useState('')
const [dataUpdated, setDataUpdated] = useState('')
const [sunUp, setSunUp] = useState('')
const [sunDown, setSunDown] = useState('')
const [lengthOfDay, setLengthOfDay] = useState('')
const [sunUpAlt, setSunUpAlt] = useState('')
const [sunDownAlt, setSunDownAlt] = useState('')
// const [lengthOfDayAlt, setLengthOfDayAlt] = useState('')
const [twentyfourHours, setTwentyfourHours ] = useState('')
const [isTeReo, setIsTeReo ] = useState(false)
// const [someError, setSomeError] = useState('')


useEffect(() => {
    async function fetchLastUpdate() {
        await fetch(URLs.lastUpdatedWeatherApiUrl)
         .then(res => res.json())
         .then(json => {
                 setLastUpdated(json.last_update)
         })
         .catch((error) => {
             console.error('Fetch update Error! ', error)
         })
     }
     async function fetchWeather() {
        await fetch(URLs.weatherApiUrl)
             .then(res => res.json())
             .then(json => {
                 setForecast(json.properties.timeseries.slice(0, 1))
                 setTwentyfourHours(json.properties.timeseries.slice(0, 24))
                 setDataUpdated(json.properties.meta.updated_at)
                 setIsLoaded(true)
             })
             .catch((error) => {
                 console.error('Fetch weather Error! ', error)
             })
     }

     async function fetchSunriseIo() {
        await fetch(URLs.sunriseSunsetIoUrl)
            .then(res => res.json())
            .then(json => {
                setSunUp(json.results.sunrise)
                setSunDown(json.results.sunset)
                setLengthOfDay(json.results.day_length + ' hrs')
            })
     }

     async function fetchSunriseAlt() {
        await fetch(URLs.sunriseSunsetApiUrl)
            .then(res => res.json())
            .then(json => {
                setSunUpAlt(json.results.sunrise)
                setSunDownAlt(json.results.sunset)
            })
     }

    //  async function fetchDayLengthAlt() {
    //     await fetch(URLs.sunriseSunsetApiUrlformatted)
    //     .then(res => res.json)
    //     .then(json => {
    //         setLengthOfDayAlt(json.results.day_length)
    //         setIsLoaded(true)
    //     })
    //     .catch((error) => {
    //         console.error('Fetch day length Error! ', error)
    //         setSomeError('Fetch day length Error')
    //     })
    //  }
    
    fetchLastUpdate()
    fetchWeather()
    fetchSunriseIo()
    fetchSunriseAlt()
    // fetchDayLengthAlt()
    
}, [])

if (!isLoaded) {
    console.log('data hasnt loaded yet')
    return <Spinner/>
    
  }
// globally defined strings
const unavailable = 'Unavailable'

  // Arrow function garden
const weatherDesciption = () => {
    const weatherSymbolName = forecast.map((item) => item.data.next_1_hours.summary.symbol_code.replace('_', ' '))
    if (weatherSymbolName.indexOf('_') > -1 ) {
        return weatherSymbolName.replace('_', ' ')
    } else {
        return weatherSymbolName
    }
  } 

 const windDirection = () => {
    const windData = []
    forecast.forEach((item) => {windData.push(parseInt(item.data.instant.details.wind_from_direction))})
    return windByDirection(windData)
  }

 
  const weatherIconOutput = () => {
    const currentWeatherIcon = forecast.map((b) => b.data.next_1_hours.summary.symbol_code)
        return MySVGIcons[currentWeatherIcon]
  }

   const weatherPhoto = () => {
    const currentWeatherIcon = forecast.map((b) => b.data.next_1_hours.summary.symbol_code)
    const convertWeatherIconObjToString = currentWeatherIcon.toString()
    return WeatherPhotoChange(convertWeatherIconObjToString)
  }

  const maxTempTwentyfourHours = () => {
    const maxTemp = []
    twentyfourHours.forEach((items) => {maxTemp.push(parseInt(items.data.instant.details.air_temperature))})
    return Math.max(...maxTemp)
  }
 

  const minTempTwentyfourHours = () => {
    const minTemp = []
    twentyfourHours.forEach((items) => {minTemp.push(parseInt(items.data.instant.details.air_temperature))})
    return Math.min(...minTemp)
  }

  const sunriseApiFallback = () => {
    if (sunUp.length > 1) {
        return sunUp
    } else if (sunUp.length < 1 && sunUpAlt.length > 1) {
        const riseDate = new Date(sunUpAlt)
        const riseResult = riseDate.toLocaleTimeString()
        return riseResult
    } else {
        return unavailable
    }
  }

  const sunsetApiFallback = () => {
    if (sunDown.length > 1) {
        return sunDown
    } else if (sunDown.length < 1 && sunDownAlt.length > 1) {
        const fallDate = new Date(sunDownAlt)
        const fallResult = fallDate.toLocaleTimeString()
        return fallResult
    } else {
        return unavailable
    }
  }

  const dayLengthFallback = () => {
    if (lengthOfDay.length > 1) {
        return lengthOfDay
        // } else if (lengthOfDay.length < 1 && lengthOfDayAlt.length > 1) {
       // return lengthOfDayAlt + ' hrs'
    } else if (lengthOfDay.length < 1 ) {
        return unavailable
    } else {
        return unavailable
    }
  }

  const handleClick = () => {
    if (isTeReo === false) {
        setIsTeReo(true)
    } else 
        setIsTeReo(false)
  }

  
  return (
    <div>
        <g>
        <div className="secret-dev" hidden={!isDevMode}>
            <div className='card dev-card'>
                <div className='dev-title'>Dev testing card</div>
                <img className='weather-test' src={weatherIconOutput()} alt="testTwo"></img> 
                <button style={customStyles.btnStyle}><a className="status" href={URLs.apiHealthUrl}>Check status</a></button>
                <p>Current errors: </p>
                {/* <li className='hot'>{someError}</li> */}
                <p>Data was updated {new Date (dataUpdated).toLocaleDateString() + " " + new Date (dataUpdated).toLocaleTimeString()}</p>
            </div>
        </div>
        <div className='card weather-card'>
            <div className='card-image waves-effect waves-block waves-light'>
            <img alt='sky' style={customStyles.imgStyle} className="activator" src={weatherPhoto()}></img>
            </div>
                <div className='card-content'>
                    <span className='card-activator grey-text text-darken-4'>
                        <h4 className='city'>{isTeReo ? 'Ōtautahi' : 'Christchurch'} &nbsp; <button className='teReo' onClick={handleClick}>{isTeReo ? 'In English' : 'Try Te Reo'}</button></h4> 
                        <ul>
                        <li className='update'>
                            <small>
                                Last updated: {
                                   new Date (lastUpdated).toLocaleDateString() + " "
                                }
                                at: {
                                    new Date (lastUpdated).toLocaleTimeString()
                                } 
                            </small>
                        </li>
                        </ul>
                    </span>
                    <ul>
                        <div className='temperature'>
                            {forecast.map(item => (
                                <li key={item.time}>
                                    <b>{item.data.instant.details.air_temperature}</b> °C  <img className='pic-test' src={weatherIconOutput()} alt='Icon error'></img>
                                    <b className='weather-title'>{weatherDesciption()}</b>
                                </li> 
                            ))}
                        </div>
                        <li className='minAndMax'>
                            Max:  <font className='hot'>{maxTempTwentyfourHours()} </font> °C&nbsp;
                            Min: <font className='cool'>{minTempTwentyfourHours()} </font> °C
                        </li>
                        <div className='rain'>
                            {forecast.map(item => (
                                <li key={item.time}>
                                    {isTeReo ? 'Uanga: ' : 'Rainfall: '} <b>{item.data.next_1_hours.details.precipitation_amount}</b> mm  <small>(in the next hour)</small>
                                </li> 
                            ))}
                           
                        </div>
                        <div className='wind-speed'>
                            {forecast.map(item => (
                                <li key={item.time}>
                                    Wind speed: {Math.round(item.data.instant.details.wind_speed * 3.6)} km/h {windDirection()}
                                </li>
                            ))}
                        </div>
                        <div className='rh'>
                            {forecast.map(item => (
                                <li key={item.time}>
                                    {isTeReo ? 'Pīpīwai: '  : 'Humidity: ' }  {item.data.instant.details.relative_humidity} %
                                </li>
                            ))}
                        </div>
                        <div className='sunrise-sunset'>
                            <li>
                                {isTeReo ? 'whitinga o te rā: ' : 'sunrise: '} {sunriseApiFallback()}
                            </li>
                            <li>
                            {isTeReo ? 'tōnga o te rā: ' : 'sunset: '} {sunsetApiFallback()}
                            </li>
                        </div>
                        <div className='day-length'>
                         <p>Day length: {dayLengthFallback()}</p>
                        </div>
                    </ul>
                </div>
                <div className='return'>
                    <small>
                        <Link style={customStyles.backLinkStyle} to='/'>Back</Link>
                    </small>
                </div>
                <div>
                <button 
                        className="btn waves-effect waves-light dev-btn" 
                        style={customStyles.devButton} onClick={() => isDevMode ? setIsDevMode(false) : setIsDevMode(true) }
                    >Dev mode
                    </button>
                </div>
        </div>
        </g>
    </div>
  )
}
