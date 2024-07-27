import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import StatViewer from "@/app/_components/statViewer";
import {
  getAllTracks,
  getPlaylist,
  getAudioFeatures,
  getPlaylistStats,
} from "@/app/_lib/spotify";
import { getScore } from "@/app/_lib/score";

export default async function Playlist({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // redirect to login is not logged in
  if (!session) {
    redirect("/login");
  }
  const playlist = await getPlaylist({ session, id: params.id });
  // console.log(playlist);
  if (session.user.id != playlist.owner.id) {
    return (
      <>
        <p>this not ur playlist...</p>
      </>
    );
  }
  const thumbnail = playlist.images ? playlist.images[0].url : "/no_image.jpg";
  return (
    <>
      <div className="mx-4 md:mx-36 my-12">
        <div className="flex items-center">
          <div className="overflow-hidden h-48 w-48 mr-4 mb-4 rounded-[5%]">
            <Image
              src={thumbnail}
              height={200}
              width={200}
              style={{ objectFit: "cover" }}
              alt={`${playlist.name} thumbnail}`}
            />
          </div>
          <p className="text-4xl font-semibold">{playlist.name}</p>
        </div>
        <StatViewer id={params.id} session={session} />
      </div>
    </>
  );
}
