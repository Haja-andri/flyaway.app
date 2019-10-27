import React from 'react';
import styled from 'styled-components'


export default function LandingHeader(props) {
    return(
        <MainContainer>
            <MainTittle>
                <h1>Get travel inspiration </h1><h3>Tell us where you are. <br/>We tell you where you can go next</h3>
            </MainTittle>
            <CardContainer>
                <DestinationCard>
                    <ImageContainer>
                        <img alt="paris" src="https://source.unsplash.com/TVyjcTEKHLU/750x1125" />
                        <CenteredText><div><h2>Paris</h2></div></CenteredText>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <img alt="madrid" src="https://source.unsplash.com/YuH5zftcocA/750x1125" />
                        <CenteredText><div><h2>Madrid</h2></div></CenteredText>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <img alt="munich" src="https://source.unsplash.com/gGOzpDZ_Qz0/750x1125" />
                        <CenteredText><h2>Munich</h2></CenteredText>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <img alt="london" src="https://source.unsplash.com/mOEqOtmuPG8/750x1125" />
                        <CenteredText><h2>London</h2></CenteredText>
                    </ImageContainer>
                </DestinationCard>
                <DestinationCard>
                    <ImageContainer>
                        <img alt="nice" src="https://source.unsplash.com/C2WilptuEPY/750x1125" />
                        <CenteredText><h2>Nice</h2></CenteredText>
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
`;

const MainTittle = styled.div`
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
`;

const CardContainer = styled.div`
    display:flex;
    justify-content:center;
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
    max-width:300px;
    min-width:200px;
    padding:10px;
    img{
        width:100%;
        height:auto;
        min-height:250px;
        max-height:450px;
        border-radius:10px;
        :hover{
            cursor: pointer;
            transition: all 1s ease 0s;
            transform: translateY(-17px);
        }
    }
`;

const ImageContainer = styled.div`
    position: relative;
    text-align: center;
    color: white;
    :hover{
        cursor: pointer;
        transition: all 1s ease 0s;
        transform: translateY(-17px);
        @media screen and (max-width: 1200px) {
            transform: translateY(-3px);
        }
    }
`;

const CenteredText = styled.div`
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 1200px) {
        h2{
            font-size: 1.5rem;
            padding-top: 30px;
        }
    }

`;