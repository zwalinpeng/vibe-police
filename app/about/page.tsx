import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="mx-4 md:mx-36 mt-4 mb-12">
        <div className="mb-4">
          <h1 className="font-bold text-lg">what is this?</h1>
          <p>a web app for u to see the stats of ur spotify playlists :D</p>
        </div>
        <div className="mb-4">
          <h1 className="font-bold text-lg">
            where&#39;d the stats come from?
          </h1>
          <p>
            everything besides vibe is the average of the number spotify has for
            the tracks on ur playlist. u can find the definitions on their
            documentation{" "}
            <a
              href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features"
              className="font-bold hover:underline"
            >
              here
            </a>
          </p>
        </div>
        <div className="mb-4">
          <h1 id="vibe" className="font-bold text-lg">
            where&#39;d vibe come from then?
          </h1>
          <div className="flex">
            <p className="mr-1">math</p>
            <Image
              src={"/heh.png"}
              height={20}
              width={20}
              style={{ float: "left" }}
              alt={"smug emoji"}
            />
          </div>
          <p>
            ... if u wanna know exactly how it&#39;s on the readme{" "}
            <a
              href="https://github.com/zwalinpeng/vibe-police#"
              className="font-bold hover:underline"
            >
              here
            </a>
          </p>
        </div>
        <div className="mb-4">
          <h1 className="font-bold text-lg">why no ai/ml?</h1>
          <p>
            <a
              className="hover:underline font-bold"
              href="https://developer.spotify.com/terms#section-iv-restrictions"
            >
              illegal
            </a>{" "}
            ! !
          </p>
        </div>
        <div className="mb-4">
          <h1 className="font-bold text-lg">
            i don&#39;t want to give u access to my spotify anymore {">"}:(
          </h1>
          <p>
            that&#39;s ok! just remove vibe police from{" "}
            <a
              className="hover:underline font-bold"
              href="https://www.spotify.com/us/account/apps/"
            >
              here
            </a>{" "}
            :)
          </p>
        </div>
        <div className="mb-4">
          <h1 className="font-bold text-lg">
            omg ur so cool how can i reach u?
          </h1>
          <div className="flex">
            <p className="mr-1">omg noooo ahahahaha</p>
            <Image
              src={"/aw.png"}
              height={20}
              width={25}
              style={{ float: "left" }}
              alt={"smug emoji"}
            />
          </div>
          <ul>
            <li>
              {"> "}
              <a
                className="hover:underline"
                href="https://github.com/zwalinpeng"
              >
                github
              </a>
            </li>
            <li>
              {"> "}
              <a
                className="hover:underline"
                href="https://www.linkedin.com/in/zoiepng/"
              >
                linkedin
              </a>
            </li>

            <li>
              {"> "}
              <a
                className="hover:underline"
                href="mailto:zoiepng3102@gmail.com"
              >
                email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
