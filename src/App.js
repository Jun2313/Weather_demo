import React, { useState } from 'react';
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
  
      // 한글 도시명을 영문으로 번역
      const translatedCity = await translateCityName(location);
  
      // 현재 날씨 데이터 가져오기
      const weatherData = await fetchWeatherData(translatedCity);
      if (weatherData) {
        setData(weatherData);
        const openAIText = await generateTextWithOpenAI(weatherData, setIsLoading);
        typeText(openAIText, 50);
      }
  
      // 7일간의 날씨 예보 데이터 가져오기
      const forecast = await fetchWeatherbitForecastData(translatedCity);
      if (forecast && forecast.data) {
        setForecastData(forecast.data);
      } else {
        console.error("Forecast data not found");
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