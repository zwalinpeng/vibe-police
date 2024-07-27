import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getOwnedLists } from "./_lib/spotify";
import PlaylistView from "./_components/playlistViewer";

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
      <div className="mx-4 md:mx-36">
        <p>hi {session.user.name}</p>
        <p>I WILL STYLE EVERYTHING LATER PROMISE</p>
        {lists.length == 0 ? (
          <p>go make a playlist</p>
        ) : (
          <PlaylistView playlists={lists} />
        )}
      </div>
    </>
  );
}
