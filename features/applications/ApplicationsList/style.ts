import styled from 'styled-components';

export const ApplicationListRoot = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & li {
    display: flex;
    flex-direction: column;

    padding: 4px 12px;
    border-radius: 6px;
    &:hover {
      background: ${({ theme }) => theme.colors.blue[50]};
    }

    & > span {
      align-self: flex-end;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray[700]};
    }

    & div {
      display: flex;
      justify-content: space-between;

      & div span:last-child {
        font-weight: 0.9375rem;
        color: ${({ theme }) => theme.colors.gray[700]};
      }

      & > div {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
