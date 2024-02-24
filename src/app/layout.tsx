import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/session';
import Header from '@/components/shared/header';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Management System',
  description:
    'Event Management System for managing events and attendees with ease.',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <SessionProvider>
          <body className={inter.className}>
            <Header />
            <main className="container mx-auto px-4 py-2">{children}</main>
          </body>
        </SessionProvider>
      </html>
    </>
  );
}
