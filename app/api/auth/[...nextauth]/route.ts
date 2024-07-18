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
    maxAge: 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      // initial login
      if (account) {
        // copy access information to jwt token
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.access_exp = account.expires_at;
        return token;
      }
      // access token still valid
      else if (Math.floor(Date.now() / 1000) < (token.access_exp as number)) {
        // console.log(
        //   `${
        //     ((token.access_exp as number) - Math.floor(Date.now() / 1000)) / 60
        //   } min left`
        // );
        return token;
      }
      // refresh token
      else {
        const request = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64")}`,
          },
          body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
          cache: "no-cache",
        });
        const data = await request.json();
        token.access_token = data.access_token;
        token.access_exp = Math.floor(Date.now() / 1000) + data.expires_in;
        return token;
      }
    },
    session: async ({ session, token }) => {
      // copy access token and id to session user
      session.user.access_token = token.access_token as string;
      session.user.id = token.sub as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
