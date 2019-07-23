import React from 'react';
import { useEffect, useState } from 'react';
import MainSearchForm from './Forms/MainSearchForm';
import { fetchGoogleMapApi } from '../Actions/fetchData';

export default function FlightSelection(props){
  const [mapLoading, setMapLoading] = useState(true);
  useEffect(
    async ()=>{
      await fetchGoogleMapApi()
      .then(flithgMap =>{
        // The location of Uluru
        var uluru = {lat: -25.344, lng: 131.036};
        // The map, centered at Uluru
        const map = new flithgMap.Map(
            document.getElementById('map'), {zoom: 4, center: uluru});
        // The marker, positioned at Uluru
        const marker = new flithgMap.Marker({position: uluru, map: map});
      });
      setMapLoading(false);
    },[]
  );

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
        <div id="map">
          {
            mapLoading && <span>Loading map</span>
          }
        </div>
        </div>
      </div>
      </>
    );
}