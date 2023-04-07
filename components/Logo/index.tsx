import { LinkProps } from "next/link";
import { StyledLogo } from "./styles";

interface LogoProps {
  className?: string;
}
export function Logo({ className }: LogoProps) {
  return <StyledLogo href="/applications" className={className}>
    <img src="/prohunt.png" alt="prohunt logo" />
  </StyledLogo>
}