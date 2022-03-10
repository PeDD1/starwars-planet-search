import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Table from './components/Table';
import PlanetFinder from './context/PlanetFinder';

function App() {
  return (
    <PlanetFinder>
      <Header />
      <Table />
      <Footer />
    </PlanetFinder>
  );
}

export default App;
