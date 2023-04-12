import React, { useState, useEffect } from 'react';
import marvelAPI from '../services/marvelAPI';
import CharacterTable from '../components/CharacterTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const charactersPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const allCharacters = await marvelAPI.getCharacters();
        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    setFilteredCharacters(
      characters.filter(
        (character) =>
          character.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        .slice(startIndex, endIndex)
    );
  }, [currentPage, searchQuery, characters]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTotalPages = (totalCharacters) => {
    return Math.ceil(totalCharacters / charactersPerPage);
  };

  return (
    <div>

      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {filteredCharacters.length > 0 ? (
        <CharacterTable characters={filteredCharacters} />
      ) : (
        <p>Loading characters...</p>
      )
      }
      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages(
          characters.filter((character) =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).length
        )}
        onPageChange={handlePageChange}
      />
    </div >
  );
}

export default Characters;
