import React, { useEffect, useState } from 'react'

import sun from '../assets/sun.jpg'
import Clock1 from './Clock1.jsx'
import sunrise1 from '../assets/sunrise1.png'
import sunset1 from '../assets/sunset1.png'
import wind from '../assets/wind speed.png'
import Wind from '../assets/windSpeed.png'
import Humidity from '../assets/Humidity.jpg'
import Pressure from '../assets/Pressure.png'
import UV from '../assets/UV.jpg'
import ForeCast from './ForeCast.jsx'
import axios from 'axios'

const API_KEY = "960d1f7e4849e1d224de3dc082034e17";

const Citytime = ({cityName, lat, lon, setLat, setLon}) => {

    const[weatherData,setWeatherData]=useState(null)
    const[foreCastData,setForecastData]=useState(null)
    const[uvIndex,setUvIndex]=useState(null)
    const [loading, setLoading] = useState(false)





    const fetchData = async (city, latitude, longitude) => {
  try {

     setLoading(true)
     let url=""

    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    }



   console.log("Fetching:", url)

      const weatherRes = await axios.get(url)
      setWeatherData(weatherRes.data)

      const { lat: apiLat, lon: apiLon } = weatherRes.data.coord

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${apiLat}&lon=${apiLon}&units=metric&appid=${API_KEY}`
      )
      setForecastData(forecastRes.data)
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message)
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }




 

  useEffect(() => {
    if (!cityName && lat === null && lon === null) {
      fetchData("Pune")
    }
  }, [])

  // 🔁 CITY SEARCH
  useEffect(() => {
    if (cityName?.trim()) {
      fetchData(cityName)
    }
  }, [cityName])

  // 📍 LOCATION FETCH
  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchData(null, lat, lon)
    }
  }, [lat, lon])

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>
  }

  if (!weatherData || !foreCastData) {
    return <h1 style={{ color: "white" }}>No data available</h1>
  }

  const {main, sys, weather, wind} = weatherData 
   const {list} = foreCastData

   const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`


   return (
    <>
    <div className='flex flex-col xl:flex-row gap-4'>
        {/*left section: city and time*/}
        <div className='w-full xl:w-1/3 h-auto md:h-72 bg-[#050e1fde]  shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center'>
            <h1 className='text-2xl md:text-3xl font-bold'>{cityName || weatherData.name }</h1>
            <img src={sun} alt="weather image" className='w-24 select-none'/>
            <Clock1/>
        </div>
        {/*right section: weather details*/}


        <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
            {/* temperature and sunrise and sunset */}
            <div className='flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4'>
                <h1 className='text05xl md:text-7xl font-bold'>{main.temp}&#8451;</h1>
                <p className='text-center'>
                    Feels like:<span className='text-lg md:text-xl ml-2 font-bold'>{main.feels_like}&#8451;</span>
                </p>


                <div className='flex xl:flex-col md:flex-row items-center gap-4'>
                    <div className='flex gap-2 items-center'>
                           <img src={sunrise1} alt="Sunrise" className='h-8 md:h-10 select-none'/>
                                <div className='text-center'>
                                    <h6>Sunrise</h6>
                                    <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>

                                 </div>
                    </div>


                    <div className='flex gap-2 items-center'>
                           <img src={sunset1} alt="Sunset" className='h-8 md:h-10 select-none'/>
                                <div className='text-center'>
                                    <h6>Sunset</h6>
                                    <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>

                                 </div>
                    </div>

                </div>
                

            </div>

           
        </div>
         <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
         {/* Main Weather Icon */}
            <div className='flex flex-col justify-center items-center'>
                <img src={weatherIconUrl} alt='weather icon' className='w-36 h-36 md:w-52 selection-none'/>
                <p className='font-bold text-xl md:text-3xl'>{weather[0].description}</p>

            </div>
        </div>
        <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
            {/* Additional weather info */}
            <div className='md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4'>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={Humidity} alt='humidity icon' className='h-8 md:h-10 select-none'/>
                    <p>{main.humidity}%</p>
                    <h6>Humidity</h6>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={Wind} alt='wind speed icon' className='h-8 md:h-10 select-none'/>
                    <p>{wind.speed} km/h</p>
                    <h6>Wind Speed</h6>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={Pressure} alt='pressure icon' className='h-8 md:h-10 select-none'/>
                    <p>{main.pressure} hPa</p>
                    <h6>Pressure</h6>
                </div>

                <div className='flex flex-col gap-2 items-center'>
                    <img src={UV} alt='humidity icon' className='h-12 md:h-14 select-none'/>
                    <p>{uvIndex !==null ? uvIndex : "N/A"}</p>
                    <h6>UV</h6>
                </div>

            </div>
        </div>
    </div>
    <ForeCast forecast={list}/>
    </>
  )
}

export default Citytime






















