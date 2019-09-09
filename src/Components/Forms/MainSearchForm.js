import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';


export default function MainSearchForm(props) {

  const override = css`
    display: block;
    margin: 0;
    border-color: red;
`;

  const [loading, setLoading] = useState(false); // for the spinner
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
    try {
      const destinations = await fetchDestinations(selected.cityCode);
      if(destinations){
        // this is to remove the focus from the form so that the virtual keyboarb
        // on mobile close once a submission is triggered
        if (document.activeElement !== document.body) document.activeElement.blur();
        setLoading(false);
        props.reRenderWithFlights(destinations, selected.display);
      }      
    } catch (error) {
      switch (error) {
        case 141:
          const errorMessage = `Sorry, no flights are available from this city yet`;
          setErrorMessage(errorMessage);
          break;
        default:
          console.log(`Sorry there was an error getting the data ${error}`);
      }
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
    setLoading(true);
    onSubmit({ 
      display: event.currentTarget.innerText,
      cityCode: event.currentTarget.id, 
    });
  }

  useEffect(() => {
      // Initially the airport selection is intialise via props
      // but after the first render the initialisation from props
      // is ignored. To set the state with the new props received 
      // we have to use useEffect to update the state
      setAirportSelection({
        display: props.currentOrigin || ''});  
}, [props.currentOrigin])
  
  useEffect(
    () => {
      // first argument is a call back to to be executed each time the components is mounted
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
                {
                  props.currentMode === 'search' 
                  && <label>I AM FLYING FROM</label>
                } 
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
                  {
                    loading &&
                    <BarLoader
                    css={override}
                    widthUnit={'%'}
                    size={100}
                    color={'#FF4B2B'}
                    loading={true}
                  />
                  }

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