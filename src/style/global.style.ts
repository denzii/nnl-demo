import { createGlobalStyle } from 'styled-components';

// below is my minimal custom reset config 
const GlobalStyle = createGlobalStyle`
    html{
        background-color: black;
        scroll-behavior: smooth;
        height: 100%
    }
    body {
        margin: 0; 
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
    }

    .app__hero{
        background-image: url("hero.png");
    }

    /* clear browser defaults for empty space around the section separator */
    hr {
        all: unset;
        margin: 0;
        max-width: 100%;
    }

    ul li{
        all:unset;
    }

    /* clear browser defaults, set height to be inherited from parent by default */
    nav { margin: 0; height: inherit; }
    menu { all: unset; height: inherit; }

    /* Disable default Definition List styles applied by the browsers so each inner element could be styled properly later on */
    dl, dl h3, dt, dd {		
        margin: 0;
	    padding: 0;
	    border: 0;
    }

    /* for including descriptive tags and having them not interfere with visual design. this gives readability to the markup as well as the code generating it
    improving maintainability */
    .hidden {
        position: absolute;
        top: -9999px;
        left: -9999px;
        display: none;
    }

    /*  according to accessibility best practices, all elements which may hold focus need to have an outline border of at least 2px when focused
        the colour can change given that it has enough contrast with its background. */
    *:focus { outline: solid 2px; }

    /* for having the same font size in all browsers, its better to set font-size to 100% globally and then use em units to define font size per element 
    rather than pixels. This also allows resizing the font in the browser specific menus for people who may need to configure bigger font sizes without
    zooming in the page, adding a plus to accessibility */
    * {	font-size: 100%; }
    h1 { font-size: 2.5em; }
    h2 { font-size: 1.875em; }
    h3 { font-size: 1.55em; }
    h4 { font-size: 1.05em; }
    p { font-size: 1.05em; }

    /* all these tags should have the same font and same style of text globally unless a rule is specified again to override later on*/
    h1, h2, h3, h4,
    p, a, fieldset {
        font-family: a.$global-fonts;
        color: a.$global-font-colour;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    // clear browser defaults for indentation for the data definition tag 
    dd { all: unset;  }

    a,
    fieldset,
    h1,
    h2,
    h3,
    h4,
    p {
        font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        color:white;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale
    }
`

export default GlobalStyle;