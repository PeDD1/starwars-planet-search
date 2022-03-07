import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import PlanetContext from './PlanetContext';

function PlanetFinder({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByText, setFilterByText] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  async function fetchPlanetsList() {
    setIsLoading(true);
    const planetsData = await fetchPlanetsAPI();
    setData(planetsData);
    setFilteredPlanets(planetsData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlanetsList();
  }, []);

  useEffect(() => {
    const filtered = data.filter(({ name }) => name.includes(filterByText));
    setFilteredPlanets(filtered);
  }, [data, filterByText]);

  return (
    <PlanetContext.Provider
    value={
      { data, isLoading, filteredPlanets, filterByText, setFilterByText }
    }
  >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetFinder.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetFinder;
