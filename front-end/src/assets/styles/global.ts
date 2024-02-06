import { createGlobalStyle } from "styled-components";

import DMBold from "../fonts/DMSans-Bold.woff2";
import DMMedium from "../fonts/DMSans-Medium.woff2";
import DMRegular from "../fonts/DMSans-Regular.woff2";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    @font-face {
        font-family: "DM Sans";
        font-display: swap;
        src: url(${DMRegular});
    }

    @font-face {
        font-family: "DM Sans";
        font-display: swap;
        font-weight: 500;
        src: url(${DMMedium});
    }

    @font-face {
        font-family: "DM Sans";
        font-display: swap;
        font-weight: 700;
        src: url(${DMBold});
    }
    
    body {
        font-family: ${props => props.theme.font};
        background-color: ${props => props.theme.colors.base};
    }
    
    a,
    button,
    input {
        transition: ${props => props.theme.transition};
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${props => props.theme.colors.foreground};
    }
    
    a {
        text-decoration: none;
        color: ${props => props.theme.colors.foreground};
        font-weight: bold;
        font-size: ${props => props.theme.textSizes.regular};
    }
    
    a:hover {
        color: ${props => props.theme.colors.primary}
    }
    
     svg {
         width: 1.25rem;
         height: 1.25rem;
     }
     
     button {
         -webkit-font-smoothing: inherit;
         -moz-osx-font-smoothing: inherit;
         -webkit-appearance: none;
         border: none;
         cursor: pointer;
     }

    button::-moz-focus-inner,
    input::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
`;

export default GlobalStyles;