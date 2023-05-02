import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import Mycontext from './Mycontext';

function Myprovider({ children }) {
  const [apiData, setApiData] = useState([]);

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
      });
  }, []);

  const values = useMemo(() => ({
    apiData,
  }), [apiData]);

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
