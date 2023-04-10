import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const charactersPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      let allCharacters = [];
      let offset = 0;
      let result;

      do {
        result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195&limit=100&offset=${offset}`
        );

        allCharacters = [...allCharacters, ...result.data.data.results];
        offset += 100;
      } while (result.data.data.count === 100);

      setCharacters(allCharacters);
      setFilteredCharacters(allCharacters);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    setFilteredCharacters(
      characters.filter(
        (character) =>
          character.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(startIndex, endIndex)
    );
  }, [currentPage, searchQuery, characters]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTotalPages = (totalCharacters) => {
    return Math.ceil(totalCharacters / charactersPerPage);
  };

  const renderPageNumbers = (totalPages) => {
    const pageNumbers = [];
    const maxPagesToShow = 6;

    // Calculate the range of page numbers to be displayed
    let startPage = currentPage;
    let endPage = Math.min(currentPage + maxPagesToShow - 1, totalPages);

    // If there are not enough pages after the current page, adjust the range
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = endPage - maxPagesToShow + 1;
      if (startPage < 1) startPage = 1;
    }

    // Add the page number buttons to the array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handleClick(i)}>
          {i}
        </button>
      );
    }

    // Add the first and last page buttons if they are not already included
    if (startPage > 1) {
      if (startPage > 2) {
        pageNumbers.unshift(
          <span key="ellipsis1">{"<<"}</span>
        );
      }
      pageNumbers.unshift(
        <button key="1" onClick={() => handleClick(1)}>
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2">{">>"}</span>
        );
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => handleClick(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      {filteredCharacters.length > 0 ? filteredCharacters.map((character) => (
        <div key={character.id}>{character.name}</div>
      )) : <p>Loading all characters... (this can take a while)</p>}
      <div>
        {searchQuery
          ? renderPageNumbers(getTotalPages(filteredCharacters.length))
          : renderPageNumbers(getTotalPages(characters.length))}
      </div>
    </div>
  );
}

export default App;
