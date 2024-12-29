import React from 'react'
import useWeather from '../context/Context'
import { useEffect } from 'react';

function Forecast() {
    const {api_key,forecastdata,setforecastdata,info}=useWeather()

    // console.log(api_key,forecastdata,setforecastdata)
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${info.name}&units=metric&appid=${api_key}`;
  useEffect(()=>{
    fetch(url)
    .then((res)=>res.json()).then((data)=>setforecastdata(data.list.filter((reading,index)=>index%8===0))).catch((err)=>{console.log(err);setforecastdata([])})


  },[info.name])

  console.log(forecastdata)
  console.log(info.name)







  return (
  
    forecastdata.length===0?<div className='m-4'>No forecast data available</div>:
    <div className="animate-zoom-in bg-white rounded-xl shadow-lg p-6 w-full max-w-md mt-4 m-2">
      <span className="text-xs font-semibold">current loaction</span>
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {forecastdata.map((day) => (
          <div key={day.dt_txt} className="text-center">
            <p className="text-sm text-gray-600">
              {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].main}
              className="w-10 h-10 mx-auto"
            />
            <p className="font-semibold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
 
); 
}

export default Forecast