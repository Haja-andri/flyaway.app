import React, { useEffect, useState } from 'react';
import { loadGoogleMapApi, getDestinationGeocode } from '../utils/maps/googleMapApi';
import mapStyles from '../css/mapStyling';


const Map = (props) => {
    const { originTable, origin } = props;
    // google map
    const [defaultZoom] = useState(4);
    const [googleMap, setGoogleMap] = useState(null);
    const [mapLoaded, setmapLoaded] = useState(false);
    const [ currentCityCenter, setCurrentCityCenter ] = useState(null);

    
    const mapDefaultView = async () =>{
        console.log('originTable', originTable);
        debugger
        if(currentCityCenter === originTable[origin].city_name){
            // if the origin have not changed we do not update the default view
            return;
        }
        else setCurrentCityCenter(originTable[origin].city_name)
            // we get the map centered on the current origin by default
            const center = await getDestinationGeocode(originTable[origin].city_name);

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
        }
    );

    useEffect( ()=>{
            if(!mapLoaded){
                loadMap();
            }
        }, [origin, mapLoaded]
    );


    const loadMap = () =>{
        const mapPromise =  loadGoogleMapApi();
        Promise.all([
            mapPromise
        ])
        .then(value =>{
            const googleMap = (value[0].maps);
            setGoogleMap(googleMap); // make it globaly accessible to the page
            setmapLoaded(true);
        }); 
    }

//     const showRouteOnMap = async (destinationCity) =>{
//         const from = await getDestinationGeocode(originTable[origin].city_name);

//         const currentMapInstance = new googleMap.Map(document.getElementById('map'), {
//             zoom:defaultZoom,
//             scrollwheel:false,
//             center: {lat: from.lat, lng: from.lng},
//             styles: mapStyles
//         });

//         const to = await getDestinationGeocode(destinationCity);
//         if (!from || !to) {
//             // enable to get the line geocoordinate, return otherwise 
//             // it breaks the display
//             return;
//         }

//         let routeCoordinates = [
//             {lat: from.lat, lng: from.lng},
//             {lat: to.lat, lng: to.lng},
//         ];

//     const flightPath = new googleMap.Polyline({
//         path: routeCoordinates,
//         geodesic: true,
//         strokeColor: '#FF0000',
//         strokeOpacity: 1.0,
//         strokeWeight: 2
//     });
//     flightPath.setMap(currentMapInstance);
// }

return(
    <div id="map" >
    </div>
)

}

export default Map;