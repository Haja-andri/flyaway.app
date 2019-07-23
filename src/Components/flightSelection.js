import React from 'react';
import MainSearchForm from './Forms/MainSearchForm'

export default function flightSelection(props){
    return(
      <>
      <div className="search-form">
        <MainSearchForm submitAirport={props.submitAirport} currentMode={props.currentMode}/>
      </div>
      <div className="search-result-container">
        <div className="result-list-container">
        {
          props.flightList.map( 
            flight => (
              <div 
              key={flight.origin + flight.destination}
              className="flight-item"
              >
                <h3>From {flight.origin} to {flight.destination}</h3>
                <div className="flight-details">
                
                  <div>
                    <span>Flying on </span>
                    <div>{flight.departureDate}</div>
                  </div>
                  <div>
                    <span>Returngin on </span>
                    <div>{flight.returnDate}</div>
                  </div>
                  <div> Price {flight.price.total}</div>
                </div>
                
              </div>
            )
          )
        }
        </div>
        <div className="result-map-container">

        </div>
      </div>
      </>
    );
}