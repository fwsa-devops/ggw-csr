import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          access_type: 'offline',
          prompt: 'consent',
        }
      },
    })
  ],
  callbacks: {

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


}