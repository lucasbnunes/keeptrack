import { Logo } from '@/components/Logo';
import { AccountMenu } from '../AccountMenu';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 lg:px-16">
      <Logo />
      <AccountMenu />
    </header>
  );
}
