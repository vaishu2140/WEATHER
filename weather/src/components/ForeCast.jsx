import { useEffect, useState } from "react";

const API_KEY = "960d1f7e4849e1d224de3dc082034e17"; // 🔴 replace
const CITY = "Pune";

const ForeCast = () => {
  const [hourly, setHourly] = useState([]);
  const [fiveDays, setFiveDays] = useState([]);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      // ✅ Hourly forecast (next 8 records = 24 hours)
      setHourly(data.list.slice(0, 8));

      // ✅ 5-day forecast (one entry per day)
      const dailyData = [];
      const dates = new Set();

      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dates.has(date) && dailyData.length < 5) {
          dates.add(date);
          dailyData.push(item);
        }
      });

      setFiveDays(dailyData);
    } catch (error) {
      console.error("Forecast error:", error);
    }
  };

  return (
  <div className="flex gap-4 mt-10">

  {/* 🔹 5 DAYS FORECAST (LEFT - 50%) */}
  <div className="w-1/2 h-96 px-4 bg-[#050e1fde] shadow-2xl rounded-lg text-white ">

    <h2 className="text-xl mb-4 text-center font-semibold">
      5 Days Forecast
    </h2>

    <ul >
      {fiveDays.map((day, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-[#0b1b35] p-3 rounded-md"
        >
          <p className="text-sm">
            {new Date(day.dt_txt).toDateString()}
          </p>

          <img
            className="w-10"
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="icon"
          />

          <p>{Math.round(day.main.temp)}°C</p>

          <p className="capitalize text-sm">
            {day.weather[0].description}
          </p>
        </li>
      ))}
    </ul>

  </div>


  {/* 🔹 HOURLY FORECAST (RIGHT - 50%) */}
  <div className="w-1/2 h-96 px-4 py-4 bg-[#050e1fde] shadow-2xl rounded-lg text-white hidden lg:block">

    <h1 className="text-2xl font-bold flex justify-center mb-6">
      Hourly Forecast
    </h1>

    <ul className="flex justify-between items-center gap-4">
      {hourly.slice(0, 5).map((hour, index) => (
        <li
          key={index}
          className="bg-[#0b1c3d] p-4 rounded-lg text-center w-1/5"
        >
          <p>{hour.dt_txt.split(" ")[1]}</p>

          <img
            className="mx-auto"
            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
            alt="icon"
          />

          <p>{Math.round(hour.main.temp)}°C</p>
          <p>{hour.wind.speed} km/h</p>
        </li>
      ))}
      
    </ul>

  </div>

</div>
  );
};

export default ForeCast;
