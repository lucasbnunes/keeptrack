import styled, { keyframes } from 'styled-components';

interface AnimatedLoaderProps {
  size: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: '18',
  md: '32',
  lg: '48',
};

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AnimatedLoader = styled.span<AnimatedLoaderProps>`
  width: ${({ size }) => SIZE_MAP[size]}px;
  height: ${({ size }) => SIZE_MAP[size]}px;
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
    width: ${({ size }) => `calc(${SIZE_MAP[size]}px - 10%)`};
    height: ${({ size }) => `calc(${SIZE_MAP[size]}px - 10%)`};
    border-radius: 50%;
    background: white;
  }
`;
