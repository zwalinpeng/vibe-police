import Link from "next/link";
import LogOutButton from "./logOutButt";

export default function NavBar() {
  // TODO: fix on mobile
  return (
    <>
      <div className="w-full h-20 bg-spotify-green sticky top-0">
        <div className="container md:mx-auto px-4 h-full">
          <div className="flex justify-center items-center h-full">
            <ul className="hidden md:flex gap-x-7 font-bold">
              <li className="hover:scale-125">
                <Link href="/">home</Link>
              </li>
              <li className="hover:scale-125">
                <Link href="/about">abt</Link>
              </li>
              <li className="hover:scale-125">
                <LogOutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
