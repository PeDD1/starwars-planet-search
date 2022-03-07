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
    filterByNumericValues: [],
  });

  async function fetchPlanetsList() {
    setIsLoading(true);
    const planetsData = await fetchPlanetsAPI();
    setFilteredPlanets(planetsData);
    setData(planetsData);
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

  const removeFilter = (newFilter) => {
    setFilters({ ...filters, filterByNumericValues: newFilter });
  };

  useEffect(() => {
    const filtered = data
      .filter(({ name }) => name.includes(filters.filterByName.name));
    setFilteredPlanets(filtered);
  }, [filters, data]);

  useEffect(() => {
    let filteredByNumbers = '';
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length === 0) {
      setFilteredPlanets(data);
    } else {
      const { column, comparison, value } = (
        filterByNumericValues[filterByNumericValues.length - 1]);

      switch (comparison) {
      case 'maior que': filteredByNumbers = filteredPlanets.filter(
        (item) => (parseInt(item[column], 10) > parseInt(value, 10)),
      );
        break;
      case 'menor que': filteredByNumbers = filteredPlanets.filter(
        (item) => (parseInt(item[column], 10) < parseInt(value, 10)),
      );
        break;
      case 'igual a': filteredByNumbers = filteredPlanets.filter(
        (item) => (parseInt(item[column], 10) === parseInt(value, 10)),
      );
        break;
      default:
        break;
      }
      setFilteredPlanets(filteredByNumbers);
    }
  }, [filters.filterByNumericValues]);

  const contextValue = {
    data,
    isLoading,
    filteredPlanets,
    setNameFilterText,
    getNumericFilters,
    filters,
    removeFilter,
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
