import React, { useEffect, useState } from 'react';
import marvelAPI from '../services/marvelAPI';

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
    <div>
      <ul>
        <li >{event.name}</li>
        <li >{eventDetails.description}</li>
      </ul>
    </div>
  );
}

export default EventCard;
