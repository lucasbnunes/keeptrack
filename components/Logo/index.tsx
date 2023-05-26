import { AnchorLogo, LogoContainer } from "./styles";

interface LogoProps {
  className?: string;
  href?: string;
}
export function Logo({ className, href }: LogoProps) {
  if (!href) {
    return <LogoContainer className={className}>
      <img src="/keeptrack.png" alt="keeptrack logo" />
    </LogoContainer>
  }

  return <AnchorLogo href="/applications" className={className}>
    <img src="/keeptrack.png" alt="keeptrack logo" />
  </AnchorLogo>
}