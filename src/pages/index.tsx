import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { convertIncomingHttpHeadersToHeaders } from "@/utils/convertHeaders";
import { GetServerSideProps } from "next";
import styled from "styled-components";

export const getServerSideProps = (async (context) => {
  const session = await auth.api.getSession({
    headers: convertIncomingHttpHeadersToHeaders(context.req.headers),
  });
  if (session) {
    return {
      redirect: {
        destination: "/applications",
        permanent: false,
      },
    };
  }
  return { props: {} };
}) satisfies GetServerSideProps;

export default function Home() {
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    console.log(data);
  };

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

        <Button variant="solid" onClick={signIn}>
          <img src="/Google__G__Logo.png" alt="" />
          Sign up with Google
        </Button>
      </Hero>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 1.125rem;

  height: 100vh;
  padding: 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  padding: 0.75rem 1rem;
  max-width: 1280px;

  & > img {
    max-width: 160px;
  }
`;

const Hero = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;

  & button {
    margin: 2rem auto;
    & > img {
      width: 24px;
      height: 24px;
    }
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 24px;
  line-height: calc(2.5rem + 10px);
  color: ${({ theme }) => theme.colors.blue[600]};
`;
