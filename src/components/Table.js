import React, { useContext } from 'react';
import Context from '../contexts/Context';

function Table() {
  const { apiData, inputText } = useContext(Context);
  const keys = apiData.length > 0 ? Object.keys(apiData[0]) : [];

  const apiDataFilteredByName = apiData.filter((data) => data.name.includes(inputText));

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              keys.map((key) => (
                <th key={ key }>{ key }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            apiDataFilteredByName.map((data) => (
              <tr key={ data.name }>
                <td data-testid="planet-name">{ data.name }</td>
                <td>{ data.rotation_period }</td>
                <td>{ data.orbital_period }</td>
                <td>{ data.diameter }</td>
                <td>{ data.climate }</td>
                <td>{ data.gravity }</td>
                <td>{ data.terrain }</td>
                <td>{ data.surface_water }</td>
                <td>{ data.population }</td>
                <td>{ data.films.map((film) => film) }</td>
                <td>{ data.created }</td>
                <td>{ data.edited }</td>
                <td>{ data.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
