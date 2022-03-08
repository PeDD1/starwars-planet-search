import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import './Table.css';

function Table() {
  const { data, isLoading, filteredPlanets } = useContext(PlanetContext);

  const PLANET_INFO_LENGTH = 13;

  return (
    <div>
      {!isLoading && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((element) => (
                <th key={ element }>
                  {element.replace('_', ' ')}
                </th>))}
            </tr>
          </thead>
          <tbody>
          {filteredPlanets.map((planetInfo, index) => (
              <tr key={ index }>
                <td key={ planetInfo.name } data-testid="planet-name">
                  {planetInfo.name}
                </td>
                {Object.values(planetInfo)
                  .slice(1, PLANET_INFO_LENGTH).map((info, indexInfo) => (
                    <td key={ indexInfo }>
                      {info}
                    </td>
                  ))}
              </tr>))}
          </tbody>
        </table>)}
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default Table;
