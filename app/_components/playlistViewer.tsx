import PlaylistCard from "./playlistCard";

export default function PlaylistView({ playlists }: { playlists: any }) {
  const listItems = playlists.map((playlist: any) => (
    <PlaylistCard key={playlist.id} playlist={playlist} />
  ));
  return (
    <>
      <div className="grid md:grid-cols-5 auto-rows-fr m-7 md:mx-32 gap-5">
        {listItems}
      </div>
    </>
  );
}
