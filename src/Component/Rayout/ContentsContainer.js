import React, { useRef, useEffect, useState } from 'react';
import { getWeatherImage } from '../weatherImages';

const ContentsContainer = ({ forecastData }) => {
  const scrollRef = useRef(null);
  const [scrollBarWidth, setScrollBarWidth] = useState('0%');
  const scrollSpeed = 2;

  const handleScroll = () => {
    const element = scrollRef.current;
    const scrollWidth = element.scrollWidth - element.clientWidth;
    const scrollLeft = element.scrollLeft;
    const width = (scrollLeft / scrollWidth) * 100;
    setScrollBarWidth(`${width}%`);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY * scrollSpeed;
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);



  return (
    <div>
    {forecastData.length > 0 && (
      <>
        <h2 style={{textAlign: 'center', padding: '5%'}}>일주일 기상예보</h2>
        <div className="scrollbar-container">
          <div className="custom-scrollbar" style={{ width: scrollBarWidth }}></div>
        </div>
      </>
    )}
    <div className='contentsContainer' ref={scrollRef}>
      {Array.isArray(forecastData) && forecastData.length > 0 ? (
        <div className='scroll'>
          {forecastData.map((day, index) => (
            <div key={index} className="weatherCard">
              <div><strong>{day.valid_date.substring(5)}</strong></div>

              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <img src={getWeatherImage(day.weather.description)} alt={day.weather.description} style={{ width: '150px', height: '150px' }} />
                <div style={{ fontSize: '40px', margin: '10px 0', display: 'flex'}}>{day.temp}°C</div>
              </div>
              <div>최고온도: {day.max_temp}°C</div>
              <div>최저온도: {day.min_temp}°C</div>
              </div>
              {/* <div>{day.weather.description}</div> */}
        </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
    </div>
  );
};

export default ContentsContainer;