import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { loadGoogleMapApi, getDestinationGeocode } from '../utils/maps/googleMapApi';
import MainSearchForm from './Forms/MainSearchForm';
import mapStyles from '../css/mapStyling'

export default function FlightSelection(props){
  const [defaultZoom] = useState(4);
  const [googleMap, setGoogleMap] = useState(null);
  
  const mapDefaultView = async () =>{
    // we get the map centered on the current origin by default
    const center = await getDestinationGeocode(props.origin);
    const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
      zoom:defaultZoom,
      scrollwheel:false,
      center,
      styles: mapStyles
    });
    // add the marker to the center
    new googleMap.Marker({
      map: currentMapInstance,
      position: center,
      styles: mapStyles
    });
  }

  useEffect( ()=>{
    if(googleMap){
      mapDefaultView();
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
      setGoogleMap(googleMap); // make it globaly accessible to the page
    }); 
  }

  const showRouteOnMap = async (destinationCity) =>{
    const from = await getDestinationGeocode(props.origin);

    const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
      zoom:defaultZoom,
      scrollwheel:false,
      center: {lat: from.lat, lng: from.lng},
      styles: mapStyles
    });

    const to = await getDestinationGeocode(destinationCity);
    let routeCoordinates = [
      {lat: from.lat, lng: from.lng},
      {lat: to.lat, lng: to.lng},
    ];

    const flightPath = new googleMap.Polyline({
      path: routeCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(currentMapInstance);
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
            onMouseEnter={() => {
              showRouteOnMap(props.destinations.dictionaries.locations[flight.destination].detailedName);
            }}
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
                <div className="large-display">{flight.price.total} <span className="small-display">{props.destinations.meta.currency}</span></div>
                
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