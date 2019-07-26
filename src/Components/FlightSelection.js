import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { loadGoogleMapApi } from '../Actions/fetchData';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){
  const [defaultCenter, setDefaultCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [defaultZoom, setDefaultZoom] = useState(11);
  const [mapInstance, setMapInstance] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect( ()=>{
      if(!mapLoaded){
        loadMap();
      } 
    },[mapLoaded]
  );

  const loadMap = () =>{
    const mapPromise =  loadGoogleMapApi();
    Promise.all([
      mapPromise
    ])
    .then(value =>{
      const googleMap = (value[0].maps.Map);
      setMapInstance(new googleMap(document.getElementById('map'), {
        zoom:defaultZoom,
        scrollwheel:false,
        center: defaultCenter
      }));
      setMapLoaded(true);  
    }); 
  }
  

  return(
    <>
    <div className="search-form">
      <MainSearchForm 
        submitAirport={props.submitAirport} 
        currentMode={props.currentMode}
        reRenderWithFlights={props.reRenderWithFlights}
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
              <h4>From {props.origin}</h4>
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
        <div id="map" className="map-container">
        </div>
      </div>
    </div>
    </>
  );
}