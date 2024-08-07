import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    access_token?: string;
    guest?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    access_exp?: number;
    user?: User;
  }
}
