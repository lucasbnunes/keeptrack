import { Logo } from "@/components/Logo";
import { AccountMenu } from "../AccountMenu";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <AccountMenu />
    </HeaderContainer>
  );
}
