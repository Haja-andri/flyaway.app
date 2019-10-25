import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';
import { css } from '@emotion/core';
import styled from 'styled-components'
import BarLoader from 'react-spinners/BarLoader';



export default function MainSearchForm(props) {

  const override = css`
    display: block;
    margin: 0;
    border-color: red;
    margin-left: 10px;
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
      setLoading(false);
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
            && <h1>From where do you want to take off ?</h1>
          }        
            <div className={`search-form-element-container ${props.currentMode}`}>
              <div className={`search-form-element ${props.currentMode}`}>
                <OriginContainer>
                  <OriginCard>
                    <h3>Paris</h3>
                  </OriginCard>
                  <OriginCard>
                    <h3>Madrid</h3>
                  </OriginCard>
                  <OriginCard>
                    <h3>Munich</h3>
                  </OriginCard>
                </OriginContainer>
              </div>
            </div>  
        </form>
    );
}

const OriginContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
`;

const OriginCard = styled.div`
  margin:0 auto;
  width: 80%;
  margin:10px;
  background-color: white;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border:1px solid #D8ECF7;
  height: 100px;
  position: relative;
  h3{
    width: 100%;
    color:#5f9ea0;
    text-align:center;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;