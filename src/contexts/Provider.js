import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Context from './Context';

const columns = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function Provider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [initialApiData, setInitialApiData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [column, setColumn] = useState('population');
  const [columnOptions, setColumnOptions] = useState(columns);
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [sortColumn, setSortColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        const dataWithoutResidents = results.map((result) => {
          delete result.residents;
          return result;
        });
        setApiData(dataWithoutResidents);
        setInitialApiData(dataWithoutResidents);
      });
  }, []);

  const handleFilter = useCallback(() => {
    // const newColumns = columnOptions.filter((col) => col !== column);
    // setColumnOptions(newColumns);
    // apiData.filter((data) => {
    //   let filtered;
    //   if (comparison === 'maior que') {
    //     filtered = Number(data[column] > number);
    //   } else if (comparison === 'menor que') {
    //     Number(data[column] < number);
    //   } else if (comparison === 'igual a') {
    //     data[column] === number;
    //   }
    //   return filtered;
    // });
    // setApiData(filtered);
    if (comparison === 'maior que') {
      const filtered = apiData.filter((data) => Number(data[column]) > number);
      setApiData(filtered);
      setFilters([...filters, { column, comparison, number }]);
      const newColumns = columnOptions.filter((col) => col !== column);
      setColumnOptions(newColumns);
      setColumn(newColumns[0]);
    } else if (comparison === 'menor que') {
      const filtered = apiData.filter((data) => Number(data[column]) < number);
      setApiData(filtered);
      setFilters([...filters, { column, comparison, number }]);
      const newColumns = columnOptions.filter((col) => col !== column);
      setColumnOptions(newColumns);
      setColumn(newColumns[0]);
    } else if (comparison === 'igual a') {
      const filtered = apiData.filter((data) => data[column] === number);
      setApiData(filtered);
      setFilters([...filters, { column, comparison, number }]);
      const newColumns = columnOptions.filter((col) => col !== column);
      setColumnOptions(newColumns);
      setColumn(newColumns[0]);
    }
  }, [apiData, column, comparison, number, filters, columnOptions]);

  const handleSort = useCallback(() => {
    const unknown = apiData.filter((data) => data[sortColumn] === 'unknown');
    const notUnknown = apiData.filter((data) => data[sortColumn] !== 'unknown');
    if (sort === 'ASC') {
      const sortedNotUnknown = notUnknown
        .sort((a, b) => Number(a[sortColumn]) - Number(b[sortColumn]));
      setApiData([...sortedNotUnknown, ...unknown]);
      setFilters([...filters, { sortColumn, sort }]);
    } else if (sort === 'DESC') {
      const sortedNotUnknown = notUnknown
        .sort((a, b) => Number(b[sortColumn]) - Number(a[sortColumn]));
      setApiData([...sortedNotUnknown, ...unknown]);
      setFilters([...filters, { sortColumn, sort }]);
    }
  }, [sort, apiData, sortColumn, filters]);

  const handleRemove = useCallback(() => {
    setApiData(initialApiData);
    setFilters([]);
  }, [initialApiData]);

  const values = useMemo(() => ({
    apiData,
    initialApiData,
    inputText,
    setInputText,
    column,
    setColumn,
    columnOptions,
    comparison,
    setComparison,
    number,
    setNumber,
    filters,
    handleFilter,
    sortColumn,
    setSortColumn,
    sort,
    setSort,
    handleSort,
    handleRemove,
  }), [apiData, initialApiData, inputText, setInputText, column, setColumn,
    columnOptions, comparison, setComparison, number, setNumber, filters,
    handleFilter, sortColumn, setSortColumn, sort, setSort, handleSort, handleRemove]);

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
