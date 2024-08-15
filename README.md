# it's the vibe police 🚓 🚨 🚓 🚨 🚓 🚨

find out if ur spotify playlists r a vibe or not! browse ur playlists and see their average score on spotify's audio features as well as its vibe score (explained below)

**a next.js/react/typescript web app using spotify web api and next-auth**

visit @ <https://vibe-police.vercel.app/> !!

> u will need to give me ur email if u want to see ur own playlists but feel free to use the guest access :)

future plans:

- loading animation
- thumbnail image sizing issues
- identify outlier in playlist
- aesthetic adjustments (maybe)
- other suggestions ?

# run on ur local

clone and then set up .env.local with

- CLIENT_ID (spotify)
- CLIENT_SECRET (spotify)
- NEXTAUTH_URL
- NEXTAUTH_SECRET

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
5. when calculating vibe, let x = 2 x average + largest distance. this is because i wanted average to be weighted more in the scoring. if x < 2.84, $y = \log_6 (x - 1)$ else, $y = x - 2.5$. then the vibe score = $\frac{4 - y}{4} * 100$. there wasn't too much actual mathematical reasoning behind these equations, because there isn't a limit to the range of x, i could only roughly design something based on the metrics of my playlists. the function is piecewise to flatten the upper ranges to enable a reasonable range of scores in the 90s.
