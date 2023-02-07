import styled from "styled-components";

export const StyledMain = styled.main`
    height: 90vh;
	border-radius:0 0 13px 13px;
	background:linear-gradient(190deg,rgb(7, 45, 60),rgb(21, 63, 74));
	box-shadow:2px 3px 4px #37323F,4px -2px 10px rgb(35, 30, 38);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    
    & p:last-of-type {
        margin-bottom: 0;
        padding:10px;
    }
`