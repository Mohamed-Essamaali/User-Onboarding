import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import DataForm from './components/Form';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registration Form</h1>
      </header>

      <DataForm />
    </div>
  );
}

export default App;
