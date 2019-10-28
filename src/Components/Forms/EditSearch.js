import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



export default function EditSearch(props) {
  const { originTable } = props
  return(
    <EditSearchContainer>
      <OriginCityContainer>
        <label>YOU ARE FLYING FROM</label>
        <Row>
          {Object.keys(originTable).map((origin) => (
            <Link to={`/result/${origin}`}>
              <OriginCity active={originTable[origin].active}>{originTable[origin].city_name}</OriginCity>
            </Link>
            ))
          }
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
  font-size: .8rem;
  background-color: ${props => props.active ? "#5f9ea0" : "none"};
  color: ${props => props.active ? "white" : "none"};
  border: ${props => props.active ? "#D8ECF7" : "1px solid #eeeeee"};
`;