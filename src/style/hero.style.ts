import styled from "styled-components";

export const StyledHero = styled.section`
    height: 85.0vh;
    margin-top:-10px;
    z-index: 0;
    background-position: center;
    background-image: url("hero.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100vw;
    & .hero__cta{
        width:100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        & .cta__content{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    & h1, h2, h3{
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        z-index: 1;
        margin: 5;
    } 
`