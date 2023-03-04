import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      username?: string;
    } & DefaultSession['user'];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    twitter?: {
      username: string;
      access_token: string;
      access_token_secret: string;
    };
  }
}
