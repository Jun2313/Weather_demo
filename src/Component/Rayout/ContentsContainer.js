import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchWeatherbitForecastData } from '../Service/Handler/WeatherAPIHandler';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ContentsContainer = ({ city }) => { 
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (city) {
        const data = await fetchWeatherbitForecastData(city);
        if (data) {
          setWeatherData(data.data);
        }
      }
    };

    getWeatherData();
  }, [city]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='contentsContainer' style={{ padding: '5%' }}>
      {weatherData ? (
        <Slider {...settings}>
          {weatherData.map((day, index) => (
            <div key={index} className="weatherCard" style={{ marginRight: '20px', minWidth: '150px', textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
              <div><strong>{day.valid_date}</strong></div>
              <div style={{ fontSize: '20px', margin: '10px 0' }}>{day.temp}°C</div>
              <div>High: {day.max_temp}°C</div>
              <div>Low: {day.min_temp}°C</div>
              <div>{day.weather.description}</div>
            </div>
          ))}
        </Slider>
      ) : city ? (
        <p>Loading weather data...</p>
      ) : (
        <p>Enter a city name</p>
      )}
    </div>
  );
};

export default ContentsContainer;