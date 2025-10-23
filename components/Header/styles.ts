"use client";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 0.75rem 4rem;
  }
`;
