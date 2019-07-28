import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { loadGoogleMapApi } from '../Actions/fetchData';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){
  const [defaultCenter, setDefaultCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [defaultZoom, setDefaultZoom] = useState(4);
  const [mapInstance, setMapInstance] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  //const [geocoderInstance, setGeocoderInstance] = useState({});
  const [googleMap, setGoogleMap] = useState({});

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
      const googleMap = (value[0].maps);
      const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
        zoom:defaultZoom,
        scrollwheel:false,
        center: defaultCenter
      })
      setMapInstance(currentMapInstance);
      setMapLoaded(true); 
      const geocoderInstance = new googleMap.Geocoder();
      // setGeocoderInstance(coderInstance); 
      setGoogleMap(googleMap); // make it globaly accessible to the page
      geocodeAddress(geocoderInstance, currentMapInstance, googleMap);
    }); 
  }

  const geocodeAddress = (geocoderInstance, currentMapInstance, googleMap) => {
    const address = props.origin;
    geocoderInstance.geocode({'address': address}, (results, status) =>{
      if (status === 'OK') {
        currentMapInstance.setCenter(results[0].geometry.location);
        new googleMap.Marker({
          map: currentMapInstance,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
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