import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { loadGoogleMapApi, setMapCenterToCurrentLocation } from '../utils/maps/googleMapApi';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){
  const [defaultCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [defaultZoom] = useState(4);
  const [googleMap, setGoogleMap] = useState(null);

  useEffect( ()=>{
    if(googleMap){
      const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
        zoom:defaultZoom,
        scrollwheel:false,
        center: defaultZoom
      });
      setMapCenterToCurrentLocation(props.origin, currentMapInstance, googleMap);
    }
    else {
      loadMap();
    }
  }
);
  
  const loadMap = () =>{
    const mapPromise =  loadGoogleMapApi();
    Promise.all([
      mapPromise
    ])
    .then(value =>{
      const googleMap = (value[0].maps);
      const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
        zoom:defaultZoom,
        scrollwheel:false,
        center: defaultCenter
      });
      setGoogleMap(googleMap); // make it globaly accessible to the page
      setMapCenterToCurrentLocation(props.origin, currentMapInstance, googleMap);
    }); 
  }
  

  return(
    <>
    <div>
      <MainSearchForm 
        submitAirport={props.submitAirport} 
        currentMode={props.currentMode}
        reRenderWithFlights={props.reRenderWithFlights}
        currentOrigin = {props.origin}
        />
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
              <div className="destination-name"><h4>{props.destinations.dictionaries.locations[flight.destination].detailedName}</h4></div>
              
              <div className="flight-details">
              
                <div>
                  <label>Flying on </label>
                  <div className="date-up">{flight.departureDate}</div>
                </div>
                <div>
                  <label>Returngin on </label>
                  <div className="date-down">{flight.returnDate}</div>
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
        <div id="map" >
        </div>
        </div>
      </div>
    </div>
    </>
  );
}