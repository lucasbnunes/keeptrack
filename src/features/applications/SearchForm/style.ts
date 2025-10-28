"use client";
import styled from "styled-components";

export const ApplicationsSearchForm = styled.div`
  margin: 36px 0;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints["lg"]}) {
    margin: 24px 0;

    & label {
      width: 100%;
    }
  }
`;
