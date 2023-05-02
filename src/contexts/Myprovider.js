import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Mycontext from './Mycontext';

function Myprovider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [initialApiData, setInitialApiData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);

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
    if (comparison === 'maior que') {
      const filtered = apiData.filter((data) => Number(data[column]) > number);
      setApiData(filtered);
      setFilters(...filters, { column, comparison, number });
    } else if (comparison === 'menor que') {
      const filtered = apiData.filter((data) => Number(data[column]) < number);
      setApiData(filtered);
      setFilters(...filters, { column, comparison, number });
    } else if (comparison === 'igual a') {
      const filtered = apiData.filter((data) => data[column] === number);
      setApiData(filtered);
      setFilters(...filters, { column, comparison, number });
    }
  }, [apiData, column, comparison, number, filters]);

  const values = useMemo(() => ({
    apiData,
    initialApiData,
    inputText,
    setInputText,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    handleFilter,
  }), [apiData, initialApiData, inputText, setInputText, column, setColumn,
    comparison, setComparison, number, setNumber, handleFilter]);

  return (
    <Mycontext.Provider value={ values }>
      {children}
    </Mycontext.Provider>
  );
}

Myprovider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Myprovider;
