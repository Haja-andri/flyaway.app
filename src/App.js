import React from 'react';
import { useState, useEffect } from 'react';
import { fetchDestinations, fetchAirportList } from './Actions/fetchData';
import NavBar from './Components/NavBar';
import './App.css';
import './css/header.css';


function App() {
  // state that will store and give access to destinations
  const [destinations, setDestinations] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);
  const [airportQuery, setAirportQuery] = useState('');
  const [airportResult, setAirportResult] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
  }

  const onAirportQuery = (event) => {
    event.preventDefault();
    setAirportQuery(event.target.value);
  }
  
  useEffect(
    () => { // first argument is a call back to to be executed each time the components is mounted
      const pullAirports = async (airportQuery) => {
        const result = await fetchAirportList(airportQuery);
        if(result){
          let airportName = [];
          result.data.forEach(airport => {
            airportName.push(airport.address.cityName + ' (' + airport.address.countryCode + ')')
          });
          setAirportResult(airportName);  
        }
      };
      if(airportQuery){
        pullAirports(airportQuery);
      }
      if(airportQuery === ''){
        setAirportResult([]);
      }

    },
    [airportQuery] // second argument that define when to trigger useEffect again after the initial mount 
  );

  useEffect(
    () => {
      const pullFlights = async () => {
        const result = await fetchDestinations();
        setDestinations(result.data); // update the state with received data
      };
      if(isSubmitted){
        pullFlights();
        setSubmit(false);
      }
    },[isSubmitted]
  );

  return (
    <div>
        <header className="content">
        <NavBar />
        <div className="header-content">
            <div className="search-form">
                <form autocomplete="off" className="header-form">
                <h1>Travel inspirations. On your budget</h1>
                    <label>FROM</label>
                    <input 
                      typpe="text"
                      placeholder="Bordeaux"
                      value={airportQuery}
                      onChange={onAirportQuery}
                    />
                    <div id="results">
                      {
                        airportResult && airportResult.map(airport =>(
                          <li>{airport}</li>
                        ))
                      }
                    </div>
                    <label>BUDGET</label>
                    <input typpe="text"></input>
                    <button onClick={onSubmit}>Inspire me</button>
                </form>
            </div>
            <div className="showcase">
            </div>
        </div>
        </header>
      <div className="result">
        {
          destinations.map( 
            destination => (
              <div>
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