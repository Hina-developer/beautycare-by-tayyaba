import { useEffect, useMemo, useRef, useState } from 'react'
import { ALL_IMAGES, CATEGORIES, DEALS, INVITES, LOGO, OPENING_DEALS, SALON, bookingLink } from './data'
import { preloadImages } from './preload'
import { attachConfetti, firePoppers } from './confetti'
import { MUSIC_CREDIT, createMusicPlayer, todayKey } from './music'
import OpeningGate from './components/OpeningGate'
import Balloons from './components/Balloons'
import PosterCard from './components/PosterCard'
import Lightbox from './components/Lightbox'
import Dock from './components/Dock'
import { InstagramIcon, PhoneIcon, PinIcon, TikTokIcon, WhatsAppIcon } from './components/Icons'

export default function App() {
  // ---- image preloading: the gate stays up until every image is ready ----
  const [loaded, setLoaded] = useState(0)
  useEffect(() => {
    preloadImages(ALL_IMAGES, (done) => setLoaded(done))
  }, [])

  // ---- opening gate ----
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

  // ---- confetti canvas ----
  const canvasRef = useRef(null)
  useEffect(() => attachConfetti(canvasRef.current), [])

  // ---- deals filter and poster viewer ----
  const [cat, setCat] = useState('all')
  const visibleDeals = useMemo(() => (cat === 'all' ? DEALS : DEALS.filter((d) => d.cat === cat)), [cat])
  const [viewer, setViewer] = useState(null) // { items, index }

  // ---- copy the phone number ----
  const [copied, setCopied] = useState(false)
  const numberRef = useRef(null)
  function copyNumber() {
    const done = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    const selectIt = () => {
      // if the browser refuses to copy, select the number so it can be copied by hand
      const range = document.createRange()
      range.selectNodeContents(numberRef.current)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(SALON.phoneCopy).then(done, selectIt)
    else selectIt()
  }

  return (
    <>
      {gate !== 'gone' && <OpeningGate loaded={loaded} total={ALL_IMAGES.length} onOpen={openGate} />}
      {opened && <Balloons />}
      <canvas ref={canvasRef} className="confetti" aria-hidden="true" />

      <div className="page">
        <header className="hero">
          <img className="hero-logo" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Beauty Care by Tayyaba, Professional Salon and Spa Services" />
          <p className="script hero-script">Grand Opening</p>
          <h1 className="gold-text">Opening Dhamaka Deals</h1>
          <p className="hero-lead">
            Three opening offers, bridal packages and deals on skin, hair and nails. Book on WhatsApp or call{' '}
            <span className="nowrap">{SALON.phoneDisplay}</span>.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={bookingLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Book on WhatsApp
            </a>
            <a className="btn" href={SALON.tel}>
              <PhoneIcon /> Call {SALON.phoneDisplay}
            </a>
          </div>
          <a className="hero-address" href={SALON.maps} target="_blank" rel="noopener noreferrer">
            <PinIcon width={16} height={16} /> {SALON.address}
          </a>
        </header>

        <section className="featured" aria-label="Opening deals">
          {OPENING_DEALS.map((deal, i) => (
            <PosterCard key={deal.id} deal={deal} featured onView={() => setViewer({ items: OPENING_DEALS, index: i })} />
          ))}
        </section>

        <section id="deals">
          <div className="section-head">
            <p className="script">Choose yours</p>
            <h2 className="gold-text">All Deals</h2>
          </div>
          <div className="chips" role="group" aria-label="Filter deals">
            {CATEGORIES.map((c) => (
              <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="wall">
            {visibleDeals.map((deal, i) => (
              <PosterCard key={deal.id} deal={deal} onView={() => setViewer({ items: visibleDeals, index: i })} />
            ))}
          </div>
        </section>

        <section id="invitation" className="invite">
          <div className="invite-text">
            <p className="script">With love</p>
            <h2 className="gold-text">You Are Invited</h2>
            <p>
              Come and celebrate the opening of our salon with us. Family, friends and every new client are welcome. Your
              presence means a lot.
            </p>
            <a className="btn" href={SALON.maps} target="_blank" rel="noopener noreferrer">
              <PinIcon /> Get directions
            </a>
          </div>
          {INVITES.map((inv, i) => (
            <button key={inv.id} className="card-poster invite-poster" onClick={() => setViewer({ items: INVITES, index: i })} aria-label={`View poster: ${inv.title}`}>
              <img src={inv.src} width={inv.width} height={inv.height} alt={inv.title} loading="eager" decoding="sync" />
            </button>
          ))}
        </section>

        <section id="results">
          <div className="section-head">
            <p className="script">100% real</p>
            <h2 className="gold-text">See Our Results</h2>
            <p>Watch our client results and daily work on TikTok and Instagram.</p>
          </div>
          <div className="socials">
            <a className="social" href={SALON.tiktok} target="_blank" rel="noopener noreferrer">
              <TikTokIcon width={30} height={30} />
              <span>
                <strong>TikTok</strong>
                {SALON.handle}
              </span>
              <em>Open TikTok</em>
            </a>
            <a className="social" href={SALON.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon width={30} height={30} />
              <span>
                <strong>Instagram</strong>
                {SALON.handle}
              </span>
              <em>Open Instagram</em>
            </a>
          </div>
        </section>

        <section id="visit" className="visit">
          <div className="section-head">
            <p className="script">Find us</p>
            <h2 className="gold-text">Visit the Salon</h2>
          </div>
          <div className="visit-grid">
            <div className="visit-item">
              <PinIcon width={26} height={26} />
              <h3>Address</h3>
              <p>{SALON.address}</p>
              <a className="btn btn-small" href={SALON.maps} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </div>
            <div className="visit-item">
              <PhoneIcon width={26} height={26} />
              <h3>Call or message</h3>
              <p className="visit-number" ref={numberRef}>
                {SALON.phoneCopy}
              </p>
              <div className="actions">
                <a className="btn btn-small" href={SALON.tel}>
                  Call
                </a>
                <button className="btn btn-small" onClick={copyNumber} id="copy-number">
                  {copied ? 'Copied' : 'Copy number'}
                </button>
              </div>
            </div>
            <div className="visit-item">
              <WhatsAppIcon width={26} height={26} />
              <h3>WhatsApp</h3>
              <p>Send us a message to book any deal. The same number works for calls and WhatsApp.</p>
              <a className="btn btn-small btn-primary" href={bookingLink()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p className="script">Your beauty, our passion</p>
          <p>
            {SALON.name} · {SALON.tagline}
          </p>
          {MUSIC_CREDIT && (
            <p className="footer-credit">
              <a href={MUSIC_CREDIT.url} target="_blank" rel="noopener noreferrer">
                {MUSIC_CREDIT.text}
              </a>
            </p>
          )}
        </footer>
      </div>

      {opened && <Dock music={music} dayKey={dayKey} onToggle={toggleMusic} onPickDay={pickDay} />}

      {viewer && (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onChange={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  )
}
