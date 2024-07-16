import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPlaylist } from "@/app/_lib/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Playlist({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // redirect to login is not logged in
  if (!session) {
    redirect("/login");
  }
  const playlist = await getPlaylist({ session, id: params.id });
  if (session.user.id != playlist.owner.id) {
    return (
      <>
        <p>this not ur playlist...</p>
      </>
    );
  }
  return (
    <>
      <p>{params.id}</p>
    </>
  );
}
