import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    blue: {
      '50': '#eef5ff',
      '100': '#dfedff',
      '200': '#c6dcff',
      '300': '#a3c5fe',
      '400': '#7ea3fb',
      '500': '#5f81f5',
      '600': '#3952e8',
      '700': '#3447ce',
      '800': '#2d3ea6',
      '900': '#2c3a83',
      '950': '#1a214c',
    },
    gray: {
      '50': '#f5f6f6',
      '100': '#e4e7e9',
      '200': '#ccd1d5',
      '300': '#a8b0b8',
      '400': '#7d8893',
      '500': '#5c6670',
      '600': '#545c66',
      '700': '#484e56',
      '800': '#40444a',
      '900': '#393c40',
      '950': '#232529',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
