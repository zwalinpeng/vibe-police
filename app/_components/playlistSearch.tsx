"use client";

import { useState } from "react";
import PlaylistView from "./playlistViewer";

export default function PlaylistSearch({ playlists }: { playlists: any[] }) {
  const [lists, setLists] = useState(playlists);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLists(
      playlists.filter((playlist) =>
        playlist.name.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="find ur playlist"
          className="my-4 p-4 w-full bg-spotify-grey border-transparent border-2 focus:border-white focus:ring-0 focus:outline-none rounded-lg"
          onInput={handleInput}
        />
        <PlaylistView playlists={lists} />
      </div>
    </>
  );
}
