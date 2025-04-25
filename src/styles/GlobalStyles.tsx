// app/GlobalStyles.tsx
'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Mobile-first variables */
    --font-size-base: 16px;
    --spacing-unit: 8px;
    --max-width: 100%;
    
    /* Color variables */
    --color-primary: #0070f3;
    --color-secondary: #7928ca;
    --color-background: #ffffff;
    --color-text: #333333;
    
    /* Breakpoints */
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --breakpoint-xxl: 1400px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Fluid typography */
    font-size: calc(14px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
    
    @media (min-width: 1600px) {
      font-size: 18px;
    }
    @media (max-width: 300px) {
      font-size: 14px;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
                 Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: var(--color-text);
    background-color: var(--color-background);
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  /* Responsive container */
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 calc(var(--spacing-unit) * 2);

    @media (min-width: 768px) {
      --max-width: 720px;
      padding: 0 calc(var(--spacing-unit) * 3);
    }

    @media (min-width: 992px) {
      --max-width: 960px;
    }

    @media (min-width: 1200px) {
      --max-width: 1140px;
    }
  }
`;

export default GlobalStyles;