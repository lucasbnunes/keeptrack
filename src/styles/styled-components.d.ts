import 'styled-components';

type Color = {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950': string;
};

interface Breakpoints {
  sm: '640px';
  md: '768px';
  lg: '1024px';
  xl: '1280px';
  '2xl': '1536px';
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: Color;
      gray: Color;
    };
    breakpoints: Breakpoints;
  }
}
