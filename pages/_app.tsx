import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { Nunito_Sans } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'


const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export type NextPageWithAccess<P = {}, IP = P> = NextPage<P, IP> & {
  isPublic?: boolean,
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithAccess
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        * {
          font-family: ${nunitoSans.style.fontFamily};
        }
      `}</style>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout isPublic={Component.isPublic}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  )
}
