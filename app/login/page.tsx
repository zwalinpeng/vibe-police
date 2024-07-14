"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <p>idk u</p>
      <button onClick={() => signIn("spotify", { callbackUrl: "/" })}>
        login
      </button>
    </>
  );
}
