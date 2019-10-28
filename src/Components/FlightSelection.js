import React from 'react';
import { useState, useEffect } from 'react';
// function that loads google map api
import { loadGoogleMapApi, getDestinationGeocode } from '../utils/maps/googleMapApi';
import { fetchDestinations } from '../Actions/fetchData';
import MainSearchForm from './Forms/MainSearchForm';
import mapStyles from '../css/mapStyling'

export default function FlightSelection(props){

  const originTable = {
    "MAD": "MADRID",
    "MUC": "MUNICH",
    "PAR": "PARIS",
    "NYC": "NEW YORK",
    "LON": "LONDON"
  }; 
  // Set curent origin in local state
  const [origin, SetOrigin] = useState(props.match.params.ori);
  const [destinations, SetDestinations] = useState(null);
  // error message
  const [errorMessage, setErrorMessage] = useState('');
  // google map
  const [defaultZoom] = useState(4);
  const [googleMap, setGoogleMap] = useState(null);


  // Get the destination list based on origin
  useEffect(()=>{
    const getDestinations = async (origin) =>{
      try {
          const destinationsList = await fetchDestinations(origin);
          SetDestinations(destinationsList);
      }
      catch (error) {
        switch (error) {
          case 141:
            const errorMessage = `Sorry, no flights are available from this city yet`;
            setErrorMessage(errorMessage);
            break;
          default:
            console.log(`Sorry there was an error getting the data ${error}`);
        }
      }
    }
    getDestinations(origin);
  }, []

  );
  
  
  const mapDefaultView = async () =>{
    // we get the map centered on the current origin by default
    const center = await getDestinationGeocode(originTable[origin]);
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
    const from = await getDestinationGeocode(originTable[origin]);

    const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
      zoom:defaultZoom,
      scrollwheel:false,
      center: {lat: from.lat, lng: from.lng},
      styles: mapStyles
    });

    const to = await getDestinationGeocode(destinationCity);
    if (!from || !to) {
      // enable to get the line geocoordinate, return otherwise 
      // it breaks the display
      return;
    }

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
      {/* <MainSearchForm 
        submitAirport={props.submitAirport} 
        currentMode={props.currentMode}
        reRenderWithFlights={props.reRenderWithFlights}
        currentOrigin = {props.origin}
        /> */}
    </div>
    <div className="search-result-container">
      <div className="result-list-container">
      {
        destinations && (
          destinations.data.map( 
            flight => (
              <div 
              key={flight.origin + flight.destination}
              className="flight-item"
              onMouseEnter={() => {
                showRouteOnMap(destinations.dictionaries.locations[flight.destination].detailedName);
              }}
              >
                <div className="destination-name"><h4>{destinations.dictionaries.locations[flight.destination].detailedName}</h4></div>
                
                <div className="flight-details">
                
                  <div>
                    <label>Flying on </label>
                    <div className="date-up">{flight.departureDate}</div>
                  </div>
                  <div>
                    <label>Returngin on </label>
                    <div className="date-down">{flight.returnDate}</div>
                  </div>
                  <div className="large-display">{flight.price.total} <span className="small-display">{destinations.meta.currency}</span></div>
                  
                </div>
                
              </div>
            )
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