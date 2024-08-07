"use client";

import { signIn, useSession } from "next-auth/react";
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
      <div className="mx-auto flex flex-col justify-center items-center">
        <div className="text-center py-5">
          <h1 className="text-2xl font-bold">
            it&#39;s the vibe police 🚓 🚨 🚓 🚨
          </h1>
          <p>see if ur playlist is a vibe or not ! !</p>
        </div>
        <LoginPanel />
        <div className="text-center py-5">
          <p>
            if ur email isn&#39;t whitelisted or u don&#39;t want to login, u
            can view as guest{" "}
            <button
              className="hover:scale-75 bg-spotify-green w-fit px-3 py-1 rounded-lg font-bold"
              onClick={() => signIn("credentials", { callbackUrl: "/" })}
            >
              here
            </button>{" "}
            :&gt;
          </p>
        </div>
      </div>
    </>
  );
}
