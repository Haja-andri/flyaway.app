import React from 'react';
import { useState } from 'react';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){

  const [mapLoading, setMapLoading] = useState(false);

    return(
      <>
      <div className="search-form">
        <MainSearchForm submitAirport={props.submitAirport} currentMode={props.currentMode}/>
      </div>
      <div className="search-result-container">
        <div className="result-list-container">
          
        {
          props.destinations.data.map( 
            flight => (
              <div 
              key={flight.origin + flight.destination}
              className="flight-item"
              >
                <h3>{props.destinations.dictionaries.locations[flight.destination].detailedName}</h3>
                <div className="flight-details">
                
                  <div>
                    <label>Flying on </label>
                    <div className="date">{flight.departureDate}</div>
                  </div>
                  <div>
                    <label>Returngin on </label>
                    <div className="date">{flight.returnDate}</div>
                  </div>
                  <span className="large-display">{flight.price.total} &euro;</span>
                  
                </div>
                
              </div>
            )
          )
        }
        </div>
        <div className="result-map-container">
        <div id="map"></div>
        </div>
      </div>
      </>
    );
}