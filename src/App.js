import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilterInput from './components/NameFilterInput';

function App() {
  return (
    <div>
      <NameFilterInput />
      <Table />
    </div>
  );
}

export default App;
