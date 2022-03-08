import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import logo from '../pictures/logo.png';
import './Header.css';


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
    <main className="main-header">
      <img className="logo" alt="StarWars Logo" src={logo} />
      <div className='filter-container'>
        <div className='filter-form'>
          <input
            className="filter-by-name"
            type="text"
            placeholder="Filtrar por Nome"
            data-testid="name-filter"
            value={ name }
            onChange={ (ev) => setNameFilterText(ev.target) }
            />
          <div className="filter-details">
            <div className="filter-by-number">
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
            </div>
            <div className="filter-sort">
              <select data-testid="column-sort" name="sort" onChange={ handleChangeColumnSort }>
                {!isLoading && Object.keys(data[0]).map((element) => (
                  <option key={ element } name="column" value={ element }>
                    {element}
                  </option>))}
              </select>
              <label htmlFor="ASC" className="column-sort-radio">
                <input
                  type="radio"
                  value="ASC"
                  name="order"
                  id="ASC"
                  onChange={ handleCheck }
                  checked={ sortOrderList.sort === 'ASC' }
                  data-testid="column-sort-input-asc"
                />
                ASC
              </label> 
              <label htmlFor="DESC" className="column-sort-radio">
                <input
                  type="radio"
                  value="DESC"
                  name="order"
                  id="DESC"
                  onChange={ handleCheck }
                  data-testid="column-sort-input-desc"
                  checked={ sortOrderList.sort === 'DESC' }
                />
                  DESC
              </label>
              <button
                type="button"
                data-testid="column-sort-button"
                onClick={ handleSubmitOrder }
              >
                Ordenar
              </button>
            </div>
          </div>
        </div>
        {activeFilter()}
      </div>  
    </main>
  );
}

export default Header;
