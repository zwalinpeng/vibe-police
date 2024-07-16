import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard({ playlist }: { playlist: any }) {
  console.log(playlist);
  const thumbnail = playlist.images ? playlist.images[0].url : "/no_image.jpg";
  return (
    <>
      <Link href={`/playlist/${playlist.id}`}>
        <div className="border-2 border-white m-4 p-1">
          <Image
            src={thumbnail}
            height={200}
            width={200}
            style={{ borderRadius: "5%", objectFit: "contain" }}
            alt={`${playlist.name} thumbnail}`}
          />
          <p>{playlist.name}</p>
        </div>
      </Link>
    </>
  );
}
