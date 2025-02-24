import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #0a0622;
        --bg-light:#252140;
        --main: #fff;
        --sub: #cecdd3;
        --subtle: #9d9ca6;
        --primary: #C532F9;
        --primary-light: #d893fc;
        --primary-gradient: #d127fa;
        --secondary: #32B2E5;
        --secondary-gradient: #24bde3;
        --info: #03b8ff;
        --success: #4CAF50;
        --error: #F44A3D;
        --neutral: #8966F6;
        --gradient: linear-gradient(to right, var(--primary), var(--secondary));

        --row-bg: #141128;

        --section-margin: 8.5rem 0;
        --mobile-section-margin: 3.6rem 0;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: var(--main);
        font-family: "Inter", sans-serif;
    }

    button {
        background: none;
        border: none;
        outline: none;
    }
    
    input {
        border: none;
        outline: none;
    }

    a {
        text-decoration: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
