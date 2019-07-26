import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';


export default function MainSearchForm(props) {
  const [airportQuery, setAirportQuery] = useState('');
  const [airportResult, setAirportResult] = useState([]);
  const [airportSelection, setAirportSelection] = useState({ display: '', cityCode: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // called on form submitted
  // async since we fetch the data from remote
  const onSubmit = async (event) => {
    event.preventDefault();
    if(!airportSelection.cityCode) {
      setErrorMessage('From where are you flying?');
      return;
    }
    setIsLoading(true);
    const destinations = await fetchDestinations(airportSelection.cityCode);
      if(destinations){
        setIsLoading(false);
        props.reRenderWithFlights(destinations, airportSelection.display);
      }
  }

  // clear or set-up field placeholder to guide the user
  const updatePlaceHoler = (event) => {
    event.target.placeholder ? 
    event.target.placeholder = '' : 
    event.target.placeholder = 'City, Airport';
    setErrorMessage('');
  }

  // while user is typing we fetch matching city
  // and/or airport for autocompletion
  const onAirportQuery = (event) => {
    event.preventDefault();
    const typedValue = event.target.value;
    setAirportSelection({
      display: typedValue,
    })
    setAirportQuery(typedValue);
  }

  // an airport and/or city has been selected from autocompletion list
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
          result.data.forEach(airport => {
              airportName.push(
                {
                  listDisplay: `${airport.address.cityName}  (${airport.address.cityCode})`,
                  cityCode: airport.address.cityCode,
                }
              )
          });
          setAirportResult(airportName);  
        }
      };
      if(airportQuery){
        pullAirports(airportQuery);
      }
      // reset the autocompletion if query input field is empty
      if(airportQuery === ''){
        setAirportResult([]);
      }
    },
    [airportQuery] // second argument that define when to trigger useEffect again after the initial mount 
  );

    return(
        <form autoComplete="off" className={`header-form ${props.currentMode}`}>
          {
            props.currentMode === 'search' && <h1>Travel inspirations, <br/> on your budget</h1>
          }        
            <div className={`search-form-element-container ${props.currentMode}`}>
              <div className={`search-form-element ${props.currentMode}`}>
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
              </div>
              <div className={`search-form-element ${props.currentMode}`}>
                <label>BUDGET</label>
                <input typpe="text"></input>
              </div>
              <div className={`search-form-element ${props.currentMode} centered`}>
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
              </div>
            </div>  
        </form>
    );
}