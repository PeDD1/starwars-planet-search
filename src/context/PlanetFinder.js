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
    order: { column: 'name', sort: 'ASC' },
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

  const getSortOrder = (order) => {
    setFilters({ ...filters, order });
  };
  
  const removeFilter = (newFilter) => {
    setFilters({ ...filters, filterByNumericValues: newFilter });
  };

  useEffect(() => {
    const filtered = data
      .filter(({ name }) => name.includes(filters.filterByName.name));
    setFilteredPlanets(filtered);
  }, [filters.filterByName, data]);

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

  const switchForText = () => {
    const { sort, column } = filters.order;
    const NEGATIVE_INDEX = -1;
    let sorted = '';
    switch (sort) {
    case 'ASC':
      sorted = filteredPlanets.sort((a, b) => {
        if (a[column] > b[column]) return 1;
        if (b[column] > a[column]) return NEGATIVE_INDEX;
        return 0;
      });
      break;
    case 'DESC':
      sorted = filteredPlanets.sort((a, b) => {
        if (a[column] > b[column]) return NEGATIVE_INDEX;
        if (b[column] > a[column]) return 1;
        return 0;
      });
      break;
    default:
      break;
    }
    return sorted;
  };

  const switchForNumber = () => {
    const { sort, column } = filters.order;
    const NEGATIVE_INDEX = -1;
    let sorted = '';
    switch (sort) {
    case 'ASC':
      sorted = filteredPlanets.sort((a, b) => {
        if (parseInt(a[column], 10) > parseInt(b[column], 10)) return 1;
        if (parseInt(b[column], 10) > parseInt(a[column], 10)) return NEGATIVE_INDEX;
        return 0;
      });
      break;
    case 'DESC':
      sorted = filteredPlanets.sort((a, b) => {
        if (parseInt(a[column], 10) > parseInt(b[column], 10)) return NEGATIVE_INDEX;
        if (parseInt(b[column], 10) > parseInt(a[column], 10)) return 1;
        return 0;
      });
      break;
    default:
      break;
    }
    return sorted;
  };

  useEffect(() => {
    const { order } = filters;
    const { column } = order;
    let sorted = '';
    if (isLoading) setFilteredPlanets(filteredPlanets);
    if (!isLoading) {
      sorted = (!Number.isNaN(parseInt(filteredPlanets[0][column], 10))
        ? switchForNumber()
        : switchForText());
      setFilteredPlanets(sorted);
    }
    setFilters({ ...filters });
  }, [filters.order, filteredPlanets]);

  const contextValue = {
    data,
    isLoading,
    filteredPlanets,
    setNameFilterText,
    getNumericFilters,
    getSortOrder,
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
