import SessionProvider from '@/components/providers/session';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import Header from '@/app/(root)/components/header';
import { Toaster } from '@/components/ui/toaster';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/api/uploadthing/core';
import { getActivitiesJoined } from '@/components/actions/action';
import { Analytics } from '@vercel/analytics/react';

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

  const activitiesJoined = await getActivitiesJoined();
  // console.log('Root component');

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Header activitiesJoined={activitiesJoined} />
          <main className="main">
            <div className="responsive-wrapper">{children}</div>
            <Toaster />
          </main>
          <Analytics />
        </body>
      </SessionProvider>
    </html>
  );
}
