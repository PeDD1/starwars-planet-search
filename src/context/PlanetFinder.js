import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import PlanetContext from './PlanetContext';

function PlanetFinder({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: 0 }],
  });

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

  const setNameFilterText = ({ value }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const getNumericFilters = (value) => {
    setFilters(
      { ...filters, filterByNumericValues: [...filters.filterByNumericValues, value] },
    );
  };

  useEffect(() => {
    const filtered = data.filter(({ name }) => name.includes(filters.filterByName.name));
    setFilteredPlanets(filtered);
  }, [filters, data]);

  useEffect(() => {
    let filteredByNumbers = '';
    const { column, comparison, value } = filters
      .filterByNumericValues[filters.filterByNumericValues.length - 1];
    switch (comparison) {
    case 'maior que':
      filteredByNumbers = data.filter((item) => (
        parseInt(item[column], 10) > parseInt(value, 10)));
   break;
    case 'menor que':
      filteredByNumbers = data.filter((item) => (
        parseInt(item[column], 10) < parseInt(value, 10)));
    break;
    case 'igual a':
      filteredByNumbers = data.filter((item) => (
        parseInt(item[column], 10) === parseInt(value, 10)));
    break;
    case '':
      break;
    default:
      break;
    }
    setFilteredPlanets(filteredByNumbers);
  }, [filters.filterByNumericValues]);

  const contextValue = {
    data, isLoading, filteredPlanets, setNameFilterText, getNumericFilters, filters
  };
  
  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetFinder.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetFinder;
