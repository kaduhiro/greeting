import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? '',
      clientSecret: process.env.FACEBOOK_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      // @ts-ignore
      scope: 'read:user',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID ?? '',
      clientSecret: process.env.TWITTER_SECRET ?? '',
      // version: '2.0', // OAuth 2.0
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any): Promise<Session> {
      session.user.username = token.username;

      return session;
    },
    async jwt({ token, user, account = {}, profile, isNewUser }: any): Promise<JWT> {
      if (account.provider && !token[account.provider]) {
        token[account.provider] = {};
      }

      switch (account.provider) {
        case 'twitter':
          // OAuth 1.0
          if (account.oauth_token && account.oauth_token_secret) {
            token[account.provider] = {
              ...token[account.provider],
              access_token: account.oauth_token,
              access_token_secret: account.oauth_token_secret,
            };
          }
          token['username'] ??= profile.screen_name ?? null;

          // OAuth 2.0
          if (account.access_token && account.refresh_token) {
            token[account.provider] = {
              ...token[account.provider],
              access_token: account.access_token,
              access_token_secret: account.refresh_token,
            };
          }
          token['username'] ??= profile.data.username ?? null;

          break;
      }

      return token;
    },
  },
  async signIn({ user, account, profile, email, credentials }: any): Promise<boolean> {
    return true;
  },
};

export default NextAuth(authOptions);
