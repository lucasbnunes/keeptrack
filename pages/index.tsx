import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/Button'
import { Container, Heading, Hero, LogoContainer } from './style'
import { Logo } from '@/components/Logo'


export default function Home() {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Hero>

        <Heading>Stay Organized and On Top of Your Applications</Heading>
        <p>Are you tired of feeling overwhelmed by your job search? KeepTrack is here to help! Our app simplifies the job search process by keeping all your applications in one place, so you can focus on what really matters – landing your dream job.</p>

        <Button variant='solid' onClick={() => signIn('google')}><img src='/Google__G__Logo.png' alt="" />Sign up with Google</Button>
      </Hero>
    </Container>
  )
}

