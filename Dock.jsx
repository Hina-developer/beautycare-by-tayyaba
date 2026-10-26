import { useState } from 'react'
import { SALON, bookingLink } from '../data'
import { DAY_KEYS, DAY_LABELS, SONGS, todayKey } from '../music'
import { firePoppers } from '../confetti'
import { ChevronIcon, Equalizer, PhoneIcon, SparkleIcon, WhatsAppIcon } from './Icons'

/** The bar fixed to the bottom: music, sparkle, call and WhatsApp. */
export default function Dock({ music, dayKey, onToggle, onPickDay }) {
  const playing = music === 'playing'
  const status = { playing: 'Now playing', off: 'Music is off. Tap to play', missing: 'No song added yet' }[music]
  const [open, setOpen] = useState(false)
  const today = todayKey()
  const label = DAY_LABELS[DAY_KEYS.indexOf(dayKey)]

  return (
    <div className="dock-wrap">
      {open && (
        <div className="days" id="day-songs">
          <p className="days-title">A different song every day</p>
          <ul>
            {DAY_KEYS.map((key, i) => (
              <li key={key}>
                <button
                  className={'day' + (key === dayKey ? ' is-current' : '')}
                  onClick={() => {
                    onPickDay(key)
                    setOpen(false)
                  }}
                >
                  <span className="day-name">
                    {DAY_LABELS[i]}
                    {key === today && <em>Today</em>}
                  </span>
                  <span className="day-track">{SONGS[key].title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="dock">
        <button className="dock-music" onClick={onToggle} aria-pressed={playing} id="music-toggle">
          <Equalizer playing={playing} />
          <span className="dock-music-text">
            <small>{status}</small>
            {label} song{SONGS[dayKey].title ? ': ' + SONGS[dayKey].title : ''}
          </span>
        </button>
        <button
          className="icon-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="day-songs"
          aria-label="Choose another day's song"
        >
          <ChevronIcon style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
        </button>
        <span className="dock-divider" />
        <button className="icon-btn" onClick={firePoppers} aria-label="Throw some sparkle">
          <SparkleIcon />
        </button>
        <a className="icon-btn" href={SALON.tel} aria-label={'Call ' + SALON.phoneDisplay}>
          <PhoneIcon />
        </a>
        <a className="icon-btn icon-btn-solid" href={bookingLink()} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  )
}
