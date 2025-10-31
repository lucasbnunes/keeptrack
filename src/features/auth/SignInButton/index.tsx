'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export function SignInButton() {
  async function signIn() {
    authClient.signIn.social({
      provider: 'google',
    });
  }

  return (
    <Button onClick={signIn}>
      <img src="/Google__G__Logo.png" alt="" className="size-6" />
      Sign in with Google
    </Button>
  );
}
