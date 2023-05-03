import React, { useContext } from 'react';
import Context from '../contexts/Context';

function Form() {
  const { column, setColumn, columnOptions, comparison, setComparison, number,
    setNumber, filters, handleFilter, sortColumn, setSortColumn, setSort,
    handleSort, handleRemoveAll, handleSingleRemove } = useContext(Context);

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
            {
              columnOptions.map((option) => (
                <option key={ option } value={ option }>{option}</option>
              ))
            }
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
        <label>
          Ordenar:
          <select
            data-testid="column-sort"
            value={ sortColumn }
            onChange={ ({ target }) => setSortColumn(target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label>
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="sort"
            onChange={ ({ target }) => setSort(target.value) }
          />
        </label>
        <label>
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="sort"
            onChange={ ({ target }) => setSort(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          ORDENAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveAll }
        >
          Remover Filtros
        </button>
      </form>
      <div>
        {
          filters.length > 0 && (
            filters.map((filter, index) => (
              <div
                key={ index }
                data-testid="filter"
              >
                <p>
                  {
                    filter.column ? (
                      `${filter.column} ${filter.comparison} ${filter.number}`
                    ) : (
                      `${filter.sortColumn} ${filter.sort}`
                    )
                  }
                </p>
                <button
                  type="button"
                  onClick={ () => handleSingleRemove(filter.column) }
                >
                  Remover
                </button>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default Form;
