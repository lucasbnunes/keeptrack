"use client";

import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

export function ContextProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
