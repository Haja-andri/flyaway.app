import React, { useEffect, useState } from "react";
import { loadMap, getDestinationGeocode } from "../utils/maps/googleMapApi";
import mapStyles from "../css/mapStyling";

const Map = (props) => {
  const {
    originTable,
    origin,
    destination,
    clearRoute,
    clearRouteFromMap,
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

  // useEffect that updated the map with
  // route when the user hover a given destination
  useEffect(() => {
    if (mapLoaded) {
      if (polyLineInstance) {
        polyLineInstance.setMap(null);
      }
      showRouteOnMap(destination);
    }
  }, [destination]);

  // use effect to update the map when origin is changed
  useEffect(() => {
    if (mapLoaded) {
      updateMapCenter(origin);
    }
  }, [origin]);

  useEffect(() => {
    // if a polyline is already there we clear it
    if (polyLineInstance && clearRoute) {
      polyLineInstance.setMap(null);
      //setPolyLineInstance(null);
    }
    // this function will reset the state of
    // clearRoute to false on the parent component
    clearRouteFromMap(false);
  }, [clearRoute, clearRouteFromMap]);

  const showRouteOnMap = async (destination) => {
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

    // This is to make sure that the previous
    // polyline have been cleared before rendering a new one
    if (polyLineInstance && destination) {
      const path = polyLineInstance.getPath();
      //console.log(path.getAt())
      // Iterate over the vertices.
//      for (var i = 0; i < path.getLength(); i++) {
        path.clear();
  //    }
      polyLineInstance.setPath(routeCoordinates)
      polyLineInstance.setMap(mapInstance)
    }

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
  };

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default Map;
