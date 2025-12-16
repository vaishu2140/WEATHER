import React from 'react'

const ForeCast = () => {
 const forecast=[
    {temperature:"20℃" ,day:"Friday", date:"12 Dec", icon:"🌤️" },
    {temperature:"22℃" ,day:"Saturday", date:"13 Dec", icon:"☀️" },
    {temperature:"19℃" ,day:"Sunday", date:"14 Dec", icon:"🌧️" },
    {temperature:"21℃" ,day:"Monday", date:"15 Dec", icon:"⛅" },
    {temperature:"18℃" ,day:"Tuesday", date:"16 Dec", icon:"🌥️" },
 ]

const hourlyForecast=[
    {time:'12:00', icon:"☀️", degree:'26℃', windSpeed:'3 km/h', },
    {time:'13:00', icon:"🌤️", degree:'27℃', windSpeed:'4 km/h', },
    {time:'14:00', icon:"⛅", degree:'28℃', windSpeed:'5 km/h', },
    {time:'15:00', icon:"🌥️", degree:'27℃', windSpeed:'4 km/h', },
    {time:'16:00', icon:"☁️", degree:'26℃', windSpeed:'3 km/h', },
]


  return (
    <div className='flex'>
        
        <div className='xl:w-96 w-full h-96 px-4 bg-[#050e1fde] shadow-2xl shadow-black md-4 mt-10 rounded-lg text-white'>
            <h2>5 Days ForeCast:</h2>
            {forecast.map((cast,index)=>(
                <div key={index} className='flex justify-between items-center flex-row p-2'>
                    <p>{cast.icon}</p>
                    <p className='Font-bold items-center'>{cast.temperature}</p>
                    <p className='font-bold'>{cast.da
                    </p>
                </div>
            ))}

        </div>
        <div className='flex-grow h-auto px-4 py-4 bg-[#050e1fde] shadow-2xl rounded-lg text-white m-4 mt-10 hidden lg:block'>
    <h1 className='text-2xl font-bold md-4 flex items-center justify-center'>Hourly ForeCast</h1>

    <div className='flex justify-around items-center gap-4 h-54 mt-14'>
        {hourlyForecast.map((hourCast, index) => (
            <div
                key={index} className='flex flex-col items-center bg-[#1c2938] gap-5 rounded-lg p-4 w-28 text-center shadow-md' >
                <p className='font-medium text-sm'>{hourCast.time}</p>
                <p>{hourCast.icon}</p>
                <p>{hourCast.degree}</p>
                <p>{hourCast.windSpeed}</p>
            </div>
        ))}
    </div>
</div>

    </div>
  )
}

export default ForeCast