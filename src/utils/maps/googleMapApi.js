import { fetchDestinationGeocode } from '../../Actions/fetchData';

// loading the google map API for the component to use
export const loadGoogleMapApi = () => {
    // #1 the component call this function
    // #2 it will set-up the script on the body
    // and trigger the API call to the URL with the params and API key
    // the params take a callback function set at global leve (window.initGoogleMapPromise) that is
    // invoked once the API is loaded as a global object attached to
    // window
    // #3 the callback resolve the promise with window.google (previously set in the API call)
    // #4 we clear the callback function from window
    // #5 return the resolved promise (maps API) to the calling component
return new Promise(
    (resolve, reject)=> {
    window.initGoogleMapPromise = () =>{
        resolve(window.google);
        delete window.initGoogleMapPromise;
    }
    const script = document.createElement('script');
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initGoogleMapPromise`;
    document.body.appendChild(script);    
    }
);
}

export const setMapCenterToCurrentLocation = (origin, currentMapInstance, googleMap) => {
    const geocoderInstance = new googleMap.Geocoder();
    geocoderInstance.geocode({'address': origin}, (results, status) =>{
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

export const getDestinationGeocode = async (address) => {
    let geocode = await fetchDestinationGeocode(address);
    return geocode;
}

export const getDestinationsGeocodeByBatch = async (destinationData) => {
    let destinationGeocodeArray = [];
    destinationData.data.forEach(async(city) => {
        let address = destinationData.dictionaries.locations[city.destination].detailedName;
        // du to google map limitation on JS library query per seconds
        // we use the webservice over http which has no limitation
        let geocode = await fetchDestinationGeocode(address);
        destinationGeocodeArray.push({ address, geocode });
    });
    return destinationGeocodeArray;
}