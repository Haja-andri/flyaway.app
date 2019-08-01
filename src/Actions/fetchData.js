import { axiosWithAuth } from '../AxiosHub/axiosAttachData'

export const fetchDestinations = (cityCode) => {
    return axiosWithAuth().get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${cityCode}`)
    .then(airport => {
      return airport.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export const fetchAirportList =  (query) => {
    return axiosWithAuth().get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=5`)
    .then(airport => {
      return airport.data;
    })
    .catch(async (error) => {
      if(error.message.includes('401')){
        await getSessionToken()
          console.log('back with session token');
      }
    });
}

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
      //const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAHzxtVBJkcrbmLNwX7Jv6OFhHMs4qBK4A';
      const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyDzSwGw3uenE5Hn_kISq948u5kRfH8E8OI';
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initGoogleMapPromise`;
      document.body.appendChild(script);    
    }
  );
}

function getSessionToken(){
  console.log('getting session token');
  return;
} 