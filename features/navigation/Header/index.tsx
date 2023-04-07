import { HeaderContainer } from "./styles";
import { Avatar } from "@/components/Avatar";
import { Logo } from "@/components/Logo";
import { AccountMenu } from "../AccountMenu";



export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <AccountMenu />
    </HeaderContainer>
  )
}