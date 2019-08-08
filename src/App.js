import React from 'react';
import { useState } from 'react';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/FlightSelection'

function App() {
  const [currentMode, setCurrentMode] = useState('search')
  const [destinations, setDestinations] = useState([]);
  const [origin, setOrigin] = useState([]);

  //callback function to re-render when receiving the 
  // list from the child-component (search form)
  function reRenderWithFlights(destinations, origin) {
    setDestinations(destinations);
    setOrigin(origin);
    setCurrentMode('select');
  }
  
  return (
    <div>
        <section className={currentMode}>
        {/* <NavBar currentMode={currentMode} /> */}
        {
            currentMode === 'search' 
            ? <LandingSearch reRenderWithFlights={reRenderWithFlights} currentMode={currentMode} /> 
            : <FlightSelection destinations={destinations} origin={origin} reRenderWithFlights={reRenderWithFlights} currentMode={currentMode}/>
        }
      </section>
    </div>
  );
}

export default App;