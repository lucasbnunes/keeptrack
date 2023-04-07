import { Header } from "./styles";
import { Avatar } from "@/components/Avatar";
import { Logo } from "@/components/Logo";
import { AccountMenu } from "../AccountMenu";



export function Navbar() {
  return (
    <Header>
      <Logo />
      <AccountMenu />
    </Header>
  )
}