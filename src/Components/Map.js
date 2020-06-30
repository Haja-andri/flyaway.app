import React, { useEffect, useState } from "react";
import { loadMap, getDestinationGeocode } from "../utils/maps/googleMapApi";
import mapStyles from "../css/mapStyling";

const Map = (props) => {
  const {
    originTable,
    origin,
    destination,
    destinations,
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
      destinations.data.forEach(async (flight, key) => {
        const markerCoordinate = await getDestinationGeocode(
          destinations.dictionaries.locations[flight.destination].detailedName
        );
        if (markerCoordinate) {
          // add the markers on the map
          new googleMap.Marker({
            map: mapInstance,
            position: markerCoordinate,
            styles: mapStyles,
          });
        }
        else {
          // clean the data from undefined coodinate
          destinations.data.splice(key, 1)
        }
      });
    };
    if (destinations) {
      //console.log(destinations.data)
      buildMarkers();
    }
  }, [destinations]);

  /**
   * useEffect that updated the map with
   * route when the user hover a given destination
   * change in the destination will trigger the effect
   */
  useEffect(() => {
    if (mapLoaded) {
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
    const from = await getDestinationGeocode(originTable[origin].city_name);
    const to = await getDestinationGeocode(destination);
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
        strokeWeight: 2,
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
