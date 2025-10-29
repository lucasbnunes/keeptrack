"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  async function signIn() {
    authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <Button onClick={signIn}>
      <img src="/Google__G__Logo.png" alt="" />
      Sign up with Google
    </Button>
  );
}
