import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Myprovider from './contexts/Myprovider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Myprovider>
      <App />
    </Myprovider>,
  );
