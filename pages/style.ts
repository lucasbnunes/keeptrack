import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 1.125rem;

  height: 100vh;
  padding: 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  padding: 0.75rem 1rem;
  max-width: 1280px;

  & > img {
    max-width: 160px;
  }
`;

export const Hero = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;

  & button {
    margin: 2rem auto;
    & > img {
      width: 24px;
      height: 24px;
    }
  }
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 24px;
  line-height: calc(2.5rem + 10px);
  color: ${({ theme }) => theme.colors.blue[600]};
`;
