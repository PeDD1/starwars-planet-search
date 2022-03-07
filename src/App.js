import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetFinder from './context/PlanetFinder';

function App() {
  return (
    <PlanetFinder>
      <Table />
    </PlanetFinder>
  );
}

export default App;
