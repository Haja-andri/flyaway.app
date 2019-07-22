import React from 'react';
import MainSearchForm from './Forms/MainSearchForm'

export default function flightSelection(props){
    return(
      <>
      <div className="search-form">
        <MainSearchForm submitAirport={props.submitAirport} mode={'select'}/>
      </div>

        <div className="result">
        {
          props.flightList.map( 
            flight => (
              <div key={flight.origin + flight.destination}>
                <span>From {flight.origin}</span>
                <span> to {flight.destination}</span>
                <span> Departure {flight.departureDate}</span>
                <span> Return {flight.returnDate}</span>
                <span> Price {flight.price.total}</span>
              </div>
            )
          )
        }
      </div>
      </>
    );
}