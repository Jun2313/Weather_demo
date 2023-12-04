import React, { useState } from 'react';
import axios from 'axios';
import Search from './Component/Search';
import TopContainer from './Component/TopContainer';
import BottomContainer from './Component/BottomContainer';
import './App.css';

function App() {

  const API_KEY = "6c3b8ec558e36f8f98599f6070da6a43";

  const [data, setData] = useState({}); 
  const [location, setLocation] = useState('');

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;
  // const openAIKey = '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';

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&lang=kr&appid=${API_KEY}`;
      axios.get(weatherUrl)
        .then((response) => {
          setData(response.data);
          console.log("Weather Data:", response.data);
        })
        .catch(error => {
          console.error("Weather API error:", error);
        });
      
      setLocation('');
    }
  };
  
  return (
    <div className='app'>
      <Search location={location} setLocation={setLocation} searchLocation={searchLocation} />
      <div className='container'>
        <TopContainer data={data} />
        {data.name != undefined && <BottomContainer data={data} />}
      </div>
    </div>
  );
}

export default App;