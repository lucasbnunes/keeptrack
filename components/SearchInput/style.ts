import styled from 'styled-components';

export const SearchLabel = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray[300]};

  &:focus-within {
    outline: 1px solid black;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  & input {
    border: none;
    background: none;
    min-width: 200px;
    color: ${({ theme }) => theme.colors.gray[800]};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[700]};
    }
  }
`;
