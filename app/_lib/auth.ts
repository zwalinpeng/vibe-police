import { NextAuthOptions, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: { scope: "playlist-read-private" },
      },
    }),
    CredentialsProvider({
      name: "guest",
      credentials: {},
      async authorize(req) {
        const user: User = { id: "", name: "guest", guest: true };
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // persist user to token
      if (user) {
        token.user = user;
      }
      // copy access information to jwt token on initial login
      if (account) {
        // guest login
        if (account.provider == "credentials") {
          const request = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
                ).toString("base64")}`,
              },
              body: "grant_type=client_credentials",
            }
          );
          const data = await request.json();
          token.access_token = data.access_token;
          token.access_exp = Math.floor(Date.now() / 1000) + data.expires_in;
          return token;
        } else {
          token.access_token = account.access_token;
          token.refresh_token = account.refresh_token;
          token.access_exp = account.expires_at;
          return token;
        }
      }
      // access token still valid
      else if (Math.floor(Date.now() / 1000) < (token.access_exp as number)) {
        return token;
      }
      // refresh token
      else {
        // login refresh token (refresh token exists)
        if (token.refresh_token) {
          const request = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
                ).toString("base64")}`,
              },
              body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
              cache: "no-cache",
            }
          );
          const data = await request.json();
          token.access_token = data.access_token;
          token.access_exp = Math.floor(Date.now() / 1000) + data.expires_in;
          return token;
        }
        // guest refresh token (refresh token does not exist)
        const request = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64")}`,
          },
          body: "grant_type=client_credentials",
        });
        const data = await request.json();
        token.access_token = data.access_token;
        token.access_exp = Math.floor(Date.now() / 1000) + data.expires_in;
        return token;
      }
    },
    session: async ({ session, token }) => {
      // copy access token and id to session user
      session.user.guest = token.user.guest;
      session.user.access_token = token.access_token as string;
      session.user.id = token.sub as string;
      return session;
    },
  },
};
