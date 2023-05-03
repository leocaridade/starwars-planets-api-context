import React, { useContext } from 'react';
import Context from '../contexts/Context';

function NameFilterInput() {
  const { inputText, setInputText } = useContext(Context);

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
