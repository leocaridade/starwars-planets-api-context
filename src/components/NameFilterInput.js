import React, { useContext } from 'react';
import Mycontext from '../contexts/Mycontext';

function NameFilterInput() {
  const { inputText, setInputText } = useContext(Mycontext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setInputText(target.value) }
        value={ inputText }
      />
    </div>
  );
}

export default NameFilterInput;
