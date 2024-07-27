import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard({ playlist }: { playlist: any }) {
  const thumbnail = playlist.images ? playlist.images[0].url : "/no_image.jpg";
  return (
    <>
      <Link href={`/playlist/${playlist.id}`}>
        <div className="mx-4 px-3 pt-3 pb-5 self-start w-fit hover:bg-spotify-grey rounded-[5%]">
          <div className="overflow-hidden h-48 w-48 rounded-[5%]">
            <Image
              src={thumbnail}
              height={200}
              width={200}
              style={{ objectFit: "cover" }}
              alt={`${playlist.name} thumbnail}`}
            />
          </div>
          <p className="ml-0.5">{playlist.name}</p>
        </div>
      </Link>
    </>
  );
}
