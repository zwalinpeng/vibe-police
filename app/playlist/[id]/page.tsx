import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getAllTracks,
  getPlaylist,
  getAudioFeatures,
  getPlaylistStats,
} from "@/app/_lib/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import StatViewer from "@/app/_components/statViewer";

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
  const fields = "next,items(track(name, id))";
  const tracks = await getAllTracks({ session, id: params.id, fields });
  const track_ids: string[] = tracks.map((track: any) => track.id);
  const track_features = await getAudioFeatures({ session, ids: track_ids });
  const stats = getPlaylistStats({ track_features });
  return (
    <>
      <div className="flex items-center">
        <div className="overflow-hidden h-48 w-48 rounded-[5%]">
          <Image
            src={thumbnail}
            height={200}
            width={200}
            style={{ objectFit: "cover" }}
            alt={`${playlist.name} thumbnail}`}
          />
        </div>
        <p className="text-3xl">{playlist.name}</p>
      </div>
      <StatViewer stats={stats} />
    </>
  );
}
