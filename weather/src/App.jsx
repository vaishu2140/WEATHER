// import React from 'react'
// import Nav from './components/Nav'

// import Citytime from './components/Citytime'
// import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { useState } from 'react'





// const API_KEY = "960d1f7e4849e1d224de3dc082034e17";
// const App = () => {
  
//   const [cityName, setCityName] = useState('')
//   const [lat, setLat] = useState(null)
//   const [lon, setLon] = useState(null)
//   const [weather, setWeather] = useState(null);



//    // 🔍 Search by city
//   const fetchByCity = async (city) => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
//       );
//       const data = await res.json();
//       setWeather(data);
//     } catch (err) {
//       alert("City not found");
//     }
//   };

//   // 📍 Current location
//   const fetchByLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//         );
//         const data = await res.json();
//         setWeather(data);
//       },
//       () => {
//         alert("Please enable location access");
//       }
//     );
//   };




   
//   const handleCitSearch = (city) => {
//     setCityName(city)
//     setLat(null)
//     setLon(null)
//   }


//   const handleLocationFetch = (latitude, longitude) => {
//     setLat(latitude)
//     setLon(longitude)
//     setCityName('')
//   }
  
  
  
//   return (
//     <div className='container mx-auto'>
      
//      <ToastContainer/>
//      <div className='w-full h-full'>
      
//       <Nav
//         onSearch={fetchByCity}
//         onCurrentLocation={fetchByLocation}
//       />

//       {/* Pass weather to your UI components */}
//       {weather && (
//         <div className="text-white text-center">
         
//         </div>
//       )}
      

//         </div>
//       <div>
//       <Citytime cityName={cityName} lat={lat} lon={lon} setLat={setLat} setLon={setLon}/>
        
//       </div>




      
//     </div>
//   )
// }

// export default App


import React, { useState } from "react";
import Nav from "./components/Nav";
import Citytime from "./components/Citytime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // 🔍 Search by city
  const handleCitySearch = (city) => {
    setCityName(city);
    setLat(null);
    setLon(null);
  };

  // 📍 Current location
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setCityName("");
      },
      () => {
        alert("Please enable location access");
      }
    );
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />

      <Nav
        onSearch={handleCitySearch}
        onCurrentLocation={handleCurrentLocation}
      />

      <Citytime
        cityName={cityName}
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
      />
    </div>
  );
};

export default App;
