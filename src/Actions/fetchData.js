import { axiosWithAuth } from '../AxiosHub/axiosAttachData';

export const fetchDestinations = (cityCode) => {
    return new Promise( (resolve, reject)=>{
      const paramedAxios = axiosWithAuth();
      Promise.all([
        paramedAxios
      ])
      .then( axiosInstance =>{
        const axiosWithAuth = axiosInstance[0];
        axiosWithAuth.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${cityCode}`)
        .then(airport => {
          resolve( airport.data);
        })
        .catch(error => {
          reject(error);
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
        axiosWithAuth.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=5`)
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