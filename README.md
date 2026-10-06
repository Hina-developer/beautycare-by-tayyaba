# Beauty Care by Tayyaba — Grand Opening Website

React.js (Vite) website. Black and gold, with balloons, party poppers, all the deal posters, WhatsApp and call buttons, TikTok and Instagram links, and your own song for each day of the week.

## Chalane ka tareeqa (how to run)

Pehle [Node.js](https://nodejs.org) install karein (version 18 ya us se naya). Phir is folder mein terminal khol kar:

```bash
npm install      # sirf pehli dafa
npm run dev      # website computer par chalegi, link terminal mein dikhega
```

## GitHub par free hosting (GitHub Pages)

Is ke liye computer par Node.js install karne ki zaroorat nahi. GitHub khud React code ko build kar ke website bana deta hai.

1. github.com par account banayein aur **New repository** banayein: naam `beautycare-by-tayyaba`, **Public**, "Add a README file" par tick.
2. **Add file → Upload files**: is folder ke andar ki saari cheezein drag karein (`index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `README.md`, `src`, `public`), phir **Commit changes**.
3. **Settings → Pages → Source** mein **GitHub Actions** chunein.
4. **Add file → Create new file**: naam mein `.github/workflows/deploy.yml` likhein, neeche wala code paste karein, phir **Commit changes**.
5. **Actions** tab mein sabz tick aane ka intezar karein (2 se 3 minute). Link **Settings → Pages** mein milega: `https://AAP-KA-USERNAME.github.io/beautycare-by-tayyaba/`

```yaml
name: Deploy website to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Get the code
        uses: actions/checkout@v7
      - name: Set up Node
        uses: actions/setup-node@v7
        with:
          node-version: lts/*
      - name: Install packages
        run: npm install
      - name: Build the React website
        run: npm run build
      - name: Set up Pages
        uses: actions/configure-pages@v6
      - name: Upload the built website
        uses: actions/upload-pages-artifact@v5
        with:
          path: './dist'
      - name: Publish
        id: deployment
        uses: actions/deploy-pages@v5
```

Is ke baad jab bhi repository mein koi file badlein gay (poster, song, price), website 2 se 3 minute mein khud update ho jayegi.

Kisi aur hosting (Netlify, Vercel) ke liye: `npm run build` chalayein aur `dist` folder upload kar dein.

## Kya kahan hai (where things are)

| Kya badalna hai | File |
| --- | --- |
| Phone number, WhatsApp, TikTok, Instagram, address | `src/data.js` (sab se upar `SALON`) |
| Deals ke naam aur prices | `src/data.js` (`OPENING_DEALS` aur `DEALS`) |
| Posters ki images | `public/images/` |
| Har din ka song | `public/songs/` |
| Colours aur fonts | `src/styles.css` (sab se upar `:root`) |

## Songs: har din alag song

`public/songs/` folder mein har din ka ek song hai:

| Din | File | Song |
| --- | --- | --- |
| Monday | `monday.mp3` | Daybreak |
| Tuesday | `tuesday.mp3` | Home |
| Wednesday | `wednesday.mp3` | Find You |
| Thursday | `thursday.mp3` | Faith (love remix) |
| Friday | `friday.mp3` | From Here |
| Saturday | `saturday.mp3` | Lost Islands |
| Sunday | `sunday.mp3` | Leaving Millie (live piano) |

Yeh songs Tanner Helland ke hain, [CC BY 4.0 licence](https://github.com/tannerhelland/free-music) par free hain (business ke liye bhi). Shart yeh hai ke website par "Music by Tanner Helland" likha rahe. Yeh footer mein likha hua hai.

- Song badalna ho to apni MP3 file usi naam se `public/songs/` mein rakh dein aur `src/music.js` mein us din ka `title` badal dein.
- Saaton songs apne laga lein to `src/music.js` mein `MUSIC_CREDIT = null` kar dein.
- Jis din ki file nahi hogi, us din koi music nahi chalega.
- Awaaz kam ya zyada karni ho to `src/music.js` mein `VOLUME` badlein (0 se 1).
- Browser bina tap ke awaaz nahi chalne deta. Is liye song tab shuru hota hai jab visitor pehli screen par ribbon kaat-ta hai.
- Neeche wali gold bar se song band/chalu hota hai aur doosre din ka song bhi sun sakte hain.

## Images: sab ek saath load hoti hain

Website khulte hi saari images ek saath load hoti hain (`src/preload.js`). Jab tak sab load na ho jayein, pehli screen par percentage dikhta hai. Is ke baad scroll karte waqt koi image late load nahi hoti. Images ko WebP mein chhota kiya gaya hai taa ke jaldi khulein.

## Nayi deal add karna

1. Poster ko `public/images/` mein rakhein, masalan `eid-deal.webp` (JPG/PNG bhi chalega, phir `src/data.js` ke `img()` mein extension badal dein).
2. `src/posterSizes.json` mein us ka size likhein: `"eid-deal": [1080, 1350]`
3. `src/data.js` ki `DEALS` list mein ek line add karein:

```js
{ id: 'eid-deal', cat: 'skin', title: 'Eid Deal', was: 'Rs 3,000', now: 'Rs 2,500' },
```

## Folder structure

```
index.html
src/
  main.jsx            React start
  App.jsx             poora page
  data.js             salon ki details aur deals
  music.js            har din ka song (songs ki list yahan hai)
  preload.js          saari images pehle load karna
  confetti.js         party poppers
  styles.css          design
  components/
    OpeningGate.jsx   pehli screen (ribbon cutting)
    Balloons.jsx      balloons (tap karne par phat-te hain)
    PosterCard.jsx    ek deal ka card
    Lightbox.jsx      poster bada kar ke dekhna
    Dock.jsx          neeche wali bar: music, call, WhatsApp
    Icons.jsx         icons
public/
  images/             posters
  songs/              aap ke MP3 songs
```
