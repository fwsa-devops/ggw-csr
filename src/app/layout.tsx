import SessionProvider from '@/components/providers/session';
import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Volunteer by Freshworks',
  description: 'CSR initiative by Freshworks',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Header />
          <main className="main">
            <div className="responsive-wrapper">
              <div className="main-header">
                <h1>Upcoming Events</h1>
              </div>
              {children}
            </div>
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}
