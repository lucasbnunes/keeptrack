import { Nunito_Sans } from 'next/font/google';
import { ContextProviders } from './contexts';
import '@/app/globals.css';
import { Logo } from '@/components/logo';

const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className}`}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
