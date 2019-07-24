import React from 'react';
import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){

  const [defaultCenter, setDefaultCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [defaultZoom, setDefaultZoom] = useState(11);

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
      <div className="result-map">
        <div className="map-container">
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAHzxtVBJkcrbmLNwX7Jv6OFhHMs4qBK4A' }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
          >
        </GoogleMapReact>
        </div>
      </div>
    </div>
    </>
  );
}