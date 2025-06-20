import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset muy básico  ------------------------- */
  html, body, #root {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;     /* ← clave */
  }

  /* las imágenes jamás deben ensanchar la página */
  img, video {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
  }
    @media (max-width: 480px) {
    body {
      padding-top: 10px;
    }
  }
    body.menu-open {
      overflow: hidden;
}
`;
