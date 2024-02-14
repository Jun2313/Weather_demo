import sunny from '../assets/weather/sunny.png';
import clearThenCloudy from '../assets/weather/clear_then_cloudy.png';
import lightning from '../assets/weather/lightning.png';
import snow from '../assets/weather/snow.png';
import cloudyWind from '../assets/weather/cloudy_wind.png';
import rain from '../assets/weather/rain.png';
import clouds from '../assets/weather/clouds.png';
// import rainAndWind from '../assets/weather/rain_and_wind.png';
// import mixSnowRain from '../assets/weather/mix_snow_rain.png';
// import moderateRain from '../assets/weather/moderate_rain.png';
// import r04d from '../assets/weather/r04d.png';
// import heavyRain from '../assets/weather/heavy_rain.png';
import drizzle from '../assets/weather/drizzle.png';
import thunderstorm from '../assets/weather/thunderstorm.png'
import mist from '../assets/weather/mist.png';
import haze from '../assets/weather/haze.png';

export const getWeatherImage = (weatherDescription) => {
  switch(weatherDescription.toLowerCase()) {
    case 'clear sky': return sunny;
    case 'few clouds': 
    case 'scattered clouds': 
    case 'broken clouds': return clearThenCloudy;
    case 'thunderstorm': 
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
    case 'thunderstorm with hail': return thunderstorm;
    case 'light drizzle':
    case 'drizzle':
    case 'heavy drizzle': return drizzle;
    case 'light rain': 
    case 'moderate rain': 
    case 'heavy rain': 
    case 'freezing rain':
    case 'light shower rain':
    case 'shower rain':
    case 'heavy shower rain': return rain;
    case 'light snow': 
    case 'snow': 
    case 'heavy snow':
    case 'mix snow/rain':
    case 'sleet':
    case 'heavy sleet':
    case 'snow shower':
    case 'heavy snow shower':
    case 'flurries': return snow;
    case 'mist': return mist;
    case 'smoke': 
    case 'haze': return haze;
    case 'sand/dust': 
    case 'fog': 
    case 'freezing fog': return cloudyWind;
    case 'overcast clouds': return clouds;

    default: return null;
  }
};