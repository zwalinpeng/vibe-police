import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard({ playlist }: { playlist: any }) {
  const thumbnail = playlist.images ? playlist.images[0].url : "/no_image.jpg";
  return (
    <>
      <Link href={`/playlist/${playlist.id}`}>
        <div className="border-2 border-white m-4 p-1 self-start w-fit">
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
