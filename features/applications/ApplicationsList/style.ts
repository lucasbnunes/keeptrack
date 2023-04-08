import styled from 'styled-components';

export const ApplicationListRoot = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ApplicationListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.blue[50]};
  }
`;

export const ApplicationListItemTitle = styled.div`
  display: flex;
  flex-direction: column;

  & span:last-child {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

export const ApplicationListItemInfo = styled.div`
  display: flex;
  flex-direction: column;

  & span:first-child {
    align-self: flex-end;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;
