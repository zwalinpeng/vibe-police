"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LogButton() {
  const { data: session, status } = useSession();
  const path = usePathname();
  // not logged in with spotify
  if (status != "authenticated" || session.user.guest) {
    // don't render button if on login page
    if (path == "/login" || status == "loading") {
      return;
    }
    return (
      <>
        <button onClick={() => signIn("spotify")}>log in</button>
      </>
    );
  }
  // logged in, render logout button
  return (
    <>
      <button onClick={() => signOut()}>log out</button>
    </>
  );
}
