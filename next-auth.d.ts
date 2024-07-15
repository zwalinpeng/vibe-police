import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      access_token: string;
      exp: number;
      refresh_token: string;
    } & DefaultSession["user"];
  }
}
