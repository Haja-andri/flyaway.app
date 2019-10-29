import React from 'react';
import { useState, useEffect } from 'react';
import { fetchAirportList, fetchDestinations } from '../../Actions/fetchData';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



export default function EditSearch(props) {
  const { originTable } = props

  const showOriginOptions = () => {
    // Methode 1 forEach() on Nodelist
    let cities = document.querySelectorAll('.origin-city');
    cities.forEach((city)=>{
      city.style.display = "block";
    });
    // Other method by mapping the NodeList to an array
    //const cityArray = [...document.querySelectorAll('.origin-city')]
    // for(let i=0; i<cityArray.length; i++){
    //   cityArray[i].style.display = 'block';
    // }
  }

  const hideOriginOptions = () => {
    // Methode 1 forEach() on Nodelist
    let cities = document.querySelectorAll('.origin-city');
    cities.forEach((city)=>{
      if(originTable[city.id].active){
        city.style.display = "block";
      }
      else city.style.display = "none";
    });
    // Other method by mapping the NodeList to an array
    //const cityArray = [...document.querySelectorAll('.origin-city')]
    // for(let i=0; i<cityArray.length; i++){
    //   cityArray[i].style.display = 'block';
    // }
  }

  useEffect(()=>{
    hideOriginOptions();
  }

  );


  return(
    <EditSearchContainer>
      <OriginCityContainer>
        <EditLabel>YOU ARE FLYING FROM <span onClick={showOriginOptions}>(change)</span></EditLabel>
        <Row>
          {Object.keys(originTable).map((origin) => (
            <Link to={`/result/${origin}`}>
              <OriginCity id={origin} className="origin-city" active={originTable[origin].active}>{originTable[origin].city_name}</OriginCity>
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
  width: 100%;
`;

const Row = styled.div`
  display:flex;
  padding-top:5px;
`;

const OriginCity = styled.div`
  padding:10px;
  margin-left:5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: .8rem;
  background-color: none;
  color: none;
  border: ${props => props.active ? "1px solid #5f9ea0" : "1px solid #eeeeee"};
  display: ${props => props.active ? "block" : "none"};
  :hover{
    transition: all 0.4s ease 0s;
    transform: translateY(-5px);
    border:1px solid #5f9ea0;
  }
`;

const EditLabel = styled.label`
  span{
    font-size:10px;
    color:lightpink;
    :hover{
      cursor:pointer;
    }
  }
`;