import axios from "axios";
import React, {Fragment, useState} from "react";

const api = {
  key: "206fb199955bf1e7e3b44dfe922f97d8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      let {data} = await axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
      setWeather(data);
      setQuery('');
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
      {(typeof weather.name != "undefined" ? (
        <Fragment>
        <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{weather.main.temp}°c</div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
        </Fragment>
      ) : '')} 
    
      </main>
      <footer>© All Rights Reserved To Abdullah Taha</footer>
    </div>
  );
}

export default App;
