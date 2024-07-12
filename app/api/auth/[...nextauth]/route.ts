import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: "https://accounts.spotify.com/authorize?",
    }),
  ],
});

export { handler as GET, handler as POST };
