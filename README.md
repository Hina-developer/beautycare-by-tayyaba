# Beauty Care by Tayyaba — Salon Website

React.js (Vite) website. Black and gold, with floating makeup brushes, lipsticks and other salon items, glitter, all the deal posters, WhatsApp and call buttons, TikTok and Instagram links, and your own song for each day of the week.

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

Menu: Home · Services (All, Makeup, Hair, Nails & Lashes, Skin/Spa/Body, Training) · Shop (Bridal & Party Wear, Dress on Rent, Jewellery, Beauty Products) · Weekend Deals · Gallery · About (About Us, Follow Us) · Contact.
Har page ka apna link hai, jaise `.../#boutique`, `.../#rent`, `.../#contact`.

| Kya badalna hai | File |
| --- | --- |
| Phone, WhatsApp, TikTok, Instagram, address, timing, website link | `src/data.js` (sab se upar `SALON`) |
| Services, un ke price aur time | `src/services.js` |
| Dresses, rental dresses, jewellery, beauty products | `src/catalog.js` (tasveerein `public/shop/` mein) |
| Rental dress ki booked dates | `src/catalog.js` (har dress ka `booked`) |
| Weekend Deals ki posts | `src/designedDeals.js` |
| Deal posters | `src/data.js` aur `public/images/` |
| Gallery ki tasveerein aur videos | `src/gallery.js` aur `public/gallery/` |
| Client reviews (sirf asli) | `src/reviews.js` |
| Training page | `src/pages/Training.jsx` |
| Menu | `src/router.js` |
| Har din ka song | `public/songs/` |
| Colours aur fonts | `src/styles.css` (sab se upar `:root`) |

## Orders, bookings aur admin

- Admin panel aur database **nahi** hai (aap ne WhatsApp wala tareeqa chuna). Cart ka order, appointment, rental request aur message, sab WhatsApp par tayyar message ban kar aate hain. Client WhatsApp mein Send dabati hai, phir aap jawab de kar confirm karti hain.
- Online payment nahi hai. Price aur payment WhatsApp par tay hota hai.
- Rental: koi booking khud confirm nahi hoti. Aap check kar ke WhatsApp par confirm karti hain. Jo dates book ho jayein woh `catalog.js` mein `booked` mein likh dein, phir website un dates par warning degi.
- Prices, products, deals badalne ke liye file badal kar GitHub par upload karein (ya mujhe bata dein).
- Baad mein admin panel chahiye ho to Supabase (free) jod sakte hain.

## Likes (dil wala button)

Har service card par **Like** button hai. Pehli dafa like karne par visitor apna naam likhti hai (sirf ek dafa). **"1 like / 5 likes"** par tap karne se un logon ke naam ki list khulti hai jinhon ne like kiya.

**Abhi:** `src/likesConfig.js` khali hai, is liye like sirf usi phone par yaad rehta hai. Doosre log aur aap kisi aur ka like nahi dekh saktin.

**Sab ko list dikhane ke liye (free Firebase, ek dafa ka kaam):**
1. https://console.firebase.google.com par apne Google account se jayein, **Create a project** (naam: beautycare-likes). Google Analytics band kar dein.
2. Left menu **Build > Authentication > Get started > Sign-in method > Anonymous > Enable > Save**.
3. **Build > Firestore Database > Create database**, location koi bhi (masalan asia-south1), **Start in production mode**.
4. Firestore mein **Rules** tab kholein, sab mita kar yeh paste karein, phir **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /likes/{id} {
      allow read: if true;
      allow create: if request.auth != null
        && id == request.resource.data.post + '__' + request.auth.uid
        && request.resource.data.keys().hasOnly(['post', 'name', 'uid', 'at'])
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.post is string && request.resource.data.post.size() <= 80
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0 && request.resource.data.name.size() <= 40;
      allow delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
  }
}
```
5. Upar gear icon > **Project settings**. Wahan se **Project ID** aur **Web API Key** copy karein.
6. GitHub par `src/likesConfig.js` kholein, pencil (edit) dabayein, dono values `''` ke andar likhein, **Commit changes**.

Rules ki wajah se har koi sirf apna like hata sakta hai, kisi aur ka nahi. Kisi ka galat naam hatana ho to Firebase mein **Firestore > Data > likes** mein us document ko delete kar dein.

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
- Browser bina tap ke awaaz nahi chalne deta. Is liye song tab shuru hota hai jab visitor pehli screen par Enter dabata hai.
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
index.html            page ka naam, Google ke liye details
src/
  App.jsx             welcome screen, menu, music, cart aur pages
  router.js           menu aur pages ki list
  data.js             salon ki details aur posters
  services.js         services
  catalog.js          shop: dresses, rental, jewellery, products
  cart.js             cart
  designedDeals.js    Weekend Deals posts
  gallery.js          gallery
  reviews.js          reviews
  music.js, preload.js, confetti.js, styles.css
  pages/              har page ki file (Home, ServicesPage, Training, Boutique, Rent,
                      Jewellery, Products, Deals, Gallery, About, Follow, Contact)
  components/         Header, Footer, CartDrawer, ProductModal, ShopPage, Modal,
                      DealPost, ServiceArt (drawings), OpeningGate, Dock, waghera
public/
  images/  songs/  shop/  gallery/
```
