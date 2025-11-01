'use client';
import { useEffect, useState } from 'react';

interface WindowDimensions {
  width?: number;
  height?: number;
}

const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoints = keyof typeof breakpointValues;

export function useMediaQuery() {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function minWidth(breakpoint: Breakpoints) {
    if (windowSize.width) {
      return windowSize.width >= breakpointValues[breakpoint];
    }
  }

  function maxWidth(breakpoint: Breakpoints) {
    if (windowSize.width) {
      return windowSize.width < breakpointValues[breakpoint];
    }
  }

  return {
    windowSize,
    minWidth,
    maxWidth,
  };
}
