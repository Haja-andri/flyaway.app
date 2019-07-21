import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList } from '../Actions/fetchData';


export default function LandingHeader(props) {
  // state that will store and give access to destinations
  const [airportQuery, setAirportQuery] = useState('');
  const [airportResult, setAirportResult] = useState([]);
  const [airportSelection, setAirportSelection] = useState({ display: '', cityCode: ''});

  const onSubmit = (event, submitAirport) => {
    event.preventDefault();
    props.submitAirport(airportSelection.cityCode);
  }

  const onAirportQuery = (event) => {
    event.preventDefault();
    const typedValue = event.target.value;
    setAirportSelection({
      display: typedValue,
    })
    setAirportQuery(typedValue);
  }

  const onSelect = (event) => {
    event.preventDefault();
    setAirportSelection({
      display: event.target.innerText,
      cityCode: event.target.id,
    });
    setAirportQuery('');
  }
  
  useEffect(
    () => { // first argument is a call back to to be executed each time the components is mounted
      const pullAirports = async (airportQuery) => {
        const result = await fetchAirportList(airportQuery);
        if(result){
          let airportName = [];
          let previousAirportCode = '';
          result.data.forEach(airport => {
            if(previousAirportCode !== airport.address.cityCode){
              airportName.push(
                {
                  listDisplay: `${airport.address.cityName}  (${airport.address.cityCode})`,
                  cityCode: airport.address.cityCode,
                }
              )
              previousAirportCode = airport.address.cityCode;
            }
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

    return(
        <div className="header-content">
        <div className="search-form">
            <form autoComplete="off" className="header-form">
            <h1>Travel inspirations, <br/> on your budget</h1>
                <label>FROM</label>
                <input 
                  typpe="text"
                  placeholder="Bordeaux"
                  value={airportSelection.display}
                  onChange={onAirportQuery}
                />
                <div id="results">                          
                <ul className="countries">
                  {
                    airportResult && 
                    airportResult.map(airport =>(
                        <li key={airport.cityCode} onClick={onSelect} id={airport.cityCode} className="country-item">{airport.listDisplay}</li>
                    ))
                  }
                  </ul>
                </div>
                <label>BUDGET</label>
                <input typpe="text" className="half"></input>
                <button onClick={onSubmit}>Inspire me</button>
            </form>
        </div>
        <div className="showcase">
        </div>
    </div>
    );
}