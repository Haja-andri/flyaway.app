import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { fetchDestinations } from '../Actions/fetchData';
import Map from './Map'
import EditSearch from './Forms/EditSearch';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';

export default function FlightSelection(props){

  const override = css`
  margin: 0;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  padding-top:30px;  
  padding-bottom:30px;  
`;


  const originTable = {
    "MAD": {
      "city_name": "MADRID",
      "active": false,
    },
    "MUC": {
      "city_name": "MUNICH",
      "active": false,
    },
    "PAR": {
      "city_name": "PARIS",
      "active": false,
    },
    "NYC": {
      "city_name": "NEW YORK",
      "active": false,
    },
    "LON": {
      "city_name": "LONDON",
      "active": false,
    }
  }; 
  // set the current origin to active => true
  originTable[props.match.params.ori].active = true;

  // Set curent origin in local state
  const [origin, SetOrigin] = useState(props.match.params.ori);
  // list of destination
  const [destinations, SetDestinations] = useState(null);
  // single destination
  const [destination, SetDestination] = useState(null);
  // clear route from map
  const [clearRoute, SetClearRoute] = useState(false);
  // error message
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    SetOrigin(props.match.params.ori)
  },[props.match.params.ori] // force to re-render the component when receiving new props
  )


  // Get the destination list based on origin
  useEffect(()=>{
      const getDestinations = async (origin) =>{
        SetDestinations(null);
        try {
            const destinationsList = await fetchDestinations(origin);
            SetDestinations(destinationsList);
        }
        catch (error) {
          setErrorMessage("an error occured while looking for your data, please try again later");
        }
      }
      getDestinations(origin);
    }, [origin]
  );

  useEffect(()=>{
    }, [destination]
  );

  const showRouteOnMap = (destination) => {
    SetDestination(destination)
  }

  const clearRouteFromMap = (bool) => {
    SetClearRoute(bool);
  }

  return(
    <>
    <div>
      <EditSearch 
        submitAirport={props.submitAirport} 
        reRenderWithFlights={props.reRenderWithFlights}
        originTable = {originTable}
        />
    </div>
    <div className="search-result-container">
      <div className="result-list-container">
      {
        errorMessage && (
          <div className="flight-item">
            {errorMessage}
          </div>
        )

      }
      {
        destinations ? (
          destinations.data.map( 
            flight => (
              <div 
              key={flight.origin + flight.destination}
              className="flight-item"
              onMouseEnter={() => {
                showRouteOnMap(destinations.dictionaries.locations[flight.destination].detailedName);
              }}
              onMouseLeave={()=>{
                clearRouteFromMap(true)
              }}
              >
                <div><h4 className="destination-name">{destinations.dictionaries.locations[flight.destination].detailedName}</h4></div>
                
                <div className="flight-details">
                
                  <div>
                    <label>Flying on </label>
                    <div className="date-up">{flight.departureDate}</div>
                  </div>
                  <div>
                    <label>Returngin on </label>
                    <div className="date-down">{flight.returnDate}</div>
                  </div>
                  <div className="large-display">{flight.price.total} <span className="small-display">{destinations.meta.currency}</span></div>
                  
                </div>
                
              </div>
            )
          )
        )
        : (
          <div className="flight-item">
            <PropagateLoader
              css={override}
              widthUnit={'%'}
              size={10}
              color={'#5f9ea0'}
              loading={true}
            />
          </div>
        )
      }
      </div>
      <div className="result-map">
        <Map 
          originTable={originTable} 
          origin={origin} 
          destination={destination}
          clearRoute={clearRoute}
          clearRouteFromMap={clearRouteFromMap}
        />
      </div>
    </div>
    </>
  );
}