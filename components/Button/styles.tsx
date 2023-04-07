import styled, { DefaultTheme, keyframes } from "styled-components";

export const TextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  transition: background 0.2s ease-in-out;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue[600]};

  &:hover {
    background: ${({ theme }) => theme.colors.blue[50]}
  }

  &:active {
    background: ${({ theme }) => theme.colors.blue[100]}
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`