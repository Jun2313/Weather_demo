import React from 'react';

const SearchHandler = ({ location, setLocation, handleSearch }) => {
  return (
    <div>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Enter city name"
      />
    </div>
  );
};

export default SearchHandler;