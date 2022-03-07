import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { data, isLoading, filteredPlanets } = useContext(PlanetContext);

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
                {Object.values(planetInfo).map((info, indexInfo) => (
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
