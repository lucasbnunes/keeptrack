import styled from 'styled-components';

interface InpoutLabelProps {
  fullWidth?: boolean;
}

export const InputLabel = styled.label<InpoutLabelProps>`
  display: flex;
  flex-direction: column;

  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '300px')};

  & > span {
    display: inline-block;
    margin: 0px 4px 2px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  & input[type='date'] {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    width: 100%;
  }

  & input,
  & textarea {
    font-size: 1rem;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    min-width: 200px;
    color: ${({ theme }) => theme.colors.gray[800]};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[700]};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.blue[200]};
      border-color: transparent;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.gray[50]};
    }
  }

  & input[type='date'] {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    width: 100%;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray[50]};
    }
  }

  & textarea {
    min-height: 180px;
    resize: none;
  }
`;
