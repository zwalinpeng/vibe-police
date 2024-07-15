"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Login() {
  const { status } = useSession();
  // user already logged in
  if (status == "authenticated") {
    return (
      <>
        <p>ur alr logged in !!!!!!!</p>
        <p>...why'd u come here</p>
      </>
    );
  }
  return (
    <>
      <p>idk u</p>
      <button onClick={() => signIn("spotify", { callbackUrl: "/" })}>
        login
      </button>
    </>
  );
}
