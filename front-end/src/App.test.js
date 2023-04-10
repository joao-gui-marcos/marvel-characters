import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const characters = [
  { id: 1, name: 'Spider-Man', series: { available: 3, items: [{ name: 'The Amazing Spider-Man' }, { name: 'Ultimate Spider-Man' }, { name: 'Spider-Man: Blue' }] }, events: { available: 2, items: [{ name: 'Spider-Verse' }, { name: 'Civil War' }] } },
  { id: 2, name: 'Iron Man', series: { available: 1, items: [{ name: 'Iron Man: Extremis' }] }, events: { available: 1, items: [{ name: 'Iron Man To The Rescue' }] } },
  { id: 3, name: 'Captain America', series: { available: 2, items: [{ name: 'Captain America: Winter Soldier' }, { name: 'Captain America: The Chosen' }] }, events: { available: 1, items: [{ name: 'Avengers vs. X-Men' }] } },
  { id: 4, name: 'Hulk', series: { available: 1, items: [{ name: 'Hulk: Planet Hulk' }] }, events: { available: 1, items: [{ name: 'World War Hulk' }] } },
  { id: 5, name: 'Thor', series: { available: 1, items: [{ name: 'Thor: God of Thunder' }] }, events: { available: 1, items: [{ name: 'Original Sin' }] } },
  { id: 6, name: 'Black Widow', series: { available: 1, items: [{ name: 'Black Widow: The Name of the Rose' }] }, events: { available: 1, items: [{ name: 'Black Widow: The Name of the Rose and Beyond' }] } },
  { id: 7, name: 'Doctor Strange', series: { available: 1, items: [{ name: 'Doctor Strange: The Oath' }] }, events: { available: 1, items: [{ name: 'Doctor Strange and the Sorcerers Supreme' }] } },
  { id: 8, name: 'Wolverine', series: { available: 2, items: [{ name: 'Wolverine: Old Man Logan' }, { name: 'Wolverine: Enemy of the State' }] }, events: { available: 1, items: [{ name: 'Messiah CompleX' }] } },
];


describe('App', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  test('renders search input and character list', async () => {
    axios.mockResolvedValueOnce({ data: { data: { results: characters, count: 8 } } });

    render(<App />);

    // Wait for the loading message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading all characters... (this can take a while)')).not.toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();


    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    characters.forEach(character => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByText(character.series.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(character.events.items[0].name)).toBeInTheDocument();
    });

  });

  test('searches for characters based on name', async () => {
    axios.mockResolvedValueOnce({ data: { data: { results: characters, count: 8 } } });

    render(<App />);

    // Wait for characters to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText(characters[0].name)).toBeInTheDocument();
    });

    // Search for characters by name
    fireEvent.change(screen.getByPlaceholderText('Search characters...'), { target: { value: 'spider' } });

    // Check that the correct characters are displayed
    expect(screen.getByText(characters[0].name)).toBeInTheDocument();
    expect(screen.queryByText(characters[1].name)).not.toBeInTheDocument();
    expect(screen.queryByText(characters[2].name)).not.toBeInTheDocument();

    // Clear the search query
    fireEvent.change(screen.getByPlaceholderText('Search characters...'), { target: { value: '' } });

    // Check that all characters are displayed again
    expect(screen.getByText(characters[0].name)).toBeInTheDocument();
    expect(screen.getByText(characters[1].name)).toBeInTheDocument();
    expect(screen.getByText(characters[2].name)).toBeInTheDocument();
  });

  test('should update the table when paging', async () => {
    axios.mockResolvedValueOnce({ data: { data: { results: characters, count: 8 } } });
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText('Loading all characters... (this can take a while)')).not.toBeInTheDocument();
    });
    const page2Button = await screen.findByText('2');
    fireEvent.click(page2Button);

    const table = await screen.findByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows.length).toBe(2); // Header row + 1 character row (page 2)

    const characterName = characters[7].name; // 2nd character on page 2
    const characterRow = rows[1];
    expect(within(characterRow).getByText(characterName)).toBeInTheDocument();

    // Click on page 3 button (shouldn't exist in this case)
    const page3Button = screen.queryByText('3');
    expect(page3Button).not.toBeInTheDocument();

    // Check that table still has only 2 page of results
    expect(rows.length).toBe(2); // Header row + 3 character rows

    const page1Button = await screen.findByText('1');
    fireEvent.click(page1Button);

    const newTable = await screen.findByRole('table');
    const newRows = within(newTable).getAllByRole('row');
    expect(newRows.length).toBe(8); // Header row + 1 character row (page 1)

    const newCharacterName = characters[0].name; // 1st character on page 1
    const newCharacterRow = newRows[1];
    expect(within(newCharacterRow).getByText(newCharacterName)).toBeInTheDocument();
  });
})