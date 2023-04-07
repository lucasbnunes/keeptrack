import { Avatar } from '@/components/Avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AccountButton, StyledDropdownMenuContent, StyledDropdownMenuItem } from './styles';
import { ExitIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from 'next-auth/react';

export function AccountMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <AccountButton aria-label='account menu'>
          <Avatar />
        </AccountButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledDropdownMenuContent sideOffset={5} collisionPadding={20}>
          <StyledDropdownMenuItem onClick={() => signOut()}>
            Sign out <ExitIcon />
          </StyledDropdownMenuItem>
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}