import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';


export default function MainSearchForm(props) {
  const [airportQuery, setAirportQuery] = useState('');
  const [airportResult, setAirportResult] = useState([]);
  const [airportSelection, setAirportSelection] = useState({ 
    display: props.currentOrigin || '', 
    cityCode: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const form = document.getElementById('searc-form');

  // called on form submitted
  // async since we fetch the data from remote
  const onSubmit = async (selected) => {
    const destinations = await fetchDestinations(selected.cityCode);
      if(destinations){
        // this is to remove the focus from the form so that the virtual keyboarb
        // on mobile close once a submission is triggered
        if (document.activeElement !== document.body) document.activeElement.blur();
        props.reRenderWithFlights(destinations, selected.display);
      }
  }

  // clear or set-up field placeholder to guide the user
  const updatePlaceHolder = (event) => {
    event.target.placeholder = '';
    if(window.screen.width < 750){
      form.classList.add('full-screen');
    }
    setErrorMessage('');
  }

  // clear or set-up field placeholder to guide the user
  const resetFormView = (event) => {
    if(window.screen.width < 750){
      form.classList.remove('full-screen');
    }
    event.target.placeholder = 'City, Airport';
    setAirportSelection({
      display: props.currentOrigin || '',
    })
    //setAirportQuery('');
    setAirportResult([]);
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
    if(window.screen.width < 750){
      form.classList.remove('full-screen');
    }
    setAirportSelection({ 
      display: event.currentTarget.innerText, // event.target.parentElement should work as well
      cityCode: event.currentTarget.id, 
    });
    setAirportQuery('');
    onSubmit({ 
      display: event.currentTarget.innerText, // event.target.parentElement should work as well
      cityCode: event.currentTarget.id, 
    });
  }
  
  useEffect(
    () => { // first argument is a call back to to be executed each time the components is mounted
      const pullAirports = async (airportQuery) => {  
        try {
          fetchAirportList(airportQuery)
          .then(result =>{
            if(result){
              let airportName = [];
              result.data.forEach(airport => {
                  airportName.push(
                    {
                      listDisplay: {
                        cityName: airport.address.cityName,
                        countryName: airport.address.countryName
                      },
                      cityCode: airport.address.cityCode,
                    }
                  )
              });
              setAirportResult(airportName);  
            }             
          });
        } catch (error) {
          console.log('error loading airport list ')
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
        <form id="searc-form" autoComplete="off" className={`header-form ${props.currentMode}`}>
          {
            props.currentMode === 'search' 
            && <h1>Travel inspirations, <br/> on your budget</h1>
          }        
            <div className={`search-form-element-container ${props.currentMode}`}>
              <div className={`search-form-element ${props.currentMode}`}>
                  <label>I AM FLYING FROM</label>
                  <span className="error">{errorMessage}</span>
                  <input 
                  className={`from ${props.currentMode}`}
                  typpe="text"
                  placeholder="City, Airport"
                  value={airportSelection.display}
                  onChange={onAirportQuery}
                  onFocus={updatePlaceHolder}
                  onBlur={resetFormView}
                />
              <div id="results">                          
                <ul className="countries">
                {
                  airportResult && 
                  airportResult.map(airport =>(
                    <li 
                        key={airport.cityCode}
                        onClick={onSelect}
                        onMouseDown={onSelect} 
                        id={airport.cityCode} 
                        className="country-item"
                      > {airport.listDisplay.cityName}
                      <span className="small-set">({airport.listDisplay.countryName})</span>
                    </li>
                  ))
                }
                </ul>
              </div>
              </div>
            </div>  
        </form>
    );
}