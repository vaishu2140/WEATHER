import React from 'react'
import Nav from './components/Nav'
import Form1 from './components/Form1'
import Citytime from './components/Citytime'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const App = () => {
  
  const [cityName, setCityName] = useState('')
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)


  const handleCitSearch = (city) => {
    setCityName(city)
    setLat(null)
    setLon(null)
  }


  const handleLocationFetch = (latitude, longitude) => {
    setLat(latitude)
    setLon(longitude)
    setCityName('')
  }
  
  
  
  return (
    <div className='container mx-auto'>
      
     <ToastContainer/>
     <div className='w-full h-full'>
      
      <Nav onCitySearch={handleCitSearch} onLocationFetch={handleLocationFetch}/>

      
      </div> 
      
      
      <Citytime cityName={cityName} lat={lat} lon={lon} setLat={setLat} setLon={setLon}/>
        
      
    </div>
  )
}

export default App