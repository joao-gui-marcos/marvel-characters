import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import CharacterDetails from '../pages/CharacterDetails';
import marvelAPI from '../services/marvelAPI';
import EventCard from '../components/EventCard';

jest.mock('axios');

const character = [
  { id: 1, name: 'Iron Man', series: { available: 1, items: [{ name: 'Iron Man: Extremis' }] }, events: { available: 1, items: [{ name: 'Secret Wars', resourceURI: 'http://gateway.marvel.com/v1/public/events/116?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195' }] }, description: 'Billionaire industrialist Tony Stark.' },
];
const eventDetails = {
  name: 'Secret Wars',
  description: 'The Secret Wars is a series of nine limited series and a total of 157 issues published by Marvel Comics from 1984 to 1985.'
}

describe('App', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  test('renders character name and description', async () => {
    jest.spyOn(marvelAPI, 'getCharacterDetails').mockResolvedValueOnce(character[0]);

    render(
      <MemoryRouter initialEntries={[`/characters/${character[0].id}`]}>
        <Route path="/characters/:id">
          <CharacterDetails />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(character[0].name)).toBeInTheDocument();
    });

    expect(screen.getByText(character[0].name)).toBeInTheDocument();
    expect(screen.getByText(character[0].description)).toBeInTheDocument();
  });

  test('renders character events', async () => {
    const mockEvent = character[0].events.items[0];
    jest.spyOn(marvelAPI, 'getEvent').mockResolvedValueOnce(eventDetails);

    render(<EventCard event={mockEvent} />);

    expect(marvelAPI.getEvent).toHaveBeenCalledWith(mockEvent.resourceURI);

    await waitFor(() => {
      expect(screen.getByText(eventDetails.description)).toBeInTheDocument();
    });

    expect(screen.getByText(eventDetails.name)).toBeInTheDocument();
  });
})