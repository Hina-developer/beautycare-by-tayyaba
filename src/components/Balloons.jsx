import { useMemo, useState } from 'react'
import { fireConfetti } from '../confetti'

// [light, dark] shades for each balloon colour
const SHADES = [
  ['#f8e2a6', '#b8862f'],
  ['#e0457f', '#8a1042'],
  ['#fbdfe5', '#d98fa5'],
  ['#fff4d9', '#d8b878'],
  ['#3a2f27', '#0d0a08'],
]

const pick = (list) => list[Math.floor(Math.random() * list.length)]

function newBalloon(id, firstRound) {
  return {
    id,
    key: id + '-' + Math.random().toString(36).slice(2, 7),
    // balloons keep to the left and right edges so they do not cover the deals
    left: Math.random() < 0.5 ? Math.random() * 9 : 86 + Math.random() * 9, // % across the screen
    size: (window.innerWidth < 700 ? 38 : 56) + Math.random() * 26, // px wide
    shade: pick(SHADES),
    duration: 13 + Math.random() * 12, // seconds to float to the top
    delay: firstRound ? Math.random() * 3 : Math.random() * 2,
    sway: 3 + Math.random() * 3,
  }
}

/** Balloons float up behind the page. Tap one to pop it. */
export default function Balloons() {
  const count = useMemo(() => (window.innerWidth < 700 ? 6 : 11), [])
  const [balloons, setBalloons] = useState(() => Array.from({ length: count }, (_, i) => newBalloon(i, true)))
  const [popped, setPopped] = useState({})

  function pop(b, event) {
    if (popped[b.key]) return
    fireConfetti({ x: event.clientX, y: event.clientY, angle: -90, spread: 360, count: 26, power: 7 })
    setPopped((p) => ({ ...p, [b.key]: true }))
    // send a fresh balloon up from the bottom in its place
    setTimeout(() => setBalloons((list) => list.map((x) => (x.id === b.id ? newBalloon(b.id, false) : x))), 260)
  }

  return (
    <div className="balloons" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.key}
          className="balloon"
          style={{
            left: b.left + '%',
            width: b.size,
            animationDuration: b.duration + 's',
            animationDelay: b.delay + 's',
          }}
        >
          <svg
            className={'balloon-body' + (popped[b.key] ? ' is-popped' : '')}
            style={{ animationDuration: b.sway + 's' }}
            viewBox="0 0 60 150"
          >
            <defs>
              <radialGradient id={'g' + b.key} cx="35%" cy="30%" r="75%">
                <stop offset="0" stopColor={b.shade[0]} />
                <stop offset="1" stopColor={b.shade[1]} />
              </radialGradient>
            </defs>
            <path d="M30 76 C31 100 24 118 30 148" fill="none" stroke="#d9ae62" strokeOpacity=".55" strokeWidth="1" />
            <ellipse className="balloon-skin" onClick={(e) => pop(b, e)} cx="30" cy="38" rx="27" ry="35" fill={`url(#g${b.key})`} stroke="#d9ae62" strokeOpacity=".5" strokeWidth=".8" />
            <path d="M26 72 L34 72 L30 78 Z" fill={b.shade[1]} />
            <ellipse cx="20" cy="24" rx="5" ry="9" fill="#fff" fillOpacity=".28" transform="rotate(-24 20 24)" />
          </svg>
        </div>
      ))}
    </div>
  )
}
