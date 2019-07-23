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

export const fetchAirportList = (query) => {
    return axiosWithAuth().get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=5`)
    .then(airport => {
      return airport.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export const fetchGoogleMapApi = () =>{
  fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzxtVBJkcrbmLNwX7Jv6OFhHMs4qBK4A')
  .then(map => {
    return map;
  })
  .catch(error => {
    debugger
    console.log(error);
  });
}