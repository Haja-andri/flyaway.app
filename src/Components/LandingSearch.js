import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


export default function LandingHeader(props) {
    return(
        <MainContainer>
            <MainTittle>
                <h1>Get travel inspiration </h1><h3>Tell us where you are. <br/>We'll you where you can go next</h3>
            </MainTittle>
            <CardContainer>
                <DestinationCard>
                    <ImageContainer>
                        <Link to="/result/PAR">
                            <img alt="paris" src="https://source.unsplash.com/TVyjcTEKHLU/750x1125" />
                            <CenteredText><div><h2>Paris</h2></div></CenteredText>
                        </Link>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <Link to="/result/MAD">
                            <img alt="madrid" src="https://source.unsplash.com/YuH5zftcocA/750x1125" />
                            <CenteredText><div><h2>Madrid</h2></div></CenteredText>
                        </Link>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <Link to="/result/MUC">
                            <img alt="munich" src="https://source.unsplash.com/gGOzpDZ_Qz0/750x1125" />
                            <CenteredText><h2>Munich</h2></CenteredText>
                        </Link>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <Link to="/result/LON">
                            <img alt="london" src="https://source.unsplash.com/mOEqOtmuPG8/750x1125" />
                            <CenteredText><h2>London</h2></CenteredText>
                        </Link>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <Link to="/result/NYC">
                            <img alt="nice" src="https://source.unsplash.com/C2WilptuEPY/750x1125" />
                            <CenteredText><h2>New York</h2></CenteredText>
                        </Link>
                    </ImageContainer>
                </DestinationCard>
            </CardContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    height:100vh;
    padding-top:20px;
    background:linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #D9DBE0 100%);
    padding-bottom:50px;
    h1, h3{
        width:100%
        text-align:center;
        color:#36353A;
    }
    h3{
        padding-top:15px;
        color:#5f9ea0;
    }
    @media screen and (min-width: 300px) {
        h1, h3{
            width: 90%;
            margin:0 auto;
        }
        h1{
            font-size: 2.2rem;
        }
        h3{
            font-size: 1.3rem;
        }
    }
    @media screen and (max-width: 1200px) {
        h2{
            font-size: 1.2rem;
        }
    }
    @media screen and (max-width: 400px) {
        h2{
            font-size: 2rem;
        }
    }
`;

const MainTittle = styled.div`
`;

const CardContainer = styled.div`
    display:flex;
    justify-content:space-between;
    height:80%;
    max-width: 1600px;
    margin:0 auto;
    overflow-x: auto;
    padding-top:10px;
    div:nth-child(2n){
        @media screen and (min-width: 1200px) {
            padding-top:50px;
        }
    }
    }
    div:nth-child(3n){
        @media screen and (min-width: 1200px) {
            padding-top:100px;
        }
    }
    div:nth-child(4n){
        @media screen and (min-width: 1200px) {
            padding-top:35px;
        }
    }
    div:nth-child(5n){
        @media screen and (min-width: 1200px) {
            padding-top:100px;
        }
    }
`;

const DestinationCard = styled.div`
    display:flex;
    width:25%;
    max-width:350px;
    min-width:200px;
    padding:10px;
    @media screen and (max-width: 400px) {
        min-width:300px;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    text-align: center;
    color: white;
    img{
        width:100%;
        height:auto;
        min-height:250px;
        max-height:450px;
        border-radius:10px;
        @media screen and (max-width: 400px) {
            min-height:300px;
            max-height:400px;
        }
    }
    :hover{
        cursor: pointer;
        transition: all 1s ease 0s;
        transform: translateY(-17px);
    }
`;

const CenteredText = styled.div`
    position: absolute;
    width:100%;
    top: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    color:white;
    @media screen and (min-width: 350px) {
        padding-top:40px;
    }

`;