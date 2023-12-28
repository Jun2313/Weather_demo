import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const DAY_KEY = process.env.REACT_APP_DAY_API_KEY;
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