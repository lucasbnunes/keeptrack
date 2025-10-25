"use client";

import styled from "styled-components";

export const ApplicationsContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints["xl"]};
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 1rem;

  & > button {
    margin-left: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints["lg"]}) {
    margin-top: 40px;
  }
`;

export const ApplicationsLoaderContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
