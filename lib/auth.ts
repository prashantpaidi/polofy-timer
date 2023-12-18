import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/GitHub';
import Google from 'next-auth/providers/Google';
import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'user',
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'user',
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      // console.log(db.select.from(user)(user.id).query();)
      const dbUsers = await db
        .selectDistinct()
        .from(users)
        .where(eq(users.id, user.id));

      session.user.role = dbUsers[0].role || 'USER';
      //   session.user.role = user.role;
      //   console.log('session.role', dbUsers[0].role);

      return session;
    },
  },
};

export const { handlers, auth, signOut } = NextAuth(authConfig);
