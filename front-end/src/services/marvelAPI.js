import axios from 'axios';

const baseUrl = 'https://gateway.marvel.com/v1/public';

const getCharacters = async () => {
  let allCharacters = [];
  let offset = 0;
  let result;

  do {
    result = await axios(
      `${baseUrl}/characters?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195&limit=100&offset=${offset}`
    );

    allCharacters = [...allCharacters, ...result.data.data.results];
    offset += 100;
  } while (result.data.data.count === 100);

  return allCharacters;
};

const getCharacterDetails = async (id) => {
  const result = await axios(
    `${baseUrl}/characters/${id}?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195`
  );

  return result.data.data.results[0];
};

const getEvent = async (resourceURI) => {
  const result = await axios(
    `${resourceURI}?ts=1&apikey=ff198be091622941d273cd1f676a8e66&hash=6b16ba20069637abb2460950c320d195`
  );

  return result.data.data.results[0];
};


const marvelAPI = {
  getCharacters,
  getCharacterDetails,
  getEvent,
};

export default marvelAPI;
