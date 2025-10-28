import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.colors.gray[950]};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.gray[950]};
  }
`;
