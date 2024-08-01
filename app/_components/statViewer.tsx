"use client";

import { useEffect, useState } from "react";
import {
  getAllTracks,
  getAudioFeatures,
  getPlaylistStats,
} from "../_lib/spotify";
import { Session } from "next-auth";

export default function StatViewer({
  id,
  session,
}: {
  id: string;
  session: Session;
}) {
  const [stats, setStats] = useState();

  useEffect(() => {
    const loadStats = async () => {
      const fields = "next,items(track(name, id))";
      const tracks = await getAllTracks({ session, id: id, fields });
      const track_ids: string[] = tracks.map((track: any) => track.id);
      const track_features = await getAudioFeatures({
        session,
        ids: track_ids,
      });
      const data = getPlaylistStats({ track_features });
      const stat_rows = data.map(
        (stat: { name: string; avg: number }, index: number) => (
          <tr key={stat.name} className="hover:bg-spotify-grey">
            <td className="rounded-l-md text-center py-3 max-md:px-2">
              {index + 1}
            </td>
            <td className="py-3">{stat.name}</td>
            <td className="rounded-r-md text-center py-3">
              {stat.name == "tempo"
                ? `${stat.avg.toFixed(1)} bpm`
                : `${(stat.avg * 100).toFixed(1)}%`}
            </td>
          </tr>
        )
      );
      setStats(stat_rows);
    };
    loadStats();
  }, [id, session, setStats]);
  // don't display table when still loading data
  if (!stats) {
    return (
      <>
        <p className="text-xl">doing tricks on it !!!!!!</p>
      </>
    );
  }
  return (
    <>
      <table className="w-full">
        <thead className="border-b-2 border-spotify-grey">
          <tr className="h-3 leading-loose">
            <th>#</th>
            <th className="text-left">Stat</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{stats}</tbody>
      </table>
    </>
  );
}
