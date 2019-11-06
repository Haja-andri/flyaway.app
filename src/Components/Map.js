import React, { useEffect, useState } from 'react';
import { loadMap, loadGoogleMapApi, getDestinationGeocode } from '../utils/maps/googleMapApi';
import mapStyles from '../css/mapStyling';


const Map = (props) => {
    const { originTable, origin, destination } = props;
    // google map
    const [defaultZoom] = useState(4);
    const [googleMap, setGoogleMap] = useState(null);
    const [mapLoaded, setmapLoaded] = useState(false);
    const [ currentCityCenter, setCurrentCityCenter ] = useState(null);
    const [ mapInstance, setMapInstance] = useState(null);

    
    const mapDefaultView = async (mapAPI) =>{
        setGoogleMap(mapAPI);
        setmapLoaded(true);
        setCurrentCityCenter(originTable[origin].city_name)
        // we get the map centered on the current origin by default
        const center = await getDestinationGeocode(originTable[origin].city_name);

        const currentMapInstance = new mapAPI.Map(document.getElementById('map'), {
            zoom:defaultZoom,
            scrollwheel:false,
            center,
            styles: mapStyles
        });
        
        // keep instance of Map available to the component life cycle
        // add the marker to the center
        new mapAPI.Marker({
        map: currentMapInstance,
        position: center,
        styles: mapStyles
        });
        setMapInstance(currentMapInstance);
    }

    useEffect( ()=>{
            const getMapAPI = async () =>{
                // will get the MAP js API loaded
                // and pass it to default view
                mapDefaultView(await loadMap());
            }
            getMapAPI();
        }, [] // Nothing in the array means the use effect will run only once
    );

    // useEffect that updated the map with
    // route when the user hover a given destination
    useEffect( ()=>{
            if (mapLoaded){
                showRouteOnMap(destination);
            }
        }, [destination]
    );

    const showRouteOnMap = async (destination) =>{
        const from = await getDestinationGeocode(originTable[origin].city_name);

        const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
            zoom:defaultZoom,
            scrollwheel:false,
            center: {lat: from.lat, lng: from.lng},
            styles: mapStyles
        });

        const to = await getDestinationGeocode(destination);
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
    <div className="map-container">
        <div id="map" >
        </div>
    </div>
)

}

export default Map;