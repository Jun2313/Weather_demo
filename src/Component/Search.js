import React from 'react';

const Search = ({ location, setLocation, searchLocation }) => {
  return (
    <div className='search'>
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder='도시를 입력해주세요'
        type='text'
        onKeyDown={searchLocation}
      />
    </div>
  );
};

export default Search;