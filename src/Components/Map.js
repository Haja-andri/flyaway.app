import React, { useEffect, useState, useCallback } from "react";
import { loadMap, getDestinationGeocode } from "../utils/maps/googleMapApi";
import mapStyles from "../css/mapStyling";

const Map = (props) => {
  const {
    originTable,
    origin,
    destination,
    destinations,
    setFilteredDestinations,
    clearRoute,
    setClearRoute,
  } = props;

  const getLocalState = (item) => {
    const localData = localStorage.getItem(item);
    if (localData) return JSON.parse(localData);
    else return null;
  };

  const setLocalStorage = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data));
  };

  // google map
  const [defaultZoom] = useState(4);
  const [googleMap, setGoogleMap] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [polyLineInstance, setPolyLineInstance] = useState(null);
  const [destinationsLength , setDestinationsLength] = useState(0);
  const [markersList, setMarkersList ] =  useState([]);
  const [coordinates, setCoordinates] = useState(
    getLocalState("coordinates") || {}
  );
  const [nonValidDestinations, setNonValidDestinations] = useState(
    getLocalState("nonvalid") || []
  );
  const [newCoordinates, setNewCoordinates] = useState(false);

  const memoizedMapDefaultView = useCallback(
    (mapAPI) => {
      const mapDefaultView = async (mapAPI) => {
        setGoogleMap(mapAPI);
        // setCurrentCityCenter(originTable[origin].city_name)
        // we get the map centered on the current origin by default
        const center = await getDestinationGeocode(
          originTable[origin].city_name
        );

        const currentMapInstance = new mapAPI.Map(
          document.getElementById("map"),
          {
            zoom: defaultZoom,
            scrollwheel: false,
            center,
            styles: mapStyles,
          }
        );
        // add the marker to the center
        const marker = new mapAPI.Marker({
          map: currentMapInstance,
          position: center,
          styles: mapStyles,
        });
        // add this marker to the markers list tracker
        // so it can be removed later
        setMarkersList(markersList => [...markersList, marker])
        setMapInstance(currentMapInstance);
      };
      mapDefaultView(mapAPI);
    },
    [origin, originTable, defaultZoom]
  );

  const memoizedRemoveRoute = React.useCallback(() => {
    /**
     * we clear the current path (previously was
     * using polyLineInstance.setMap(null) to remove
     * the current polyline but hadd lots of state synching issue)
     * path.clear() does the same by manipullating directly the object
     * property
     */
    const removeRoute = () => {
      if (!polyLineInstance) return;
      const path = polyLineInstance.getPath();
      path.clear();
    };
    removeRoute();
  }, [polyLineInstance]);


  const memoizedUpdateMapCenter = useCallback(
    (newCenter) => {
      const updateMapCenter = async (newCenter) => {
        const center = await getDestinationGeocode(
          originTable[newCenter].city_name
        );
        mapInstance.setCenter(center);
        // reset current marker
        // if (currentCenter){
        //   currentCenter.setMap(null);
        // }
        // create a new one with the new center
        const newMarker = new googleMap.Marker({
          map: mapInstance,
          position: center,
          styles: mapStyles,
        });
        setMarkersList(markersList => [...markersList, newMarker])
        // update the marker instance
      };

      updateMapCenter(newCenter);
    },
    [googleMap, mapInstance, originTable]
  );

  const memoizedBuildMarkers = useCallback(
    (destinations, center) => {
      const buildMarkers = () => {
        // if we have an empty object in the state
        // we run the API request to
        // 1. get the coordinates
        // 2. Render the markers
        // 3. Set the coordinates in state
        // {
        let dataLength = destinations.data.length;
        let filteredFlights = [];
        let destinationList = [];
        let i = 0;
        let flights;
        let newCoordinates = false;
        let newNonValidDestinations = [];
        // clear the current markers on the map
        // before loading the new ones
        if(markersList.length > 0) {
          markersList.forEach((marker)=>{
            marker.setMap(null);
          });
          setMarkersList([])
        }
        // set the new center
        memoizedUpdateMapCenter(center)
        // Amadeus can send thousands of destinations
        // to prevent exceeding google map limit, we splice the destination array 
        // to maximum 50 destinations
        let maxDestinations = parseInt(process.env.REACT_APP_MAX_DESTINATIONS, 10);
        if(dataLength > maxDestinations){
          flights = destinations.data.slice(0,++maxDestinations);
          dataLength = maxDestinations;
        }
        flights.forEach(async (flight, index) => {
          const destination =
            destinations.dictionaries.locations[flight.destination]
              .detailedName;
          // the destination is not in state yet. And it is not in the
          // non valid destination yet
          if (
            !(destination in coordinates) &&
            !nonValidDestinations.includes(destination)
          ) {
            newCoordinates = true;
            // we make call to API to get the coordinate
            const markerCoordinate = await getDestinationGeocode(destination);
            if (markerCoordinate) {
              // add the markers on the map
              const marker = new googleMap.Marker({
                map: mapInstance,
                position: markerCoordinate,
                styles: mapStyles,
              });
              // add it to the list of markers for reference
              setMarkersList(markersList => [...markersList, marker])
              //Storing the coordinates in local state
              // to avoid API call in future reference
              setCoordinates((prevState) => ({
                ...prevState,
                [destination]: markerCoordinate,
              }));
              // builder the new flight data by
              // flitering with only the destination
              // that has coordinates
              filteredFlights.push(flight);
            }
            // this destination is not returning
            // any valid coordinate, we black list it
            else {
              newNonValidDestinations.push(destination);
            }
          }
          // The destination is already in the state
          else {
            //
            // we render the marker on the map
            const marker = new googleMap.Marker({
              map: mapInstance,
              position: coordinates[destination],
              styles: mapStyles,
            });
              // add it to the list of markers for reference
              //markersList.push(marker);
              setMarkersList(markersList => [...markersList, marker])
            // we add to the filtered data to be rendered
            // on the side list, only if
            // #1 it was not in the list yet (avoiding duplication --- Amadeus issue)
            // #2 Not listed in non valid destination (no coordinates)
            if (
              !destinationList.includes(destination) &&
              !nonValidDestinations.includes(destination)
            ) {
              filteredFlights.push(flight);
            }
            // maintain current list of destinations (local loop)
            destinationList.push(destination);
          }
          if (i === dataLength - 1) {
            // we ran through the entire array
            // we mutate destination.data
            //destinations.data = filteredFlights;
            //then push the filtered data to the parent component
            // to render the side list synched with the markers
            setFilteredDestinations(filteredFlights);
            if (newCoordinates) {
              setNewCoordinates(true);
            }
            if (newNonValidDestinations.length > 0) {
              setNonValidDestinations(
                nonValidDestinations.concat(newNonValidDestinations)
              );
            }
          }
          i++;
        });
      };
      buildMarkers();
    },
    // dependencies
    [
      coordinates,
      markersList,
      googleMap,
      mapInstance,
      nonValidDestinations,
      setFilteredDestinations,
      memoizedUpdateMapCenter
    ]
  );

  /** The very first effect run (only once)
   * to laod the API and render the default view
   * incliding the markers
   */
  useEffect(
    () => {
      if (!mapInstance) {
        const getMapAPI = async () => {
          memoizedMapDefaultView(await loadMap());
          // will get the MAP js API loaded
          // and pass it to default view
        };
        getMapAPI();
      }
    },
    [mapInstance, memoizedMapDefaultView] // Nothing in the array means the use effect will run only once
  );

  /**
   * Useffect trigged with new destinations
   * to render the markers on the Map
   */
  useEffect(() => {
    if (destinations && destinationsLength !== destinations.data.length) {
      setDestinationsLength(destinations.data.length);
      memoizedBuildMarkers(destinations, origin);
    }
  }, [destinations, origin, memoizedBuildMarkers, destinationsLength]);

  // Effect that update local storage with new data
  // (coordinates)
  useEffect(() => {
    if (newCoordinates) {
      setLocalStorage("coordinates", coordinates);
      setNewCoordinates(false);
    }
  }, [newCoordinates, coordinates]);

  // update local storage with new data
  // (non valid destination --> no coordinate from API)
  useEffect(() => {
    setLocalStorage("nonvalid", nonValidDestinations);
  }, [nonValidDestinations]);

  const memoizedShowRouteOnMap = useCallback(
    (destination) => {
      /**
       *
       * @param {*} destination
       * Function that will render the route on the map based
       * on current origin and destination received
       */
      const showRouteOnMap = async (destination) => {
        // get the to (destination) and from (origin)
        const from = originTable[origin].location;
        const to = coordinates[destination];
        if (!from || !to) {
          // unable to get the line geocoordinate, return otherwise
          // it breaks the display
          return;
        }
        let routeCoordinates = [
          { lat: from.lat, lng: from.lng },
          { lat: to.lat, lng: to.lng },
        ];

        /**
         * for the first polyline rendered, we do not have
         * a polyline instance yet so we create a polyline
         * instance that can be reused subsequently to render
         * new route without needed a new map instance nor polyline
         * instance
         */
        if (!polyLineInstance) {
          // create the new polyline
          const flightPath = new googleMap.Polyline({
            path: routeCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
          });
          // display the new polyline
          flightPath.setMap(mapInstance);
          // Keep the new polyline in state
          // so we can clear it later
          setPolyLineInstance(flightPath);
        }

        // We already have a polyline instence and
        // a destination
        if (polyLineInstance && destination) {
          memoizedRemoveRoute();
          polyLineInstance.setPath(routeCoordinates);
          polyLineInstance.setMap(mapInstance);
        }
      };
      showRouteOnMap(destination);
    },
    [
      coordinates,
      googleMap,
      mapInstance,
      origin,
      originTable,
      polyLineInstance,
      memoizedRemoveRoute,
    ]
  );

  /**
   * useEffect that updated the map with
   * route when the user hover a given destination
   * change in the destination will trigger the effect
   */
  useEffect(() => {
    if (!destination) {
      memoizedRemoveRoute();
    } else if (mapInstance && destination) {
      memoizedShowRouteOnMap(destination);
    }
  }, [destination, memoizedShowRouteOnMap, memoizedRemoveRoute, mapInstance]);

  /**
   * This effect will clear current route (if any)
   * when the mouse leave the destination box
   */
  useEffect(() => {
    if (clearRoute) {
      memoizedRemoveRoute();
      setClearRoute(false);
    }
  }, [clearRoute, setClearRoute, memoizedRemoveRoute]);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default Map;
