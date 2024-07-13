"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <p>idk u</p>
      <button
        onClick={() =>
          signIn("spotify", { callbackUrl: process.env.NEXTAUTH_URL })
        }
      >
        login
      </button>
    </>
  );
}
