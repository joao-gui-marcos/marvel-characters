import React from "react";

function CharacterTable({ characters }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Series</th>
          <th>Events</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => (
          <tr key={character.id}>
            <td>{character.name}</td>
            <td>
              {character.series.available > 0 ? (
                <ul style={{ listStyleType: "none" }}>
                  {character.series.items.slice(0, 3).map((series, index) => (
                    <li key={`${series.name}-${index}`}>{series.name}</li>
                  ))}
                </ul>
              ) : (
                <ul style={{ listStyleType: "none" }}>
                  <li>No series found</li>
                </ul>
              )}
            </td>
            <td>
              {character.events.available > 0 ? (
                <ul style={{ listStyleType: "none" }}>
                  {character.events.items.slice(0, 3).map((event, index) => (
                    <li key={`${event.name}-${index}`}>{event.name}</li>
                  ))}
                </ul>
              ) : (
                <ul style={{ listStyleType: "none" }}>
                  <li>No event found</li>
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
