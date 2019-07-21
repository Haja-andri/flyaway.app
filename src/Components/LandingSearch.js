import React from 'react';
import MainSearchForm from './Forms/MainSearchForm'


export default function LandingHeader(props) {
    return(
        <div className="header-content">
        <div className="search-form">
          <MainSearchForm submitAirport={props.submitAirport} isLoading={props.isLoading} reRenderWithFlights={props.reRenderWithFlights} />
        </div>
        <div className="showcase">
        </div>
        </div>
    );
}