import Link from "next/link";
import LogButton from "./logButt";

export default function NavBar() {
  // TODO: fix on mobile
  return (
    <>
      <div className="w-full h-20 bg-spotify-green sticky top-0 z-50">
        <nav className="flex justify-center items-center h-full">
          <ul className="flex gap-x-7 font-bold">
            <li className="hover:scale-125">
              <Link href="/">home</Link>
            </li>
            <li className="hover:scale-125">
              <Link href="/about">abt</Link>
            </li>
            <li className="hover:scale-125">
              <LogButton />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
