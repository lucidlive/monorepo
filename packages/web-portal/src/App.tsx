import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TestComponent } from "@onyx/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Andrew Was Here
        </p>
        <TestComponent />
      </header>
    </div>
  );
}

export default App;
