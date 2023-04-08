import styled from 'styled-components';

export const ApplicationsContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints['xl']};
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints['xl']}) {
    margin-top: 40px;
  }
`;

export const ApplicationsSearchContainer = styled.div`
  margin: 36px 0;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints['xl']}) {
    text-align: left;
    margin: 24px 0;
  }
`;
