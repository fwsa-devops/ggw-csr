import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/session';
import Header from '@/components/shared/header';

const inter = Inter({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (<>
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <Header />
          <main className="container mx-auto px-4 py-2">{children}</main>
        </body>
      </SessionProvider>
    </html>
  </>);
}
