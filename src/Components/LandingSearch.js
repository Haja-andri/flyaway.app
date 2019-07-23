import React from 'react';
import MainSearchForm from './Forms/MainSearchForm'


export default function LandingHeader(props) {
    return(
        <div className="header-content">
        <div className="search-form-container">
          <MainSearchForm 
            submitAirport={props.submitAirport} 
            reRenderWithFlights={props.reRenderWithFlights} 
            currentMode={props.currentMode}/>
        </div>
        <div className="showcase">
        </div>
        </div>
    );
}