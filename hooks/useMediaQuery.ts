"use client";

import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";

interface WindowDimensions {
  width?: number;
  height?: number;
}

type Breakpoints = keyof DefaultTheme["breakpoints"];

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

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function minWidth(breakpoint: Breakpoints) {
    if (windowSize.width) {
      return windowSize.width >= parseInt(theme.breakpoints[breakpoint]);
    }
  }

  function maxWidth(breakpoint: Breakpoints) {
    if (windowSize.width) {
      return windowSize.width < parseInt(theme.breakpoints[breakpoint]);
    }
  }

  return {
    windowSize,
    minWidth,
    maxWidth,
  };
}
