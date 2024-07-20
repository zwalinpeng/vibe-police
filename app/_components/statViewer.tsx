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
      console.log(track_features);
      const data = getPlaylistStats({ track_features });
      const stat_rows = data.map(
        (stat: { name: string; avg: number }, index: number) => (
          <tr key={stat.name}>
            <td className="text-center">{index + 1}</td>
            <td>{stat.name}</td>
            <td className="text-center">
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

  if (!stats) {
    return (
      <>
        <p>doing tricks on it</p>
      </>
    );
  }
  return (
    <>
      <table className="border-white border-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Stat</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{stats}</tbody>
      </table>
    </>
  );
}
