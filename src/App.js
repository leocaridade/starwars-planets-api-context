import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilterInput from './components/NameFilterInput';
import Form from './components/Form';

function App() {
  return (
    <div>
      <NameFilterInput />
      <Form />
      <Table />
    </div>
  );
}

export default App;
