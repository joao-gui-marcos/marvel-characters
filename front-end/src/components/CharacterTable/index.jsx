import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";


function CharacterTable({ characters }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/characters/${id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="character-name-header">Personagem</th>
          <th className="character-series-header">Séries</th>
          <th className="character-events-header">Eventos</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => (
          <tr key={character.id} className="character-row" onClick={() => handleClick(character.id)}>
            <td>
              <div className="character-name">
                <img
                  src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
                  alt={character.name}
                  width="44px"
                />
                <p>{character.name}</p>
              </div>
            </td>
            <td>
              {character.series.available > 0 ? (
                <ul style={{ listStyleType: "none" }} className="character-series">
                  {character.series.items.slice(0, 3).map((series, index) => (
                    <li key={`${series.name}-${index}`}>{series.name}</li>
                  ))}
                </ul>
              ) : (
                <ul style={{ listStyleType: "none" }} className="character-series">
                  <li>Nenhuma série encontrada</li>
                </ul>
              )}
            </td>
            <td>
              {character.events.available > 0 ? (
                <ul style={{ listStyleType: "none" }} className="character-events">
                  {character.events.items.slice(0, 3).map((event, index) => (
                    <li key={`${event.name}-${index}`}>{event.name}</li>
                  ))}
                </ul>
              ) : (
                <ul style={{ listStyleType: "none" }} className="character-events">
                  <li>Nenhum evento encontrado</li>
                </ul>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CharacterTable;
