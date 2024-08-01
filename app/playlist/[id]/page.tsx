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
      <div className="mx-[10%] md:mx-[15%] lg:mx-[20%] xl:mx-[30%] mt-6 md:mt-12 mb-24 md:mb-36">
        <div className="md:flex items-center">
          <div className="overflow-hidden relative h-[200px] w-[200px] mr-4 mb-4 rounded-[5%]">
            <Image
              src={thumbnail}
              fill
              style={{ objectFit: "contain" }}
              alt={`${playlist.name} thumbnail}`}
            />
          </div>
          <p className="text-4xl pb-4 font-semibold">{playlist.name}</p>
        </div>
        <StatViewer id={params.id} session={session} />
      </div>
    </>
  );
}
