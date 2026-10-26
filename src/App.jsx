import { useEffect, useRef, useState } from 'react'
import { ALL_IMAGES } from './data'
import { preloadImages } from './preload'
import { attachConfetti, firePoppers } from './confetti'
import { createMusicPlayer, todayKey } from './music'
import { useRoute } from './router'
import { CartProvider, useCartState } from './cart'
import OpeningGate from './components/OpeningGate'
import FloatingItems from './components/FloatingItems'
import Header from './components/Header'
import Footer from './components/Footer'
import Dock from './components/Dock'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import Training from './pages/Training'
import Boutique from './pages/Boutique'
import Rent from './pages/Rent'
import Jewellery from './pages/Jewellery'
import Products from './pages/Products'
import Deals from './pages/Deals'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Follow from './pages/Follow'
import Contact from './pages/Contact'

// Which component draws each page. The page names and menu are in src/router.js.
const PAGE_VIEWS = {
  home: Home,
  services: () => <ServicesPage group="all" />,
  makeup: () => <ServicesPage group="makeup" />,
  hair: () => <ServicesPage group="hair" />,
  nails: () => <ServicesPage group="nails" />,
  skin: () => <ServicesPage group="skin" />,
  training: Training,
  boutique: Boutique,
  rent: Rent,
  jewellery: Jewellery,
  products: Products,
  deals: Deals,
  gallery: Gallery,
  about: About,
  follow: Follow,
  contact: Contact,
}

export default function App() {
  // ---- image preloading: the welcome screen stays up until every image is ready ----
  const [loaded, setLoaded] = useState(0)
  useEffect(() => {
    preloadImages(ALL_IMAGES, (done) => setLoaded(done))
  }, [])

  // ---- welcome screen ----
  const [gate, setGate] = useState('closed') // closed -> opening -> gone
  const opened = gate !== 'closed'

  // ---- music ----
  const player = useRef(null)
  if (!player.current) player.current = createMusicPlayer()
  const [dayKey, setDayKey] = useState(todayKey)
  const [music, setMusic] = useState('off') // off | playing | missing (no song file for that day)

  function startSong(key) {
    setMusic('playing')
    player.current.play(key).then((ok) => setMusic(ok ? 'playing' : 'missing'))
  }
  function openGate() {
    setGate('opening')
    firePoppers()
    startSong(dayKey) // this tap is what allows the browser to play sound
    setTimeout(() => setGate('gone'), 1400)
  }
  function toggleMusic() {
    if (music === 'playing') {
      player.current.stop()
      setMusic('off')
    } else startSong(dayKey)
  }
  function pickDay(key) {
    setDayKey(key)
    startSong(key)
  }
  useEffect(() => () => player.current.stop(), [])

  // ---- glitter canvas ----
  const canvasRef = useRef(null)
  useEffect(() => attachConfetti(canvasRef.current), [])

  // ---- page and cart ----
  const route = useRoute()
  const Page = PAGE_VIEWS[route]
  const cart = useCartState()

  return (
    <CartProvider value={cart}>
      {gate !== 'gone' && <OpeningGate loaded={loaded} total={ALL_IMAGES.length} onOpen={openGate} />}
      {opened && <FloatingItems />}
      <canvas ref={canvasRef} className="confetti" aria-hidden="true" />

      <Header route={route} />
      <main className="page" key={route}>
        <Page />
        <Footer />
      </main>

      {opened && <Dock music={music} dayKey={dayKey} onToggle={toggleMusic} onPickDay={pickDay} />}
      <CartDrawer />
    </CartProvider>
  )
}
