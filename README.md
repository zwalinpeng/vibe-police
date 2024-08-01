# it's the vibe police 🚓 🚨 🚓 🚨 🚓 🚨

find out if ur spotify playlists r a vibe or not! browse ur owned playlists and see their average score on spotify's audio features as well as its vibe score (explained below)

> a next.js/react/typescript web app using spotify web api and next-auth

visit @ <https://vibe-police.vercel.app/> !!

future plans:

- loading animation
- identify outlier
- aesthetic adjustments (maybe)
- other suggestions ?

# run on ur local

clone and then

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# where'd the vibe come from?

1. get audio features for all songs on a playlist
2. scale features to [0, 1] range (if not already). this was to ensure that each feature had equal weight, rather than to normalize the data (because i'm not looking for trends/patterns and wanted to punish outliers, i decided not to normalize)
3. find median of all features in playlist (median over mean to punish outliers)
4. get distance of all tracks on playlist from median
5. average distances and subtract the average and largest distance from 60 and scaled score so max is 100. 60 was randomly chosen and tested on my playlists and i thought it was reasonable enough :)

why didn't i do data analysis in python??? because i don't have to :) yay !!

![alt text](https://i.pinimg.com/736x/f6/b2/82/f6b28286372e14c849236dc0ff8438ce.jpg)
