import React from 'react';
import './styles.css';
import { FaSearch } from 'react-icons/fa';


function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <h2>Busca de Personagens</h2>
      <h3>Nome do personagem</h3>
      <div className="input-wrapper">

        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder='Buscar'
        />
        <FaSearch className="search-icon" size={20} />
      </div>
    </div>
  );
}

export default SearchBar;
