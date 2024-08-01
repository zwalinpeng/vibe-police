export default async function Playlist({
  params,
}: {
  params: { code: number };
}) {
  let errorMsg: string = "";
  if (params.code == 401) {
    // prompt refresh
    errorMsg = "try refreshing or logging out and back in";
  } else if (params.code == 403) {
    // uhhh mb lmk and i'll look into it
    errorMsg = "uhhh this is mb lmk and i'll try looking into it";
  } else if (params.code == 429) {
    // no more bandwith...give me a break
    errorMsg = "spotify is tired :( no more numbers :(";
  } else {
    errorMsg = "uhhh ngl idk what happened";
  }
  return (
    <>
      <div className="text-xl text-center font-bold mx-auto w-fit my-10">
        <p>{errorMsg}</p>
      </div>
    </>
  );
}
