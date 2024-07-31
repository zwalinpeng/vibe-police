"use client";

import { useSession } from "next-auth/react";
import LoginPanel from "../_components/loginPanel";

export default function Login() {
  const { status } = useSession();
  // user already logged in
  if (status == "authenticated") {
    return (
      <>
        <div className="text-xl text-center font-bold mx-auto w-fit my-10">
          <p>ur alr logged in ! ! ! ! ! ! !</p>
          <p>try another page ?</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mx-auto flex justify-center">
        <LoginPanel />
      </div>
    </>
  );
}
