import React, { useContext } from 'react';
import Mycontext from '../contexts/Mycontext';

function Form() {
  const { column, setColumn, comparison, setComparison, number,
    setNumber, handleFilter } = useContext(Mycontext);

  return (
    <div>
      <form>
        <label>
          Coluna:
          <select
            data-testid="column-filter"
            value={ column }
            onChange={ ({ target }) => setColumn(target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label>
          Operador:
          <select
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilter }
        >
          FILTRAR
        </button>
      </form>
    </div>
  );
}

export default Form;
