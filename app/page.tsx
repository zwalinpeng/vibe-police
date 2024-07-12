"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // check if session exists
  if (session) {
    // if logged in
    return (
      <>
        <p>Welcome {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  // if not logged in
  return (
    <>
      {" "}
      <p>Not Signed In</p>
      <button onClick={() => signIn("spotify")}>log in</button>
    </>
  );
}
