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
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'light' as const,
  },
  events: {
    createUser: async ({ user }) => {

      const { email, image, name } = user;
      console.log("createUser", user)
      await prisma.user.create({
        data: {
          email: email as string,
          name: name as string,
          image: image ?? null
        }
      })

    },
    signIn: async ({ user }) => {
      console.log("signIn", user)

      const { email, image, name } = user;

      console.log("newUser");
      await prisma.user.upsert({
        where: {
          email: email as string
        },
        update: {
          name: name as string,
          image: image ?? null
        },
        create: {
          email: email as string,
          name: name as string,
          image: image ?? null
        },
      })

    }

  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
