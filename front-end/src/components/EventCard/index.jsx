import React, { useEffect, useState } from 'react';
import marvelAPI from '../../services/marvelAPI';
import "./styles.css";

function EventCard({ event }) {
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await marvelAPI.getEvent(event.resourceURI);
        setEventDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='event-container'>
      <ul className='event-card'>
        <img
          className='event-img'
          src={`${eventDetails.thumbnail?.path}.${eventDetails.thumbnail?.extension}`}
          alt={eventDetails.name}
          width="268px"
          height="265px"
        />
        <p className='event-name'>{event.name}</p>
        <p className='event-description'>{eventDetails.description}</p>
      </ul>
    </div>
  );
}

export default EventCard;
