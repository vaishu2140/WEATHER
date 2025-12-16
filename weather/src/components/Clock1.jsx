import React, { use, useEffect, useState } from 'react'

const Clock1 = () => {
    const[currentTime, setCurrenTime] = useState(new Date())
   
    useEffect(() => {
        const timer=setInterval(() => {
            setCurrenTime(new Date())
        }, 1000)

        return ()=> clearInterval(timer)

    })


  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-4xl md:text-6xl font-bold'>{new Date().toLocaleTimeString()}</h1>
        <p className='text-sm md:text-md font-medium'>{new Date().toLocaleDateString()}</p>
        
    </div>
  )
}

export default Clock1