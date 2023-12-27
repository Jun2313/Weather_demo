import axios from 'axios';

const API_KEY = "6c3b8ec558e36f8f98599f6070da6a43";
const DAY_KEY = "a5c441ac7b8f46b795f4bfaac4cc755c";
// 날씨 데이터를 가져오는 함수
export const fetchWeatherData = async (city) => {
  const cleanCity = city.replace(/['"]+/g, '').trim();

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(weatherUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchWeatherbitForecastData = async (city) => {
  const cleanCity = city.replace(/['"]+/g, '').trim();
  const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cleanCity}&country=KR&days=7&key=${DAY_KEY}`;

  try {
    const response = await axios.get(forecastUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Weatherbit forecast data:", error);
    return null;
  }
};