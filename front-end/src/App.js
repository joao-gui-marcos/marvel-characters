import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195&offset=${(currentPage - 1) * 20}`
        );
        setCharacters(result.data.data.results);
      }
      if (searchQuery) {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195&offset=${(currentPage - 1) * 20}&nameStartsWith=${searchQuery}`
        );
        setCharacters(result.data.data.results);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      {characters.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
}

export default App;
