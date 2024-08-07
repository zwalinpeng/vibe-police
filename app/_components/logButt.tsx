"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function LogButton() {
  const { data: session, status } = useSession();
  const path = usePathname();
  const router = useRouter();
  // not logged in with spotify
  if (status != "authenticated" || session.user.guest) {
    // don't render button if on login page
    if (status == "loading") {
      return;
    }
    return (
      <>
        <button onClick={() => router.push("/login")}>log in</button>
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
