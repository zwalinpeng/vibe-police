import PlaylistCard from "./playlistCard";
import PlaylistRow from "./playlistRow";

export default function PlaylistView({ playlists }: { playlists: any[] }) {
  // for larger screens
  const cardView = playlists.map((playlist: any) => (
    <PlaylistCard key={playlist.id} playlist={playlist} />
  ));
  // for smaller screens (mobile mostly)
  const listView = playlists.map((playlist: any) => (
    <PlaylistRow key={playlist.id} playlist={playlist} />
  ));
  return (
    <>
      <div className="md:hidden mb-20">{listView}</div>
      <div className="max-md:hidden grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr mb-24">
        {cardView}
      </div>
    </>
  );
}
