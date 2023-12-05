import React from 'react';

const Search = ({ location, setLocation, handleSearch }) => {
  return (
    <div className='search'>
      <div>
        <p className='bold' style={{fontSize: '30px', paddingBottom:'10%'}}>날씨 정보</p>
      </div>
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder='도시를 입력해주세요'
        type='text'
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default Search;