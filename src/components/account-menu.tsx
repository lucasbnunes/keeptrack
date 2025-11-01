'use client';
import { Avatar } from '@/components/avatar';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AccountMenu() {
  async function handleSignOut() {
    await authClient.signOut();
    redirect('/');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex justify-between"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
