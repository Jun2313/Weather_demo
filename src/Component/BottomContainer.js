import React from 'react';

const BottomContainer = ({ data }) => {
  return (
    <div className='bottom'>
      <div className='feels'>
        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}℉</p> : null}
        <p>체감온도</p>
      </div>
      <div className='humidity'>
        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
        <p>습도</p>
      </div>
      <div className='wind'>
        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
        <p>바람</p>
      </div>
    </div>
  );
};

export default BottomContainer;