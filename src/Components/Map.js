import React, { useEffect, useState } from "react";
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
  // google map
  const [defaultZoom] = useState(4);
  const [googleMap, setGoogleMap] = useState(null);
  const [mapLoaded, setmapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [markerInstance, setMarkerInstance] = useState(null);
  const [polyLineInstance, setPolyLineInstance] = useState(null);
  const [isFilteredDestionations, setIsFilteredDestionations] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const mapDefaultView = async (mapAPI) => {
    setGoogleMap(mapAPI);
    setmapLoaded(true);
    // setCurrentCityCenter(originTable[origin].city_name)
    // we get the map centered on the current origin by default
    const center = await getDestinationGeocode(originTable[origin].city_name);

    const currentMapInstance = new mapAPI.Map(document.getElementById("map"), {
      zoom: defaultZoom,
      scrollwheel: false,
      center,
      styles: mapStyles,
    });
    // add the marker to the center
    const marker = new mapAPI.Marker({
      map: currentMapInstance,
      position: center,
      styles: mapStyles,
    });
    // keep instance of Map available to the component life cycle
    setMapInstance(currentMapInstance);
    setMarkerInstance(marker);
  };

  const updateMapCenter = async (newCenter) => {
    const center = await getDestinationGeocode(
      originTable[newCenter].city_name
    );
    mapInstance.setCenter(center);
    // reset current marker
    markerInstance.setMap(null);
    // create a new one with the new center
    const newMarker = new googleMap.Marker({
      map: mapInstance,
      position: center,
      styles: mapStyles,
    });
    // update the marker instance
    setMarkerInstance(newMarker);
  };

  /** The very first effect run (only once)
   * to laod the API and render the default view
   * incliding the markers
   */
  useEffect(
    () => {
      const getMapAPI = async () => {
        // will get the MAP js API loaded
        // and pass it to default view
        mapDefaultView(await loadMap());
      };
      getMapAPI();
    },
    [] // Nothing in the array means the use effect will run only once
  );

  useEffect(() => {
    const buildMarkers = () => {
      //const data = destinations.data;
      let dataLength = destinations.data.length
      let filteredDestination = [];
      let i = 0;
      destinations.data.forEach(async (flight, index) => {
        const destination =
          destinations.dictionaries.locations[flight.destination].detailedName;
        const markerCoordinate = await getDestinationGeocode(destination);
        if (markerCoordinate) {
          // add the markers on the map
          new googleMap.Marker({
            map: mapInstance,
            position: markerCoordinate,
            styles: mapStyles,
          });
          //Storing the coordinates to fasten future reference
          setCoordinates((prevState) => ({
            ...prevState,
            [destination]: markerCoordinate,
          }));
          // builder the new flight data by
          // flitering with only the destination
          // that has coordinates
          filteredDestination.push(flight);
        } 

        if(i === dataLength-1){
          // we ran through the entire array 
          // we mutate destination.data
          destinations.data = filteredDestination;
          //then push the filtered data to the parent component
          // to render the side list synched with the markers
          setFilteredDestinations(destinations)
        }
        i++;
      });
    };
    if (destinations) {
      buildMarkers();
    }
  }, [destinations]);


  // useEffect(() => {
  //   if (isFilteredDestionations) {
  //     setFilteredDestinations(destinations);
  //     setIsFilteredDestionations(false);
  //   }
  // }, [isFilteredDestionations]);

  /**
   * useEffect that updated the map with
   * route when the user hover a given destination
   * change in the destination will trigger the effect
   */
  useEffect(() => {
    if (mapLoaded && destination) {
      showRouteOnMap(destination);
    }
  }, [destination]);

  /**
   * Use effect to update the map when origin is changed
   * to recenter the map on the new origin
   */
  useEffect(() => {
    if (mapLoaded) {
      updateMapCenter(origin);
    }
  }, [origin]);

  /**
   * This effect will clear current route (if any)
   * when the mouse leave the destination box
   */
  useEffect(() => {
    if (clearRoute) {
      removeRoute();
      setClearRoute(false);
    }
  }, [clearRoute]);

  /**
   *
   * @param {*} destination
   * Function that will render the route on the map based
   * on current origin and destination received
   */

  const showRouteOnMap = async (destination) => {
    // get the to (destination) and from (origin)
    const from = originTable[origin].location
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
      removeRoute();
      polyLineInstance.setPath(routeCoordinates);
      polyLineInstance.setMap(mapInstance);
    }
  };

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

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default Map;
