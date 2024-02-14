import sunny from '../assets/img/sunny.png';
import clearThenCloudy from '../assets/img/clear_then_cloudy.png';
import snow from '../assets/img/snow.png';
import cloudyWind from '../assets/img/cloudy_wind.png';
import rain from '../assets/img/rain.png';
import clouds from '../assets/img/clouds.png';
import drizzle from '../assets/img/drizzle.png';
import thunderstorm from '../assets/img/thunderstorm.png'
import mist from '../assets/img/mist.png';
import haze from '../assets/img/haze.png';

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