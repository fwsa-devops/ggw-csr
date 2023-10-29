import SessionProvider from '@/components/providers/session';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AdminHeader from '@/admin/components/admin-header';

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

  // console.log('Root component');

  return (
    <html lang="en">
      <head>
        <title>CSR Events Portal</title>
      </head>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <AdminHeader />
          <main className="main">
            <div className="responsive-wrapper">{children}</div>
            <Toaster />
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}