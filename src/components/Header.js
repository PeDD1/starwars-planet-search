import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filterByText, setFilterByText } = useContext(PlanetContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por Nome"
        data-testid="name-filter"
        value={ filterByText }
        onChange={ ({ target: { value } }) => setFilterByText(value) }
      />
    </div>
  );
}

export default Header;
