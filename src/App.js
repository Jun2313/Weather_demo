import React, { useState } from 'react';
import axios from 'axios';
import Search from './Component/Search';
import TopContainer from './Component/TopContainer';
import BottomContainer from './Component/BottomContainer';
import './App.css';

const OPENAI_API_KEY = "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";

function App() {
  const OPENAI_API_KEY = "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";
  const API_KEY = "6c3b8ec558e36f8f98599f6070da6a43";

  const [data, setData] = useState({}); 
  const [location, setLocation] = useState('');
  const [advice, setAdvice] = useState('');

  const typeText = (text, delay = 50) => {
    setAdvice('');
    text.split('').forEach((char, index) => {
      setTimeout(() => {
        setAdvice((prev) => prev + char);
      }, index * delay);
    });
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      const weatherData = await fetchWeatherData(location);
      if (weatherData) {
        setData(weatherData);
        const openAIText = await generateTextWithOpenAI(weatherData);
        typeText(openAIText, 50);
        setAdvice(openAIText);
      }
      setLocation('');
    }
  };

  const fetchWeatherData = async (location) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    try {
      const response = await axios.get(weatherUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };
  
  const generateTextWithOpenAI = async (weatherData) => {
    const prompt = `Given today's weather in ${weatherData.name} with a temperature of ${weatherData.main.temp}°C and ${weatherData.weather[0].description}, how should one dress?`;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "당신은 친절한 인공지능 챗봇입니다. 입력에 대해 한글로 변역해서 2줄로 짧고 간결하고 친절하게 대답해주세요" },
                      { role: "user", content: prompt }],
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Rate limit exceeded:", error.response.data);
        return "Rate limit exceeded, please try again later.";
      } else {
        console.error("Error with OpenAI API:", error);
        return "An error occurred, please try again later.";
      }
    }
  };

  return (
    <div className='app'>
      <Search location={location} setLocation={setLocation} handleSearch={handleSearch} />
      <div className='container'>
        <TopContainer data={data} advice={advice} />
        {data.name != undefined && <BottomContainer data={data} />}
      </div>
    </div>
  );
}

export default App;