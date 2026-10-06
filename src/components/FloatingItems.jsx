import { useMemo, useState } from 'react'
import { fireConfetti } from '../confetti'

// Salon things that float up the sides of the page: makeup brush, lipstick,
// nail polish, hand mirror, comb, perfume and scissors. Tap one for a sparkle.
// Every drawing uses the same box (60 wide, 110 tall) and the shared colours
// defined once in <defs> below.

const GOLD = 'url(#fi-gold)'
const ROSE = 'url(#fi-rose)'
const BLUSH = 'url(#fi-blush)'
const DARK = '#2a211b'
const EDGE = { stroke: '#8f6a2c', strokeWidth: 0.8 }

const ITEMS = {
  brush: (
    <>
      <path d="M30 6C16 8 12 26 16 44h28C48 26 44 8 30 6z" fill={BLUSH} {...EDGE} />
      <path d="M30 6c-6 1-10 6-12 13 6-5 18-5 24 0-2-7-6-12-12-13z" fill={ROSE} opacity=".75" />
      <rect x="17" y="44" width="26" height="12" rx="2" fill={GOLD} {...EDGE} />
      <path d="M21 56h18l-4 48q-5 4-10 0z" fill={DARK} stroke="#d9ae62" strokeWidth=".9" />
    </>
  ),
  lipstick: (
    <>
      <path d="M22 34V16q0-8 16-10v28z" fill={ROSE} />
      <path d="M25 32V17q0-5 4-6v21z" fill="#fff" opacity=".22" />
      <rect x="20" y="34" width="20" height="14" fill={GOLD} {...EDGE} />
      <rect x="16" y="48" width="28" height="50" rx="3" fill={DARK} stroke="#d9ae62" strokeWidth=".9" />
      <rect x="16" y="48" width="28" height="7" rx="2" fill={GOLD} />
    </>
  ),
  polish: (
    <>
      <rect x="23" y="6" width="14" height="42" rx="3" fill={DARK} stroke="#d9ae62" strokeWidth=".9" />
      <rect x="25" y="48" width="10" height="6" fill={GOLD} />
      <path d="M14 62q0-8 8-8h16q8 0 8 8v32q0 8-8 8H22q-8 0-8-8z" fill={ROSE} {...EDGE} />
      <rect x="19" y="60" width="4" height="30" rx="2" fill="#fff" opacity=".3" />
    </>
  ),
  mirror: (
    <>
      <path d="M26 54h8l-1 46q-3 6-6 0z" fill={GOLD} {...EDGE} />
      <circle cx="30" cy="32" r="25" fill={GOLD} {...EDGE} />
      <circle cx="30" cy="32" r="19" fill={BLUSH} />
      <path d="M19 28a12 12 0 0 1 12-10" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
    </>
  ),
  comb: (
    <>
      {[10, 14.7, 19.4, 24.1, 28.8, 33.5, 38.2, 42.9, 47.6].map((x) => (
        <rect key={x} x={x} y="30" width="2.6" height="52" rx="1.3" fill={GOLD} />
      ))}
      <rect x="7" y="16" width="46" height="18" rx="6" fill={GOLD} {...EDGE} />
    </>
  ),
  perfume: (
    <>
      <rect x="23" y="8" width="14" height="14" rx="2" fill={GOLD} {...EDGE} />
      <rect x="26" y="22" width="8" height="8" fill="#8f6a2c" />
      <rect x="10" y="30" width="40" height="64" rx="9" fill={BLUSH} {...EDGE} />
      <rect x="14" y="52" width="32" height="38" rx="6" fill={ROSE} opacity=".5" />
      <rect x="20" y="60" width="20" height="12" rx="2" fill={GOLD} />
    </>
  ),
  scissors: (
    <>
      <path d="M19 4l12 52-7-4z" fill={GOLD} {...EDGE} />
      <path d="M41 4L29 56l7-4z" fill={GOLD} {...EDGE} />
      <path d="M29 56l-8 22M31 56l8 22" stroke="#d9ae62" strokeWidth="5" strokeLinecap="round" />
      <circle cx="18" cy="89" r="11" fill="none" stroke={GOLD} strokeWidth="5" />
      <circle cx="42" cy="89" r="11" fill="none" stroke={GOLD} strokeWidth="5" />
      <circle cx="30" cy="54" r="3" fill={DARK} />
    </>
  ),
}

const KINDS = Object.keys(ITEMS)
const pick = (list) => list[Math.floor(Math.random() * list.length)]

function newItem(id, firstRound) {
  return {
    id,
    key: id + '-' + Math.random().toString(36).slice(2, 7),
    kind: firstRound ? KINDS[id % KINDS.length] : pick(KINDS), // first round shows one of each
    // items keep to the left and right edges so they do not cover the deals
    left: Math.random() < 0.5 ? Math.random() * 9 : 86 + Math.random() * 9, // % across the screen
    size: (window.innerWidth < 700 ? 34 : 52) + Math.random() * 24, // px wide
    tilt: -28 + Math.random() * 56, // degrees
    duration: 14 + Math.random() * 12, // seconds to float to the top
    delay: firstRound ? Math.random() * 4 : Math.random() * 2,
    sway: 3 + Math.random() * 3,
  }
}

export default function FloatingItems() {
  const count = useMemo(() => (window.innerWidth < 700 ? 6 : 11), [])
  const [items, setItems] = useState(() => Array.from({ length: count }, (_, i) => newItem(i, true)))
  const [gone, setGone] = useState({})

  function tap(item, event) {
    if (gone[item.key]) return
    fireConfetti({ x: event.clientX, y: event.clientY, angle: -90, spread: 360, count: 24, power: 6 })
    setGone((g) => ({ ...g, [item.key]: true }))
    // send a fresh item up from the bottom in its place
    setTimeout(() => setItems((list) => list.map((x) => (x.id === item.id ? newItem(item.id, false) : x))), 260)
  }

  return (
    <div className="floaters" aria-hidden="true">
      {/* shared colours for all the drawings */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="fi-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6dfa3" />
            <stop offset=".55" stopColor="#d9ae62" />
            <stop offset="1" stopColor="#a67c33" />
          </linearGradient>
          <linearGradient id="fi-rose" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e0457f" />
            <stop offset="1" stopColor="#8a1042" />
          </linearGradient>
          <linearGradient id="fi-blush" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fde8ec" />
            <stop offset="1" stopColor="#e3a3b5" />
          </linearGradient>
        </defs>
      </svg>

      {items.map((item) => (
        <div
          key={item.key}
          className="floater"
          style={{
            left: item.left + '%',
            width: item.size,
            animationDuration: item.duration + 's',
            animationDelay: item.delay + 's',
          }}
        >
          <div className="floater-sway" style={{ animationDuration: item.sway + 's' }}>
            <svg
              className={'floater-art' + (gone[item.key] ? ' is-gone' : '')}
              style={{ rotate: item.tilt + 'deg' }}
              viewBox="0 0 60 110"
            >
              <g onClick={(e) => tap(item, e)}>{ITEMS[item.kind]}</g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
