import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import PlanetContext from './PlanetContext';

function PlanetFinder({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPlanetsList() {
    setIsLoading(true);
    const planetsData = await fetchPlanetsAPI();
    setData(planetsData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlanetsList();
  }, []);

  return (
    <PlanetContext.Provider value={ { data, isLoading } }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetFinder.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetFinder;
