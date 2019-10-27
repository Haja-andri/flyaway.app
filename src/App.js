import React from 'react';
import { useState } from 'react';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/FlightSelection';
import {
    Switch,
    Route,
} from 'react-router-dom';


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
          <Switch>
            <Route exact path="/" render={props => <LandingSearch {...props} />} />
            <Route path="/result/:ori" render={props => <FlightSelection {...props} />} />
          </Switch>
        </section>
    </div>
  );
}

export default App;