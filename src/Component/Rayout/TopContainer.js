import React from 'react';
import { useState } from 'react';

const TopContainer = ({ data, advice, isLoading}) => {


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
      {isLoading && <div className="loader" style={{margin:'0 auto'}}></div>}
      <div className='advice-container'>
      <p>{advice}</p>
      </div>
      </div>
    </div>
  );
};

export default TopContainer;