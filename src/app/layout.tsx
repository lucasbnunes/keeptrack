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
        <ContextProviders>
          <nav className="border-border/40 bg-background/95 border-b backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <Logo href="/" />
            </div>
          </nav>
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}
