import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { setNameFilterText, filters, getNumericFilters } = useContext(PlanetContext);
  const { filterByName: { name },
    filterByNumericValues: { column, comparison, value } } = filters;
  const [numericFilters, setNumericFilters] = useState({ column, comparison, value });

  const handleChange = ({ target }) => {
    setNumericFilters({ ...numericFilters, [target.name]: target.value });
  };

  const handleSubmit = () => {
    getNumericFilters(numericFilters);
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ value }
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
