import React from 'react';
import { useState, useEffect } from 'react';
import MainSearchForm from './Forms/MainSearchForm';

export default function FlightSelection(props){

  const [map, setMap] = useState({});
  // first we get the <div> that will receive the map
  const mapContainer = document.getElementById('map');

  const mapSetup = () =>{
      // create a new map passing in the container and 
      // default parameters
      new window.google.maps.Map(mapContainer,{
        zoom:16,
        center: {
          lat: 43.642567,
          lng: -79.387054
        },
        desableDefaultUI: true,
      })
  }

const intialiseMap = () =>{
    setMap(mapSetup);
    createMarker();
}

const createMarker = () =>{
  new window.google.maps.Marker({
    position: {lat: 43.642567, lng: -79.387054},
    map: map
  })
}

  useEffect(
    ()=> {
        const googleMapScript = document.createElement('script');
        debugger
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzxtVBJkcrbmLNwX7Jv6OFhHMs4qBK4A`;
        window.document.body.appendChild(googleMapScript)
        googleMapScript.addEventListener('load', {
          intialiseMap
        }
        );
    }//,[]
  );

//   async function loadMapObject(){
//     const map = document.getElementById('map');
//     setTimeout(()=>{
//       map.innerHTML = '<span>Map loaded </span>';
//     }, 5000)
//   }
//   loadMapObject();
//   setLoadingMap(false);
// },[loadingMap]


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
        <span>Loading map</span>
      </div>
      </div>
    </div>
    </>
  );
}