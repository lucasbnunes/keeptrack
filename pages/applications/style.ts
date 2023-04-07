import styled from 'styled-components';

export const ApplicationsContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints['xl']};
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 1rem;
`;

export const ApplicationsSearchContainer = styled.div`
  margin: 36px 0;
  text-align: right;
`;
