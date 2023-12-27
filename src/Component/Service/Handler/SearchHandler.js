import React from 'react';

// 도시/수도 입력 컴포넌트
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