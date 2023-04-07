import styled from 'styled-components';

export const ApplicationsTableRoot = styled.table`
  border-collapse: collapse;
  width: 100%;

  & th + th,
  & td + td {
    padding-left: 16px;
  }

  & td:last-child button {
    margin-left: auto;
  }
`;

export const ApplicationsTableHeadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  font-size: 0.9375rem;

  & th {
    padding-bottom: 8px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray[700]};
    text-align: left;
    min-width: 170px;
  }

  & th:first-child {
    min-width: 300px;
  }
`;

export const ApplicationsTableBodyRow = styled.tr`
  & td {
    vertical-align: top;
    padding-top: 16px;
  }
`;

export const ApplicationsVerticalCell = styled.td`
  display: flex;
  flex-direction: column;

  & span:last-child {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;
