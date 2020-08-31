import { axiosWithAuth } from '../AxiosHub/axiosAttachData';
const axios = require('axios'); 

export const fetchDestinations = (cityCode) => {
    return new Promise( (resolve, reject)=>{
      const paramedAxios = axiosWithAuth();
      Promise.all([
        paramedAxios
      ])
      .then( axiosInstance =>{
        const axiosWithAuth = axiosInstance[0];
        axiosWithAuth.get(`https://api.amadeus.com/v1/shopping/flight-destinations?origin=${cityCode}`)
        .then(airport => {
          resolve( airport.data);
        })
        .catch(error => {
          const errorCode = error.response.data.errors[0].code;
          reject(errorCode);
        }); 
      })
    }
    );
}

export const fetchAirportList =  (query) => {
    return new Promise((resolve, reject) =>{
      const paramedAxios = axiosWithAuth();
      Promise.all([
        paramedAxios
      ])
      .then(axiosInstance => {
        const axiosWithAuth = axiosInstance[0];
        axiosWithAuth.get(`https://api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=5`)
        .then(airport => {
          resolve(airport.data);
        })
        .catch(async (error) => {
          reject(error)
        });
      }) 
    }
    );
}

export const fetchDestinationGeocode =  (address) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
  .then(response => {
    // handle success
    return response.data.results[0].geometry.location;
  })
  .catch(error => {
    // handle error
    //console.log(error);
  });
}