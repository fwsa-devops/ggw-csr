import type { JWT } from 'next-auth/jwt'
import { randomUUID } from 'crypto'
import { NextAuthConfig, Profile, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth/jwt' {
  interface JWT extends Pick<Profile, 'roles'> {
    id?: string
  }
}

declare module 'next-auth' {
  interface Profile {
    roles?: string
  }
  interface User extends Pick<JWT, 'id' | 'role' | 'image'> {}
}

export const authConfig: NextAuthConfig = {
  callbacks: {
    jwt: ({ token, user, profile }) => {
      if (user) {
        token.id = user.id
      }
      if (profile) {
        token.roles = profile.roles
      }
      return token
    },
    session: ({ session, user, token }) => {
      // session strategy: "jwt"
      if (token) {
        if (token.id) {
          session.user.id = token.id
        }
        session.user.role = token.roles
      }
      // session strategy: "database"
      if (user) {
        session.user.id = user.id
      }
      return session
    },
    authorized: ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
      profile(profile) {
        profile.role = 'user'
        const _user: User = {
          id: randomUUID(),
          name: profile.name!,
          email: profile.email!,
          image: (profile.picture as string) ?? `https://ui-avatars.com/api/?name=${profile.name}`,
          role: 'USER',
        }
        return _user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
  },
}
