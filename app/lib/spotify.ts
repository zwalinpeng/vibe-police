import { Session } from "next-auth";

// playlist operations

// get all playlists owned by user
export const getOwnedLists = async (session: Session) => {
  // initial get
  let data = await getPlaylists({ session, limit: 50, offset: 0 });
  let owned = data.items.filter(
    (item: any) => item.owner.id == session.user.id
  );
  // continue until get all playlists
  while (data.next) {
    console.log(data.next);
    data = await getPlaylists({ session, endpoint: data.next });
    owned = owned.concat(
      data.items.filter((item: any) => item.owner.id == session.user.id)
    );
  }
  console.log(owned);
  return owned;
};

// get playlists followed or owned by user
const getPlaylists = async ({
  session,
  limit = 5,
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
