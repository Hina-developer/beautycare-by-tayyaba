import { useEffect, useState } from 'react'
import { LOGO } from '../data'
import { ScissorsIcon } from './Icons'

/**
 * The first screen. It waits until every image is loaded, then the visitor
 * cuts the ribbon. That tap is also what lets the browser start the music.
 */
export default function OpeningGate({ loaded, total, onOpen }) {
  const ready = loaded >= total
  const [cut, setCut] = useState(false)

  // stop the page behind from scrolling while the gate is up
  useEffect(() => {
    document.documentElement.classList.add('gate-up')
    return () => document.documentElement.classList.remove('gate-up')
  }, [])

  function handleCut() {
    if (!ready || cut) return
    setCut(true)
    onOpen()
  }

  const percent = Math.round((loaded / total) * 100)

  return (
    <div className={'gate' + (cut ? ' is-cut' : '')} role="dialog" aria-modal="true" aria-label="Grand opening">
      <div className="gate-frame">
        <img className="gate-logo" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Beauty Care by Tayyaba" />
        <p className="script gate-invite">You are invited to our</p>
        <h1 className="gate-title gold-text">Grand Opening</h1>

        <div className="ribbon">
          <span className="ribbon-half ribbon-left" />
          <span className="ribbon-half ribbon-right" />
          <button className="ribbon-cut" onClick={handleCut} disabled={!ready} id="cut-ribbon" aria-label="Cut the ribbon and enter">
            <ScissorsIcon width={26} height={26} />
          </button>
        </div>

        {ready ? (
          <p className="gate-hint">
            <label htmlFor="cut-ribbon">Tap the scissors to cut the ribbon</label>
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
