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
        <h2 style={{textAlign: 'center', padding: '20px'}}>일주일 기상예보</h2>
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
              <div style={{fontSize: '30px'}}><strong>{day.valid_date.substring(5)}</strong></div>

              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <img src={getWeatherImage(day.weather.description)} alt={day.weather.description} style={{ width: '80px', height: '80px' }} />
                <div style={{ fontSize: '50px', margin: '10px 0', display: 'flex'}}>{day.temp}°</div>
              </div>
              <div style={{display: 'flex', width: '100%', justifyContent:'space-evenly'}}>
              <div>최고: {day.max_temp}°</div>
              <div>최저: {day.min_temp}°</div>
              </div>
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