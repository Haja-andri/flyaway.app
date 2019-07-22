import React from 'react';
import { useState } from 'react';
import NavBar from './Components/NavBar';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/flightSelection'

function App() {
  const [currentMode, setCurrentMode] = useState('select')
  const [flightList, setFlightList] = useState([]);

  function reRenderWithFlights(flightList) {
    setFlightList(flightList);
    setCurrentMode('select');
  }

  
  return (
    <div>
        <section className={currentMode}>
        <NavBar currentMode={currentMode} />
        {
            currentMode === 'search' 
            ? <LandingSearch reRenderWithFlights={reRenderWithFlights} currentMode={currentMode} /> 
            : <FlightSelection flightList={flightList} currentMode={currentMode}/>
        }
      </section>
    </div>
  );
}

export default App;