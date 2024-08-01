import Link from "next/link";
import Image from "next/image";

export default function PlaylistRow({ playlist }: { playlist: any }) {
  const thumbnail = playlist.images ? playlist.images[0].url : "/no_image.jpg";
  return (
    <>
      <Link href={`/playlist/${playlist.id}`}>
        <div className="self-start flex p-2 my-2 w-full bg-spotify-grey rounded-md">
          <div className="overflow-hidden h-fit w-fit rounded-md mr-4">
            <Image
              src={thumbnail}
              height={75}
              width={75}
              style={{ objectFit: "cover" }}
              alt={`${playlist.name} thumbnail}`}
            />
          </div>
          <p className="self-center">{playlist.name}</p>
        </div>
      </Link>
    </>
  );
}
