import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AnimatedLoader = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.blue[100]} 33%,
    ${({ theme }) => theme.colors.blue[600]} 100%
  );
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: white;
  }
`;
