import React from 'react';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={onSearchChange}
      placeholder='Search characters...'
    />
  );
}

export default SearchBar;
