import React, { useState } from 'react';
import axios from 'axios';
import Search from './Component/Search';
import TopContainer from './Component/TopContainer';
import BottomContainer from './Component/BottomContainer';
import { translateCityName, generateTextWithOpenAI } from './Component/Service/GPTHandler'
import { fetchWeatherData } from './Component/Service/WeatherAPIHandler';
import './App.css';

function App() {

  const [data, setData] = useState({}); 
  const [location, setLocation] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const typeText = (text, delay = 50) => {
    let currentText = '';
    text.split('').forEach((char, index) => {
      setTimeout(() => {
        currentText += char;
        setAdvice(currentText);
      }, index * delay);
    });
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      const translatedCity = await translateCityName(location);
  
      const weatherData = await fetchWeatherData(translatedCity);
      if (weatherData) {
        setData(weatherData);
        setAdvice('');
        const openAIText = await generateTextWithOpenAI(weatherData, setIsLoading);
        typeText(openAIText, 50);
      }
      setLocation('');
    }
  };

  return (
    <div className='app'>
      <Search location={location} setLocation={setLocation} handleSearch={handleSearch} />
      <div className='container'>
        <TopContainer data={data} advice={advice} isLoading={isLoading} />
        {data.name != undefined && <BottomContainer data={data} />}
      </div>
    </div>
  );
}

export default App;