import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 lg:px-16">
      <Logo />
      <AccountMenu />
    </header>
  );
}
