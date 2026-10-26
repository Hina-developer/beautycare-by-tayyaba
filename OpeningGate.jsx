import { useEffect, useState } from 'react'
import { LOGO } from '../data'

/**
 * The welcome screen. It waits until every image is loaded, then the visitor
 * taps Enter. That tap is also what lets the browser start the music.
 */
export default function OpeningGate({ loaded, total, onOpen }) {
  const ready = loaded >= total
  const [cut, setCut] = useState(false)

  // stop the page behind from scrolling while the welcome screen is up
  useEffect(() => {
    document.documentElement.classList.add('gate-up')
    return () => document.documentElement.classList.remove('gate-up')
  }, [])

  function handleEnter() {
    if (!ready || cut) return
    setCut(true)
    onOpen()
  }

  const percent = Math.round((loaded / total) * 100)

  return (
    <div className={'gate' + (cut ? ' is-cut' : '')} role="dialog" aria-modal="true" aria-label="Welcome">
      <div className="gate-frame">
        <img className="gate-logo" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Beauty Care by Tayyaba" />
        <p className="script gate-invite">Welcome to our salon</p>
        <h1 className="gate-title gold-text">Look Good, Feel Amazing</h1>

        <div className="ribbon">
          <span className="ribbon-half ribbon-left" />
          <span className="ribbon-half ribbon-right" />
          <button className="ribbon-cut" onClick={handleEnter} disabled={!ready} id="cut-ribbon">
            Enter
          </button>
        </div>

        {ready ? (
          <p className="gate-hint">
            <label htmlFor="cut-ribbon">Tap Enter to see our deals</label>
            <small>Today's song starts when you enter</small>
          </p>
        ) : (
          <p className="gate-hint" aria-live="polite">
            Getting the deals ready… {percent}%
            <span className="gate-bar">
              <span style={{ width: percent + '%' }} />
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
