import SessionProvider from '@/components/providers/session';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AdminHeader from '@/admin/components/admin-header';
import { redirect } from 'next/navigation';
import Footer from '../(root)/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Giving Week - 2023',
  description: 'Social Impact by Freshworks',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  // check for login & role in here

  const adminUsers = process.env.ADMIN_USERS?.split(' ') ?? [];
  // console.log('adminUsers', adminUsers);
  if (!adminUsers.includes(session?.user?.email ?? '')) {
    redirect('/');
  }
  return (
    <html lang="en">
      <head>
        <title>Global Giving Week - 2023</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <SessionProvider session={session}>
        <body className={inter.className + ' bg-white'}>
          <AdminHeader />
          <main className="main">
            <div className="responsive-wrapper">{children}</div>
            <Toaster />
          </main>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
