import { Logo } from '@/components/Logo';
import { AccountMenu } from '../AccountMenu';

export function Header() {
  return (
    <header className="flex justify-between items-center py-3 px-4 lg:px-16">
      <Logo />
      <AccountMenu />
    </header>
  );
}
