import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { Nunito_Sans } from 'next/font/google'


const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        html {
          font-family: ${nunitoSans.style.fontFamily};
        }
      `}</style>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}
