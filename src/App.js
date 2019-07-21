import React from 'react';
import { useState, useEffect } from 'react';
import { fetchDestinations } from './Actions/fetchData';
import NavBar from './Components/NavBar';
import './App.css';
import './css/header.css';
import LandingHeader from './Components/LandingHeader';

function App() {
  const [isSubmitted, setSubmit] = useState(false);
  const [currentMode, setCurrentMode] = useState('search')
  const [selectedAirport, setSelectedAirport] = useState('');
  const [destinations, setDestinations] = useState([]);

  function submitAirport(aiportCityCode) {
    setSelectedAirport(aiportCityCode)
    setSubmit(true);
  }

  useEffect(
    () => {
      const pullFlights = async () => {
        const result = await fetchDestinations(selectedAirport);
        setDestinations(result.data); // update the state with received data
      };
      if(isSubmitted && currentMode === 'search'){
        pullFlights();
        setCurrentMode('select');
      }
    },[isSubmitted, selectedAirport, currentMode]
  ); 


  return (
    <div>
        <header className="content">
        <NavBar />
        <LandingHeader submitAirport={submitAirport}/>
      </header>
      <div className="result">
        {
          destinations.map( 
            destination => (
              <div key={destination.origin + destination.destination}>
                <span>From {destination.origin}</span>
                <span> to {destination.destination}</span>
                <span> Departure {destination.departureDate}</span>
                <span> Return {destination.returnDate}</span>
                <span> Price {destination.price.total}</span>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}

export default App;