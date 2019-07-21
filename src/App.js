import React from 'react';
import { useState, useEffect } from 'react';
import { fetchDestinations } from './Actions/fetchData';
import NavBar from './Components/NavBar';
import './App.css';
import './css/header.css';
import LandingSearch from './Components/LandingSearch';
import FlightSelection from './Components/flightSelection'

function App() {
  const [isSubmitted, setSubmit] = useState(false);
  const [currentMode, setCurrentMode] = useState('search')
  const [selectedAirport, setSelectedAirport] = useState('');
  const [flightList, setFlightList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function submitAirport(aiportCityCode) {
    setSelectedAirport(aiportCityCode)
    setSubmit(true);
  }

  useEffect(
    () => {
      const pullFlights = async () => {
        setIsLoading(true);
        const result = await fetchDestinations(selectedAirport);
        setFlightList(result.data); // update the state with received data
        setIsLoading(false);
      };
      if(isSubmitted && currentMode === 'search'){
        pullFlights();
        setCurrentMode('select');
      }
    },[isSubmitted, selectedAirport, currentMode]
  ); 


  return (
    <div>
        <section className={currentMode}>
        <NavBar currentMode={currentMode} />
        {
          isLoading ? (
            <div>Loading ...</div>
          ) 
          : (
            currentMode === 'search' 
            ? <LandingSearch submitAirport={submitAirport}/> 
            : <FlightSelection submitAirport={submitAirport} flightList={flightList}/>
          )
        }
      </section>
    </div>
  );
}

export default App;