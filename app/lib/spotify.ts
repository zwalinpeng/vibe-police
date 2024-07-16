import { Session } from "next-auth";

// playlist operations

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
  console.log(data);
  return data;
};

// get tracks on playlist by id
const getTracks = async ({
  session,
  id,
  limit = 50,
  offset = 0,
  endpoint = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}`,
}: {
  session: Session;
  id: string;
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
