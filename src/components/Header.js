import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const {
    setNameFilterText,
    filters,
    getNumericFilters,
    getSortOrder,
    removeFilter,
    data,
    isLoading,
  } = useContext(PlanetContext);
  const { filterByName: { name } } = filters;
  const [numericFilters, setNumericFilters] = useState({ value: 0 });

  const options = (
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const [columnOptions, setColumsOptions] = useState(options);
  const [sortOrderList, setSortOrderList] = useState({ column: 'name', sort: 'ASC' });

  useEffect(() => {
    setNumericFilters({ column: columnOptions[0], comparison: 'maior que', value: 0 });
  }, [columnOptions]);

  const handleChange = ({ target }) => {
    setNumericFilters({ ...numericFilters, [target.name]: target.value });
  };

  const handleSubmit = () => {
    getNumericFilters(numericFilters);
    setColumsOptions(columnOptions.filter((option) => option !== numericFilters.column));
  };

   const handleSubmitOrder = () => {
    getSortOrder(sortOrderList);
  };

  const handleClick = (ev) => {
    const { filterByNumericValues } = filters;
    const columnFilter = (ev.target.parentElement.innerHTML.split(' ')[0]);
    const newFilters = filterByNumericValues
      .filter(({ column }) => column !== columnFilter);
    setColumsOptions(columnOptions.concat(columnFilter));
    removeFilter(newFilters);
  };
  
  const handleChangeColumnSort = ({ target }) => {
    setSortOrderList({ ...sortOrderList, column: target.value });
  };

  const handleCheck = ({ target: { value } }) => {
    setSortOrderList({ ...sortOrderList, sort: value });
  };

  const filterColumnList = () => columnOptions.map((option) => (
    <option key={ option } value={ option }>{option}</option>));

  const activeFilter = () => (
    <ul>
      { filters.filterByNumericValues.map(({ column, comparison, value }, index) => (
        <li key={ index } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button type="button" onClick={ handleClick }>X</button>
        </li>
      )) }
    </ul>
  );

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
        <option selected value="maior que">maior que</option>
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
      <select data-testid="column-sort" name="sort" onChange={ handleChangeColumnSort }>
        {!isLoading && Object.keys(data[0]).map((element) => (
          <option key={ element } name="column" value={ element }>
            {element}
          </option>))}
      </select>
      <div onChange={ handleCheck }>
        <input
          type="radio"
          value="ASC"
          name="order"
          checked={ sortOrderList.sort === 'ASC' }
          data-testid="column-sort-input-asc"
          // onChange={ handleCheck }
        />
        ASC
        <input
          type="radio"
          value="DESC"
          name="order"
          data-testid="column-sort-input-desc"
          checked={ sortOrderList.sort === 'DESC' }
        />
        DESC
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSubmitOrder }
      >
        Ordenar
      </button>
      {activeFilter()}
    </div>
  );
}

export default Header;
