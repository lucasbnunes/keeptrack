"use client";

import { Button } from "@/components/Button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  async function signIn() {
    authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <Button variant="solid" onClick={signIn}>
      <img src="/Google__G__Logo.png" alt="" />
      Sign up with Google
    </Button>
  );
}
