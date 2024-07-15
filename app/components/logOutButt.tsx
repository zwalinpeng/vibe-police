"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LogOutButton() {
  const { status } = useSession();
  // don't render button is not logged in
  if (status != "authenticated") {
    return <></>;
  }
  // logged in, render logout button
  return (
    <>
      <button onClick={() => signOut()}>log out</button>
    </>
  );
}
