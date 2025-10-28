import styled from 'styled-components';
import { Loader } from '../Loader';

export const ButtonLoader = styled(Loader)`
  &::after {
    background-color: ${({ theme }) => theme.colors.blue[50]};
  }
`;

interface ButtonProps {
  variant: 'text' | 'solid';
}

export const StyledButton = styled.button<ButtonProps>`
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
  position: relative;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blue[50]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.blue[50]};
    cursor: no-drop;
    opacity: 0.7;
  }

  &:active {
    background: ${({ theme }) => theme.colors.blue[100]};
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  ${({ theme, variant }) =>
    variant === 'solid' &&
    `
    color: white;
    background: ${theme.colors.blue[600]};

    &:hover:not(:disabled) {
      background: ${theme.colors.blue[700]};
    }

    &:active {
      background: ${theme.colors.blue[800]};
    }
    `}
`;
