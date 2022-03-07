const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsAPI = async () => {
  const request = await fetch(END_POINT);
  const response = await request.json();
  const { results } = response;
  results.map((planet) => delete planet.residents);
  return results;
};

export default fetchPlanetsAPI;
