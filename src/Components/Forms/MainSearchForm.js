import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';


export default function (props) {
      // state that will store and give access to destinations
  const [airportQuery, setAirportQuery] = useState('');
  const [airportResult, setAirportResult] = useState([]);
  const [airportSelection, setAirportSelection] = useState({ display: '', cityCode: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const onSubmit = async (event) => {
    event.preventDefault();
    if(!airportSelection.cityCode) {
      setErrorMessage('Please enter a city or an airport');
      return;
    }
    setIsLoading(true);
    const result = await fetchDestinations(airportSelection.cityCode);
      if(result){
        setIsLoading(false);
        props.reRenderWithFlights(result.data);
      }
  }

  const updatePlaceHoler = (event) => {
    event.target.placeholder ? 
    event.target.placeholder = '' : 
    event.target.placeholder = 'City, Airport';
    setErrorMessage('');
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
        <form autoComplete="off" className="header-form">
        <h1>Travel inspirations, <br/> on your budget</h1>
            <label>FROM</label>
            <span className="error">{errorMessage}</span>
            <input 
              typpe="text"
              placeholder="City, Airport"
              value={airportSelection.display}
              onChange={onAirportQuery}
              onFocus={updatePlaceHoler}
              onBlur={updatePlaceHoler}
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
            <button onClick={onSubmit}>
            {
              isLoading ? (
                <div className="lds-dual-ring"></div>
              ) 
              : (
                <div>Inspire me</div>
              )
            }
            </button>
        </form>
    );
}