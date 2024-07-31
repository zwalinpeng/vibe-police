import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getOwnedLists } from "./_lib/spotify";
import PlaylistSearch from "./_components/playlistSearch";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // redirect to login is not logged in
  if (!session) {
    redirect("/login");
  }
  // get playlists owned by user
  const lists = await getOwnedLists(session);
  // if logged in
  return (
    <>
      <div className="md:mx-36">
        <p className="mt-4 md:mt-10 ml-2 text-xl md:text-5xl font-bold">
          hi {session.user.name} ! ! !
        </p>
        {lists.length == 0 ? (
          <p>bro go make a playlist</p>
        ) : (
          <>
            <PlaylistSearch playlists={lists} />
          </>
        )}
      </div>
    </>
  );
}
