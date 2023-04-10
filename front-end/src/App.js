import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195`
      );

      setCharacters(result.data.data.results);
    };

    fetchData();
  }, []);

  return (
    <div>
      {characters.length > 0 && characters.map(character => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
}

export default App;
