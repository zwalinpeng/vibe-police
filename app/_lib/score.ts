// doing tricks (math) on it (audio features)

// class to store audio features for a track
class TrackVector {
  // id: string = "";
  acousticness: number = 0;
  danceability: number = 0;
  energy: number = 0;
  instrumentalness: number = 0;
  key: number = 0;
  liveness: number = 0;
  loudness: number = 0;
  mode: number = 0;
  speechiness: number = 0;
  tempo: number = 0;
  time_signature: number = 0;
  valence: number = 0;

  constructor(features?: trackFeatures) {
    if (features) {
      // this.id = features.id;
      this.acousticness = features.acousticness;
      this.danceability = features.danceability;
      this.energy = features.energy;
      this.instrumentalness = features.instrumentalness;
      this.key = features.key;
      this.liveness = features.liveness;
      this.loudness = features.loudness;
      this.mode = features.mode;
      this.speechiness = features.speechiness;
      this.tempo = features.tempo;
      this.time_signature = features.time_signature;
      this.valence = features.valence;
    }
  }

  // dynamic setter ?
  setAttr(attr: string, val: number) {
    this[attr] = val;
  }

  // calculate Euclidean distance between this and given vector
  distance(a: TrackVector) {
    let dist: number = 0;
    for (let key of Object.keys(this)) {
      dist += (this[key] - a[key]) ** 2;
    }
    return Math.sqrt(dist);
  }
}

// convert list of features to trackvector[]
const getDataset = (feature_list: any[]): TrackVector[] => {
  let dataset: TrackVector[] = [];
  for (let track of feature_list) {
    dataset.push(new TrackVector(track));
  }
  // return scaled dataset
  return scaleDataset(dataset);
};

// normalize attributes that are not already [0, 1] (key, loudness, tempo)
const scaleDataset = (dataset: TrackVector[]): TrackVector[] => {
  // new array with scaled key (said to be [-1, 11] on api documentation)
  const keyScale = dataset.map((track) => (track.key + 1) / 12);
  // new array with scaled loudness
  const loud = dataset.map((track) => track.loudness);
  const loudMin = Math.min(...loud);
  const loudMax = Math.max(...loud);
  const loudScale = loud.map((l) =>
    Number.isNaN((l - loudMin) / (loudMax - loudMin))
      ? 0
      : (l - loudMin) / (loudMax - loudMin)
  );
  // new array with scaled tempo
  const tempo = dataset.map((track) => track.tempo);
  const tempoMin = Math.min(...tempo);
  const tempoMax = Math.max(...tempo);
  const tempoScale = tempo.map((t) =>
    Number.isNaN((t - tempoMin) / (tempoMax - tempoMin))
      ? 0
      : (t - tempoMin) / (tempoMax - tempoMin)
  );
  // new array with scaled time signature [3, 7]
  const timeScale = dataset.map((track) => (track.time_signature - 3) / 4);
  // update dataset
  for (let index in dataset) {
    dataset[index].setAttr("key", keyScale[index]);
    dataset[index].setAttr("loud", loudScale[index]);
    dataset[index].setAttr("tempo", tempoScale[index]);
    dataset[index].setAttr("time_signature", timeScale[index]);
  }
  return dataset;
};

// get avg of dataset
const getMean = (dataset: TrackVector[]): TrackVector => {
  let mean = new TrackVector();
  for (let key of Object.keys(mean)) {
    let sum: number = dataset.reduce((sum, cur) => sum + cur[key], 0);
    mean.setAttr(key, sum / dataset.length);
  }
  return mean;
};

// get median of dataset
const getMedian = (dataset: TrackVector[]): TrackVector => {
  let median = new TrackVector();
  for (let key of Object.keys(median)) {
    let attr_list: number[] = dataset.map((tVec: TrackVector) => tVec[key]);
    attr_list.sort((x, y) => Number(x) - Number(y));
    const mid = Math.floor(attr_list.length / 2);
    const attr_median: number =
      attr_list.length % 2 == 0
        ? (attr_list[mid - 1] + attr_list[mid]) / 2
        : attr_list[mid];
    median.setAttr(key, attr_median);
  }
  return median;
};

// get average distance from given center
const getDistFromCenter = (
  dataset: TrackVector[],
  center: TrackVector
): { avg: number; max: number } => {
  let avg: number = 0;
  let max: number = 0;
  for (let tVec of dataset) {
    const dist = center.distance(tVec);
    max = Math.max(max, dist);
    avg += dist;
  }
  return { avg: avg / dataset.length, max: max };
};

// return cohesiveness score
export const getScore = (feature_list: any[]): number => {
  const dataset = getDataset(feature_list);
  const median = getMedian(dataset);
  const medDist = getDistFromCenter(dataset, median);
  // const mean = getMean(dataset);
  // const meanDist = getDistFromCenter(dataset, mean);
  return (60 - medDist.max - medDist.avg) / 60;
};
