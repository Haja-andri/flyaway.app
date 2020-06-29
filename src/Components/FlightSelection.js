import React from "react";
import { useState, useEffect } from "react";
// function that loads google map api
import { fetchDestinations } from "../Actions/fetchData";
import Map from "./Map";
import EditSearch from "./Forms/EditSearch";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function FlightSelection(props) {
  const [mousePosition, setMousePosition] = React.useState("");
  const [mouseStopped, setMouseStopped] = React.useState(false);

  const override = css`
    margin: 0;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
  `;

  const originTable = {
    MAD: {
      city_name: "MADRID",
      active: false,
    },
    MUC: {
      city_name: "MUNICH",
      active: false,
    },
    PAR: {
      city_name: "PARIS",
      active: false,
    },
    NYC: {
      city_name: "NEW YORK",
      active: false,
    },
    LON: {
      city_name: "LONDON",
      active: false,
    },
  };
  // set the current origin to active => true
  originTable[props.match.params.ori].active = true;

  // Set curent origin in local state
  const [origin, SetOrigin] = useState(props.match.params.ori);
  // list of destination
  const [destinations, setDestinations] = useState(null);
  // single destination
  const [destination, setDestination] = useState(null);
  // clear route from map
  const [clearRoute, setClearRoute] = useState(false);
  // error message
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    () => {
      SetOrigin(props.match.params.ori);
    },
    [props.match.params.ori] // force to re-render the component when receiving new props
  );

  // Get the destination list based on origin
  useEffect(() => {
    const getDestinations = async (origin) => {
      setDestinations(null);
      try {
        const destinationsList = await fetchDestinations(origin);
        setDestinations(destinationsList);
      } catch (error) {
        setErrorMessage(
          "an error occured while looking for your data, please try again later"
        );
      }
    };
    getDestinations(origin);
  }, [origin]);

  const showRouteOnMap = (destination) => {
    // event.preventDefault();
    //const destination = event.target.id
    setDestination(destination);
  };

  const trackMouseStop = (event) => {
    setMouseStopped(false)
    var onmousestop = function () {
        setMouseStopped(true)
      },
      thread;
    clearTimeout(thread);
    thread = setTimeout(onmousestop, 500);
  };

  const handleMouseEnter = (destination) => {
    setMousePosition(destination);
  };

  const handleMouseLeave = () => {
    setDestination(null)
    setClearRoute(true);
    setMousePosition("")
  }

  useEffect(()=>{
    if (mouseStopped && mousePosition){
      showRouteOnMap(mousePosition);
    }
  }, [mouseStopped, mousePosition]

  )

  return (
    <>
      <div>
        <EditSearch
          submitAirport={props.submitAirport}
          reRenderWithFlights={props.reRenderWithFlights}
          originTable={originTable}
        />
      </div>
      <div className="search-result-container">
        <div className="result-list-container">
          {errorMessage && <div className="flight-item">{errorMessage}</div>}
          {destinations ? (
            destinations.data.map((flight) => (
              <div
                key={flight.origin + flight.destination}
                id={
                  destinations.dictionaries.locations[flight.destination]
                    .detailedName
                }
                className="flight-item"
                onMouseMove={(e) => trackMouseStop(e)}
                onMouseEnter={() => {
                  handleMouseEnter(
                    destinations.dictionaries.locations[flight.destination]
                      .detailedName
                  );
                }}
                onMouseLeave={() => {handleMouseLeave()}}
              >
                <div>
                  <h4 className="destination-name">
                    {
                      destinations.dictionaries.locations[flight.destination]
                        .detailedName
                    }
                  </h4>
                </div>

                <div className="flight-details">
                  <div>
                    <label>Flying on </label>
                    <div className="date-up">{flight.departureDate}</div>
                  </div>
                  <div>
                    <label>Returngin on </label>
                    <div className="date-down">{flight.returnDate}</div>
                  </div>
                  <div className="large-display">
                    {flight.price.total}{" "}
                    <span className="small-display">
                      {destinations.meta.currency}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flight-item">
              <PropagateLoader
                css={override}
                widthUnit={"%"}
                size={10}
                color={"#5f9ea0"}
                loading={true}
              />
            </div>
          )}
        </div>
        <div className="result-map">
          <Map
            originTable={originTable}
            origin={origin}
            destination={destination}
            clearRoute={clearRoute}
            setClearRoute={setClearRoute}
          />
        </div>
      </div>
    </>
  );
}
