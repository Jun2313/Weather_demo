import React, { useState, useEffect } from 'react';

const TopContainer = ({ data, advice, isLoading }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;  // Convert to 12-hour format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 60000); // Update time every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='top'>
      <div className='location'>
        <p>{data.name}</p>
        <p style={{ fontSize: "3rem"}}>{currentTime}</p>
      </div>
      <div className='temp'>
        {data.main ? <h1>{data.main.temp.toFixed()}℃</h1> : null}
      </div>
      <div className='description'>
        {data.weather ? <p>{data.weather[0].main}</p> : null}
      </div>
      <div>
      {isLoading && <div className="loader" style={{margin:'0 auto'}}></div>}
      <div className='advice-container'>
      <p>{advice}</p>
      </div>
      </div>
    </div>
  );
};

export default TopContainer;