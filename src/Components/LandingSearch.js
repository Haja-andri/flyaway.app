import React from 'react';
import styled from 'styled-components'


export default function LandingHeader(props) {
    return(
        <MainContainer>
            <MainTittle>
                <h1>Tell us where you are. <br/><span>We tell you where you can go</span></h1>
            </MainTittle>
            <CardContainer>
                <DestinationCard>
                    <img alt="paris" src="https://source.unsplash.com/TVyjcTEKHLU/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img alt="madrid" src="https://source.unsplash.com/YuH5zftcocA/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img alt="munich" src="https://source.unsplash.com/gGOzpDZ_Qz0/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img alt="london" src="https://source.unsplash.com/mOEqOtmuPG8/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img alt="nice" src="https://source.unsplash.com/C2WilptuEPY/750x1125" />
                </DestinationCard>
            </CardContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    height:100vh;
    background:white;
    padding-top:2%;
`;

const MainTittle = styled.div`
    padding-bottom:30px;
    h1{
        width:100%
        text-align:center;
        color:#36353A;
        span{
            color:#666666;
        }
    }
`;

const CardContainer = styled.div`
    display:flex;
    justify-content:center;
    height:80%;
    div:nth-child(2n){
        padding-top:50px;
    }
    div:nth-child(3n){
        padding-top:100px;
    }
    div:nth-child(4n){
        padding-top:35px;
    }
    div:nth-child(5n){
        padding-top:100px;
    }
`;

const DestinationCard = styled.div`
    display:flex;
    width:25%;
    max-width:350px;
    min-width:250px;
    padding:10px;
    :hover{
        cursor: pointer;
        transition: all 1s ease 0s;
        transform: translateY(-17px);
    }
    img{
        width:100%;
        min-height:350px;
        max-height:400px;
        border-radius:10px;
    }
`;