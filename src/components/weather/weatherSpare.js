import { React, useEffect, useState } from 'react'
import MySVGIcons from './MySVGIcons'
import './weather.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

export default function WeatherSpare() {

const [isLoaded, setIsLoaded] = useState(false)
const [forecast, setForecast] = useState('')
const [lastUpdated , setLastUpdated] = useState('')
const [sunrise, setSunrise] = useState('')
const [sunset, setSunset] = useState('')
const [dayLength, setDaylength] = useState('')
const [example, setExample] = useState('')
const [ifLoaded, setIfLoaded] = useState(false)
const [test, setTest] = useState('')
const [wait, setWait] = useState(false)


// https://sunrisesunset.io/api/

    useEffect(() => {
        // URL's
        const weatherApiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=40&lat=-43.532055&lon=172.636230'
        const sunriseSunsetApiUrl = 'https://api.sunrisesunset.io/json?lat=-43.53202&lng=172.6362&timezone=NZST&date=today'
        const lastUpdatedWeatherApiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/status'
        
        async function fetchLastUpdate() {
            await fetch(lastUpdatedWeatherApiUrl)
            .then( async res => await res.json())
            .then(json => {
                    setLastUpdated(json.last_update)
            })
        }
    
        async function fetchWeather() {
            await fetch(weatherApiUrl)
                .then(res => res.json())
                .then(json => {
                    setForecast(json.properties.timeseries.slice(0, 1))
                    setLastUpdated(json.properties.meta.updated_at)
                    console.log()
                })
        }
       
        
        async function fetchSunriseSunsetData() {
            await fetch(sunriseSunsetApiUrl)
            .then(res => res.json())
            .then(json => {
                setSunset(json.results.sunset)
                setSunrise(json.results.sunrise)
                setDaylength(json.results.day_length + ' hrs')
                setIsLoaded(true)
            })
        }
       
        fetchLastUpdate()
        fetchWeather()
        fetchSunriseSunsetData()

        
       
    }, [isLoaded])

    function Example() {
        const {itLoading, error, data, itFetching} = useQuery([], () => 
        axios
        .get('https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=40&lat=-43.532055&lon=172.636230')
        .then((res) => res.data )
        );

        if (itLoading) return "Loading...";
        if (error) return "An error has occured: " + error.message;

        return (
            <div>
               <p>Temp: {data.properties.timeseries.data.instant.details.air_temperature}</p>
               {/* <p>Rain: {data.map(item => item.data.next_1_hours.details.precipitation_amount)}</p> */}
               <div>{itFetching ? "updating..." : " "}</div>
            </div>
        )
    }

    const dataExample = () => {
        axios
        .get('https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=40&lat=-43.532055&lon=172.636230')
        .then((res) => res.data )
        .then(data => {
            setExample(data.properties.timeseries.slice(0, 1))
            setIfLoaded(true)

        })
        
    }
    useEffect(() => {
        dataExample()
    },[])

    if (!isLoaded) {
        return <div>Please wait I am loading...</div>
    }

    if (!ifLoaded) {
        return <div>Please wait I am Loading...</div>
    }

    const weatherIconOutput = () => {
        const currentWeatherIcon = forecast.map((b) => b.data.next_1_hours.summary.symbol_code)
            return MySVGIcons[currentWeatherIcon]
      }
  return (
    <div className='card'>
        {/* <QueryClientProvider client={queryClient}>
            <Example />
        </QueryClientProvider> */}
        <ul>
            {example.map(some => (
                <li key={some.time}>
                   Temp: {some.data.instant.details.air_temperature}
                </li>
            ))
                
            
            }
            <br></br>
              <li>
                sunrise: {sunrise} 
              </li>
              <li>
                sunset: {sunset}
              </li>
              <p>Day length: {dayLength}</p>
        </ul>
        
        {/* <h4>Christchurch</h4>
        <ul>
        <img className='pic-status' src={weatherIconOutput()} alt='Icon error'></img>
            {forecast.map(item => (
                <li key={item.time}>
                    <b>{item.data.instant.details.air_temperature}</b> °C 
                </li> 
            ))}
        </ul> */}
    </div>
  )
}
