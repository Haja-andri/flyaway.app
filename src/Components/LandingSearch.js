import React from 'react';
import styled from 'styled-components'


export default function LandingHeader(props) {
    return(
        <MainContainer>
            <MainTittle>
                <h1>Travel inspiration, from where you are</h1>
            </MainTittle>
            <CardContainer>
                <DestinationCard>
                    <img src="https://source.unsplash.com/TVyjcTEKHLU/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img src="https://source.unsplash.com/zVdf2Hmrcxw/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img src="https://source.unsplash.com/gGOzpDZ_Qz0/750x1125" />
                </DestinationCard>
                <DestinationCard>
                    <img src="https://source.unsplash.com/mOEqOtmuPG8/750x1125" />
                </DestinationCard>
                <DestinationCard>
                <img src="https://source.unsplash.com/mZ0sV5KjTVQ/750x1125" />
                </DestinationCard>
            </CardContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    border:1px solid red;
    height:100vh;
    background:white;
    padding-top:10%;
`;

const MainTittle = styled.div`
    padding-bottom:30px;
    h1{
        border:1px solid blue;
        width:100%
        text-align:center;
    }
`;

const CardContainer = styled.div`
    display:flex;
    border:1px solid green;
    justify-content:center;
    height:80%;
    div:nth-child(2n){
        padding-top:50px;
    }
    div:nth-child(3n){
        padding-top:100px;
    }
    div:nth-child(4n){
        padding-top:30px;
    }
    div:nth-child(5n){
        padding-top:100px;
    }
`;

const DestinationCard = styled.div`
    display:flex;
    border:1px solid yellow;
    width:25%;
    max-width:300px;
    min-width:200px;
    padding:10px;
    :hover{
        cursor: pointer;
        transition: all 1s ease 0s;
        transform: translateY(-17px);
    }
    img{
        width:100%;
        max-height:450px;
        border-radius:10px;
    }
`;