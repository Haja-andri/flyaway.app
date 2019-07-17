import { axiosWithAuth } from '../AxiosHub/axiosAttachData'
export const fetchDestinations = () => {
    return getDummyFlights();
}

export const fetchAirportList = (query) => {
    return axiosWithAuth().get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${query}&page[limit]=5`)
    .then(airport => {
      return airport.data;
    })
    .catch(error => {
      console.log(error);
    });
}


function getDummyFlights(){
    return {
        "data": [
            {
                "type": "flight-destination",
                "origin": "PAR",
                "destination": "VIE",
                "departureDate": "2019-09-02",
                "returnDate": "2019-09-06",
                "price": {
                    "total": "111.13"
                },
                "links": {
                    "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=PAR&destination=VIE&departureDate=2019-07-17,2020-01-12&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
                    "flightOffers": "https://test.api.amadeus.com/v1/shopping/flight-offers?origin=PAR&destination=VIE&departureDate=2019-09-02&returnDate=2019-09-06&adults=1&nonStop=false"
                }
            },
            {
                "type": "flight-destination",
                "origin": "PAR",
                "destination": "BIO",
                "departureDate": "2019-11-16",
                "returnDate": "2019-11-23",
                "price": {
                    "total": "133.33"
                },
                "links": {
                    "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=PAR&destination=BIO&departureDate=2019-07-17,2020-01-12&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
                    "flightOffers": "https://test.api.amadeus.com/v1/shopping/flight-offers?origin=PAR&destination=BIO&departureDate=2019-11-16&returnDate=2019-11-23&adults=1&nonStop=false"
                }
            },
            {
                "type": "flight-destination",
                "origin": "PAR",
                "destination": "NYC",
                "departureDate": "2019-11-05",
                "returnDate": "2019-11-12",
                "price": {
                    "total": "251.25"
                },
                "links": {
                    "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=PAR&destination=NYC&departureDate=2019-07-17,2020-01-12&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
                    "flightOffers": "https://test.api.amadeus.com/v1/shopping/flight-offers?origin=PAR&destination=NYC&departureDate=2019-11-05&returnDate=2019-11-12&adults=1&nonStop=false"
                }
            },
            {
                "type": "flight-destination",
                "origin": "PAR",
                "destination": "DXB",
                "departureDate": "2019-09-11",
                "returnDate": "2019-09-14",
                "price": {
                    "total": "312.41"
                },
                "links": {
                    "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=PAR&destination=DXB&departureDate=2019-07-17,2020-01-12&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
                    "flightOffers": "https://test.api.amadeus.com/v1/shopping/flight-offers?origin=PAR&destination=DXB&departureDate=2019-09-11&returnDate=2019-09-14&adults=1&nonStop=false"
                }
            }
        ],
        "dictionaries": {
            "currencies": {
                "EUR": "EURO"
            },
            "locations": {
                "PAR": {
                    "subType": "CITY",
                    "detailedName": "PARIS"
                },
                "VIE": {
                    "subType": "AIRPORT",
                    "detailedName": "VIENNA INTERNATIONAL"
                },
                "BIO": {
                    "subType": "AIRPORT",
                    "detailedName": "BILBAO AIRPORT"
                },
                "NYC": {
                    "subType": "CITY",
                    "detailedName": "NEW YORK"
                },
                "DXB": {
                    "subType": "AIRPORT",
                    "detailedName": "DUBAI INTL"
                }
            }
        },
        "meta": {
            "currency": "EUR",
            "links": {
                "self": "https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&departureDate=2019-07-17,2020-01-12&oneWay=false&duration=1,15&nonStop=false&viewBy=DESTINATION"
            },
            "defaults": {
                "departureDate": "2019-07-17,2020-01-12",
                "oneWay": false,
                "duration": "1,15",
                "nonStop": false,
                "viewBy": "DESTINATION"
            }
        }
    }
}