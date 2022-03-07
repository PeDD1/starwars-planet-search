import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { setNameFilterText, filters, getNumericFilters } = useContext(PlanetContext);
  const { filterByName: { name } } = filters;
  const [numericFilters, setNumericFilters] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const handleChange = ({ target }) => {
    setNumericFilters({ ...numericFilters, [target.name]: target.value });
  };

  const handleSubmit = () => {
    getNumericFilters(numericFilters);
  };

  const filterColumnList = () => {
    const columnOptions = (
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    let removedUsedFilter = '';
    filters.filterByNumericValues.forEach(({ column }) => {
      removedUsedFilter = columnOptions.filter((option) => option !== column);
    });
    return removedUsedFilter.map((option) => (
      <option key={ option } value={ option }>{option}</option>));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por Nome"
        data-testid="name-filter"
        value={ name }
        onChange={ (ev) => setNameFilterText(ev.target) }
      />
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        {filterColumnList()}
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ numericFilters.value }
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
      />
      <button
        type="button"
        onClick={ handleSubmit }
        data-testid="button-filter"
      >
        Adicionar Filtro
      </button>
    </div>
  );
}

export default Header;
