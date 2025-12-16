import React, { use, useState } from 'react'
import sun from '../assets/sun.jpg'
import Clock1 from './Clock1.jsx'
import sunrise1 from '../assets/sunrise1.png'
import sunset1 from '../assets/sunset1.png'
import wind from '../assets/wind speed.png'
import Humidity from '../assets/Humidity.jpg'
import Pressure from '../assets/Pressure.png'
import UV from '../assets/UV.jpg'
import ForeCast from './ForeCast.jsx'
import axios from 'axios'



const Citytime = ({cityName, lat, lon, setlat, setlon}) => {

    const[weatherData,setWeatherData]=useState(null)
    const[foreCastData,setForecastData]=useState(null)
    const[uvIndex,setUvIndex]=useState(null)

    const fetchData = async () => {
        try {
            const encodedCity= encodeURLComponent(cityName)
            let url;

            if(encodedCity){
            url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=mentrics&&appid=960d1f7e4849e1d224de3dc082034e17`;

            }else if(lat && lon){
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=mentrics&&appid=960d1f7e4849e1d224de3dc082034e17`;
            }

            else{
                Toast.error("Missing city name or coordinates")
            }
            const currentWeather=  await axios.get(url)
            setWeatherData(currentWeather.data)

            const{coord}=currentWeather.data
            setlat(coord.lat)
            // setlon(coord.lon)
            




        } catch (error) {
            console.log(error)



} }
  return (
    <>
    <div className='flex flex-col xl:flex-row gap-4'>
        {/*left section: city and time*/}
        <div className='w-full xl:w-1/3 h-auto md:h-72 bg-[#050e1fde]  shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center'>
            <h1>Pune</h1>
            <img src={sun} alt="weather image" className='w-24 select-none'/>
            <Clock1/>
        </div>
        {/*right section: weather details*/}


        <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
            {/* temperature and sunrise and sunset */}
            <div className='flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4'>
                <h1 className='text05xl md:text-7xl font-bold'>24&#8451;</h1>
                <p className='text-center'>
                    Feels like:<span className='text-lg md:text-xl ml-2 font-bold'>25&#8451;</span>
                </p>


                <div className='flex xl:flex-col md:flex-row items-center gap-4'>
                    <div className='flex gap-2 items-center'>
                           <img src={sunrise1} alt="Sunrise" className='h-8 md:h-10 select-none'/>
                                <div className='text-center'>
                                    <h6>Sunrise</h6>
                                    <p>6:03 AM</p>

                                 </div>
                    </div>


                    <div className='flex gap-2 items-center'>
                           <img src={sunset1} alt="Sunset" className='h-8 md:h-10 select-none'/>
                                <div className='text-center'>
                                    <h6>Sunset</h6>
                                    <p>6:03 PM</p>

                                 </div>
                    </div>

                </div>
                

            </div>

           
        </div>
         <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
         {/* Main Weather Icon */}
            <div className='flex flex-col justify-center items-center'>
                <img src={sun} alt='sun' className='w-36 h-36 md:w-52 selection-none'/>
                <p className='font-bold text-xl md:text-3xl'>Sunny</p>

            </div>
        </div>
        <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center md:items-stretch gap-4'>
            {/* Additional weather info */}
            <div className='md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4'>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={Humidity} alt='humidity icon' className='h-8 md:h-10 select-none'/>
                    <p>77%</p>
                    <h6>Humidity</h6>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={wind} alt='humidity icon' className='h-8 md:h-10 select-none'/>
                    <p>2.7 km/h</p>
                    <h6>Wind Speed</h6>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <img src={Pressure} alt='humidity icon' className='h-8 md:h-10 select-none'/>
                    <p>1100 hPa</p>
                    <h6>Pressure</h6>
                </div>

                <div className='flex flex-col gap-2 items-center'>
                    <img src={UV} alt='humidity icon' className='h-12 md:h-14 select-none'/>
                    <p>8</p>
                    <h6>UV</h6>
                </div>

            </div>
        </div>
    </div>
    <ForeCast/>
    </>
  )
}

export default Citytime