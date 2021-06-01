export default function fetchCountries(searchQuery) {
  const API = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(API)
      .then(response => {return response.json()})
      .catch(error => {
      console.error('You must enter query parameters!',error);
      });
}