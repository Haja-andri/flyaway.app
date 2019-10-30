import React from 'react';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/FlightSelection';
import {
    Switch,
    Route,
} from 'react-router-dom';


function App() {
  
  return (
    <div>
        <section>
          <Switch>
            <Route exact path="/" render={props => <LandingSearch {...props} />} />
            <Route path="/result/:ori" render={props => <FlightSelection {...props} />} />
          </Switch>
        </section>
    </div>
  );
}

export default App;