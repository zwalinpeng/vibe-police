import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getGuestLists, getOwnedLists } from "./_lib/spotify";
import PlaylistSearch from "./_components/playlistSearch";
import { authOptions } from "./_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // redirect to login is not logged in
  if (!session) {
    redirect("/login");
  }
  // get playlists owned by user
  console.log(session);
  const lists =
    session.user.id == "guest"
      ? await getGuestLists(session)
      : await getOwnedLists(session);
  // if logged in
  return (
    <>
      <div className="mx-[5%] lg:mx-[10%]">
        <p className="mt-4 md:mt-10 ml-2 text-3xl md:text-5xl font-extrabold">
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
