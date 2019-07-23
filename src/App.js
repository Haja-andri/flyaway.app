import React from 'react';
import { useState } from 'react';
import NavBar from './Components/NavBar';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/FlightSelection'

function App() {
  const [currentMode, setCurrentMode] = useState('search')
  const [destinations, setDestinations] = useState([]);

  //callback function to re-render when receiving the 
  // list from the child-component (search form)
  function reRenderWithFlights(destinations) {
    setDestinations(destinations);
    setCurrentMode('select');
  }
  
  return (
    <div>
        <section className={currentMode}>
        <NavBar currentMode={currentMode} />
        {
            currentMode === 'search' 
            ? <LandingSearch reRenderWithFlights={reRenderWithFlights} currentMode={currentMode} /> 
            : <FlightSelection destinations={destinations} currentMode={currentMode}/>
        }
      </section>
    </div>
  );
}

export default App;