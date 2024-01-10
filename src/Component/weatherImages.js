import sunny from '../assets/weather/sunny.png';
import clearThenCloudy from '../assets/weather/clear_then_cloudy.png';
import lightning from '../assets/weather/lightning.png';
import snow from '../assets/weather/snow.png';
import cloudyWind from '../assets/weather/cloudy_wind.png';
import rain from '../assets/weather/rain.png';
import rainAndWind from '../assets/weather/rain_and_wind.png';
import clouds from '../assets/weather/clouds.png';
import mixSnowRain from '../assets/weather/mix_snow_rain.png';
import moderateRain from '../assets/weather/moderate_rain.png';
// import defaultImage from '../assets/weather/default.png';

// Function to get the appropriate image based on weather description
export const getWeatherImage = (weatherDescription) => {
  switch(weatherDescription.toLowerCase()) {
    case 'clear sky': return sunny;
    case 'few clouds': 
    case 'partly cloudy': return clearThenCloudy;
    case 'thunderstorm': 
    case 'lightning': return lightning;
    case 'snow': 
    case 'light snow' :return snow;
    case 'cloudy': return cloudyWind;
    case 'rain': return rain;
    case 'rain and wind': return rainAndWind;
    case 'overcast clouds': 
    case 'scattered clouds': 
    case 'broken clouds': return clouds;
    case 'mix snow/rain':
    case 'right shower rain':
    case 'mixed snow and rain': return mixSnowRain;
    case 'moderate rain': return moderateRain;
    default: return null;
  }
};