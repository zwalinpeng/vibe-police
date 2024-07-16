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
      <p>hi {session.user.name}</p>
      <p>I WILL STYLE EVERYTHING LATER PROMISE</p>
      <PlaylistView playlists={lists} />
    </>
  );
}
