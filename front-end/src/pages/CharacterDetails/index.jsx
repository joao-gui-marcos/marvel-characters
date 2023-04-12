import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marvelAPI from '../../services/marvelAPI';
import EventCard from '../../components/EventCard';
import "./styles.css";

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
      {characterDetails ? (
        <div>
          <div className='character-details-header'>
            <img
              src={`${characterDetails.thumbnail?.path}.${characterDetails.thumbnail?.extension}`}
              alt={characterDetails.name}
              width="300px"
            />
            <span>
              <h3>{characterDetails.name}</h3>
              <p>{characterDetails.description}</p>
            </span>
          </div>
          <div>
            <h3 className='events-header'>Eventos</h3>
            {characterDetails.events?.items?.map((event, i) => (
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
