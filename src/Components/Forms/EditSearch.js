import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import styled from 'styled-components'



export default function EditSearch(props) {


    return(
      <EditSearchContainer>
        <OriginCityContainer>
          <label>YOU FLY FROM</label>
          <Row>
            <OriginCity>Paris</OriginCity>
            <OriginCity>Madrid</OriginCity>
            <OriginCity>Munich</OriginCity>
            <OriginCity>London</OriginCity>
            <OriginCity active>New York</OriginCity>
          </Row>
        </OriginCityContainer>
      </EditSearchContainer>
   );
}

const EditSearchContainer = styled.div`
  display:flex;
  justify-content:flex-start;
  border-bottom:1px solid #eeeeee;
  padding:15px;
`;

const OriginCityContainer = styled.div`
`;

const Row = styled.div`
  display:flex;
  padding-top:10px;
`;

const OriginCity = styled.div`
  padding:10px;
  margin-left:5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props => props.active ? "#5f9ea0" : "none"};
  color: ${props => props.active ? "white" : "none"};
  border: ${props => props.active ? "#D8ECF7" : "1px solid #eeeeee"};
`;