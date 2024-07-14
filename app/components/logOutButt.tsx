"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LogOutButton() {
  const { data: session } = useSession();
  // don't render button is not signed in
  if (!session) {
    return <></>;
  }

  return (
    <>
      <button onClick={() => signOut()}>log out</button>
    </>
  );
}
