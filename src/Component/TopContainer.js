import React from 'react';

const TopContainer = ({ data, advice }) => {
  return (
    <div className='top'>
      <div className='location'>
        <p>{data.name}</p>
      </div>
      <div className='temp'>
        {data.main ? <h1>{data.main.temp.toFixed()}℃</h1> : null}
      </div>
      <div className='description'>
        {data.weather ? <p>{data.weather[0].main}</p> : null}
      </div>
      <div>
      <p>{advice}</p>
      </div>
    </div>
  );
};

export default TopContainer;