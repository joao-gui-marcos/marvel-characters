import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marvelAPI from '../services/marvelAPI';
import EventCard from '../components/EventCard';

function CharacterDetails() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await marvelAPI.getCharacterDetails(id);
        setCharacterDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Character Details</h2>
      {characterDetails ? (
        <div>
          <p>ID: {id}</p>
          <h3>{characterDetails.name}</h3>
          <p>{characterDetails.description}</p>
          <img
            src={`${characterDetails.thumbnail?.path}.${characterDetails.thumbnail?.extension}`}
            alt={characterDetails.name}
          />
          <div>
            <h3>Events:</h3>
            {characterDetails.events?.items?.slice(0, 8).map((event, i) => (
              <div key={i}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading character details...</p>
      )}
    </div>
  );
}

export default CharacterDetails;
