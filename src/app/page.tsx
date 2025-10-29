import { Logo } from "@/components/Logo";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Container, Heading, Hero, LogoContainer } from "./style";
import { SignInButton } from "@/features/auth/SignInButton";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/app/applications");
  }

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Hero>
        <Heading>Stay Organized and On Top of Your Applications</Heading>
        <p>
          Are you tired of feeling overwhelmed by your job search? KeepTrack is
          here to help! Our app simplifies the job search process by keeping all
          your applications in one place, so you can focus on what really
          matters – landing your dream job.
        </p>

        <SignInButton />
      </Hero>
    </Container>
  );
}
