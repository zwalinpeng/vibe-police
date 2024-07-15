import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: { scope: "playlist-read-private" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        // first login
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.exp = account.expires_at;
        return token;
      } else if (Date.now() < <number>token.exp * 1000) {
        // token still valid
        return token;
      } else {
        // refresh token
        console.log("refreshing");
        const request = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
          },
          body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
          cache: "no-cache",
        });
        const data = await request.json();
        token.access_token = data.access_token;
        token.exp = Date.now() + data.expires_in * 1000;
        return token;
      }
    },
    session: async ({ session, token }) => {
      session.user.access_token = token.access_token as string;
      session.user.refresh_token = token.refresh_token as string;
      session.user.exp = token.exp as number;
      session.user.id = token.sub as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
