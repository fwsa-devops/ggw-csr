import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    error: '/error',
  },
  callbacks: {
    signIn: ({ account, profile }) => {
      if (account && account.provider === 'google') {
        const boo = /^\S+freshworks\.com$/.test(profile?.email as string);

        console.log(boo);
        // throw new Error("Invalid email domain");
        return boo;
        // redirect(`/api/auth/error?error=NotPartOfFreshworks`);
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'light' as const,
  },
  events: {
    createUser: async ({ user }) => {
      const { email, image, name } = user;
      await prisma.user.create({
        data: {
          email: email as string,
          name: name as string,
          image: image ?? null,
        },
      });
    },
    signIn: async ({ user }) => {
      const { email, image, name } = user;

      await prisma.user.upsert({
        where: {
          email: email as string,
        },
        update: {
          name: name as string,
          image: image ?? null,
        },
        create: {
          email: email as string,
          name: name as string,
          image: image ?? null,
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
