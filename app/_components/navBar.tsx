import Link from "next/link";
import LogOutButton from "./logOutButt";

export default function NavBar() {
  // TODO: fix on mobile
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-center items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/about">abt</Link>
              </li>
              <li>
                <LogOutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
