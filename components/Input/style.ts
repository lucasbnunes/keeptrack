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

  & input {
    font-size: 1rem;
    padding: 8px 12px;
    border-radius: 4px;
    /*background-color: ${({ theme }) => theme.colors.gray[50]};*/

    border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    min-width: 200px;
    color: ${({ theme }) => theme.colors.gray[800]};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[700]};
    }

    &:focus {
      /*background-color: ${({ theme }) => theme.colors.blue[50]};*/
      outline: 2px solid ${({ theme }) => theme.colors.blue[200]};
      border-color: transparent;
      /*outline: none;*/
    }
  }
`;
