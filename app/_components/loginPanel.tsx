import { signIn } from "next-auth/react";

export default function LoginPanel() {
  return (
    <>
      <div className="bg-spotify-grey w-fit text-center text-xl p-5 rounded-lg mt-10">
        <p className="mb-3">lend me ur spotify account ?</p>
        <button
          className="hover:scale-125 bg-spotify-green w-9/12 px-3 py-1 rounded-lg font-bold"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          log in :3
        </button>
      </div>
    </>
  );
}
