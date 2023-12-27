import React, { useState } from 'react';
import axios from 'axios';
import Search from './Component/Search';
import TopContainer from './Component/Rayout/TopContainer';
import BottomContainer from './Component/Rayout/BottomContainer';
import ContentsContainer from './Component/Rayout/ContentsContainer';
import { translateCityName, generateTextWithOpenAI } from './Component/Service/Handler/GPTHandler'
import { fetchWeatherData, fetchWeatherbitForecastData  } from './Component/Service/Handler/WeatherAPIHandler';
import './App.css';

function App() {

  const [data, setData] = useState({}); 
  const [location, setLocation] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);

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
    if (event.key === 'Enter' && location) {
      setIsLoading(true);
      const translatedCity = await translateCityName(location);
  
      const weatherData = await fetchWeatherData(translatedCity);
      if (weatherData) {
        setData(weatherData);
        setAdvice('');
        const openAIText = await generateTextWithOpenAI(weatherData, setIsLoading);
        typeText(openAIText, 50);
      }
      const forecast = await fetchWeatherbitForecastData(translatedCity);
      if (forecast) {
        setForecastData(forecast);
      }
      setIsLoading(false);
      setLocation('');
    }
  };
  return (
    <div className='app'>
      <Search location={location} setLocation={setLocation} handleSearch={handleSearch} />
      <div className='container'>
        <TopContainer data={data} advice={advice} isLoading={isLoading} />
        {data.name != undefined && <BottomContainer data={data} />}
        <ContentsContainer city={location} forecastData={forecastData}  />
      </div>

    </div>
  );
}

export default App;