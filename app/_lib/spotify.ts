import { Session } from "next-auth";
import { getScore } from "./score";
import { redirect } from "next/navigation";

// spotify api calls + data cleaning

// get all playlists owned by user
export const getOwnedLists = async (session: Session) => {
  // initial get
  let data = await getPlaylists({ session });
  let owned = data.items.filter(
    (item: any) => item.owner.id == session.user.id
  );
  // continue until get all playlists
  while (data.next) {
    data = await getPlaylists({ session, endpoint: data.next });
    owned = owned.concat(
      data.items.filter((item: any) => item.owner.id == session.user.id)
    );
  }
  return owned;
};

// get playlists followed or owned by user
const getPlaylists = async ({
  session,
  limit = 50,
  offset = 0,
  endpoint = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
}: {
  session: Session;
  limit?: number;
  offset?: number;
  endpoint?: string;
}) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: "Bearer " + session.user.access_token,
    },
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

// get playlist by id
export const getPlaylist = async ({
  session,
  id,
}: {
  session: Session;
  id: string;
}) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${id}?fields=description,images,name,owner.id`,
    {
      headers: {
        Authorization: "Bearer " + session.user.access_token,
      },
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data;
};

// get all tracks on playlist
export const getAllTracks = async ({
  session,
  id,
  fields = "",
}: {
  session: Session;
  id: string;
  fields?: string;
}) => {
  // initial get
  let data = await getTracks({ session, id, fields });
  // clean out null entries
  let items = data.items.filter((track: any) => track.track);
  let tracks = items.map((track: any) => ({
    name: track.track.name,
    id: track.track.id,
  }));
  // continue until get all tracks
  while (data.next) {
    data = await getPlaylists({ session, endpoint: data.next });
    // clean out null entries
    items = data.items.filter((track: any) => track.track);
    tracks = tracks.concat(
      items.map((track: any) => ({
        name: track.track.name,
        id: track.track.id,
      }))
    );
  }
  return tracks;
};

// get tracks on playlist by id
const getTracks = async ({
  session,
  id,
  limit = 50,
  offset = 0,
  fields = "",
  endpoint = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}&fields=items.is_local,${fields}`,
}: {
  session: Session;
  id: string;
  limit?: number;
  offset?: number;
  fields?: string;
  endpoint?: string;
}) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: "Bearer " + session.user.access_token,
    },
    cache: "no-cache",
  });
  // filter out local files
  const data = await response.json();
  data.items = data.items.filter((track: any) => !track.is_local);
  return data;
};

// get audio features for given tracks
export const getAudioFeatures = async ({
  session,
  ids,
}: {
  session: Session;
  ids: string[];
}) => {
  // get audio features for tracks in increments of 50
  let i = 0;
  let queried_ids = ids.slice(i, i + 50);
  let result: any[] = [];
  while (queried_ids.length > 0) {
    const endpoint = `https://api.spotify.com/v1/audio-features?ids=${queried_ids}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: "Bearer " + session.user.access_token,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    result = result.concat(data.audio_features);
    i += 50;
    queried_ids = ids.slice(i, i + 50);
  }
  // filter out null results
  result = result.filter((track) => track);
  return result;
};

// get average stats for playlist
export const getPlaylistStats = ({
  track_features,
  features = [
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
  ],
}: {
  track_features: any[];
  features?: string[];
}) => {
  // get avg score for each feature of interest
  let avg: any = [];
  for (var f of features) {
    const total = track_features
      .map((track: any) => track[f] as number)
      .reduce((a: number, b: number) => a + b);
    avg.push({
      name: f,
      avg: total / track_features.length,
    });
  }
  const vibe = getScore(track_features);
  avg.push({ name: "vibe", avg: vibe });
  return avg;
};

const checkResponse = (res: any) => {
  if (res.error) {
    redirect(`/error/${res.error.status}`);
  }
};
