export default function About() {
  return (
    <>
      <div className="mx-4 md:mx-36">
        <p>:P</p>
        <p>
          explaining my math :), so basically i chose some of the features
          spotify offers in their api (pretty much all of them) and decided to
          use similarity metrics (euclidean distance lmao) to see how similar
          songs in the playlist are to each other. for most of the features on
          spotify, it looked like they were between 0 and 1 inclusive, so i
          scaled the features with larger ranges into the [0, 1] range (aka
          min-max normalization). that way, all the features are equally
          important in determining how similar the songs are to each other
          (equality !!!!). and then i found the center of your playlist (the
          median value of all the features) and got the distance of each song
          from the center and then got the average but also found the biggest
          distance and subtracted them both from 60 and scaled it so you get a
          score out of 100 :D which is all to say, the number doesn't mean much
          really because i made it up!!! tldr: number kinda real but not really
        </p>
      </div>
    </>
  );
}
