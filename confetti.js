// Glitter drawn on one full-screen canvas: gold sparkles, round dots and a little paper.
// Usage: attachConfetti(canvasElement) once, then fireConfetti({ x, y, ... }) anywhere.

const COLORS = ['#f6dfa3', '#d9ae62', '#b8862f', '#c2185b', '#f6c9d3', '#fff6e0']
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let canvas = null
let c2d = null
let pieces = []
let frame = null

function resize() {
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  c2d.setTransform(dpr, 0, 0, dpr, 0, 0)
}

export function attachConfetti(el) {
  canvas = el
  c2d = el.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  return () => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(frame)
    frame = null
    pieces = []
    canvas = null
  }
}

function draw() {
  c2d.clearRect(0, 0, window.innerWidth, window.innerHeight)
  pieces = pieces.filter((p) => p.y < window.innerHeight + 40 && p.life > 0)
  for (const p of pieces) {
    p.vx *= 0.985
    p.vy = p.vy * 0.985 + 0.3 // gravity
    p.x += p.vx
    p.y += p.vy
    p.spin += p.spinSpeed
    p.life -= 1
    c2d.save()
    c2d.translate(p.x, p.y)
    c2d.rotate(p.spin)
    c2d.globalAlpha = Math.min(1, p.life / 30)
    c2d.fillStyle = p.color
    if (p.shape === 'star') {
      // four-point sparkle
      const r = p.w
      c2d.beginPath()
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 ? r * 0.32 : r
        const ang = (i * Math.PI) / 4
        c2d.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad)
      }
      c2d.closePath()
      c2d.fill()
    } else if (p.shape === 'dot') {
      c2d.beginPath()
      c2d.arc(0, 0, p.w / 2, 0, Math.PI * 2)
      c2d.fill()
    } else {
      // squash the height as it spins so it flutters like paper
      c2d.fillRect(-p.w / 2, (-p.h / 2) * Math.cos(p.spin * 2), p.w, p.h * Math.cos(p.spin * 2))
    }
    c2d.restore()
  }
  frame = pieces.length ? requestAnimationFrame(draw) : null
}

/**
 * x, y   where the burst starts (pixels from the top-left of the screen)
 * angle  direction in degrees: -90 is straight up, -60 up and right, -120 up and left
 */
export function fireConfetti({ x, y, angle = -90, spread = 70, count = 90, power = 15 }) {
  if (!canvas || reducedMotion()) return
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const shape = roll < 0.4 ? 'star' : roll < 0.75 ? 'dot' : 'paper'
    const a = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180
    const speed = power * (0.45 + Math.random() * 0.75)
    pieces.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      w: 5 + Math.random() * 7,
      h: 8 + Math.random() * 8,
      shape,
      spin: Math.random() * 6,
      spinSpeed: (Math.random() - 0.5) * 0.35,
      // sparkles are always gold; dots and paper use the whole palette
      color: shape === 'star' ? COLORS[Math.floor(Math.random() * 3)] : COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 150 + Math.random() * 90,
    })
  }
  if (!frame) frame = requestAnimationFrame(draw)
}

/** A shower of glitter from the two bottom corners plus one burst in the middle. */
export function firePoppers() {
  const w = window.innerWidth
  const h = window.innerHeight
  const big = w > 700 ? 22 : 16
  fireConfetti({ x: 0, y: h, angle: -62, spread: 50, count: 120, power: big })
  fireConfetti({ x: w, y: h, angle: -118, spread: 50, count: 120, power: big })
  setTimeout(() => fireConfetti({ x: w / 2, y: h * 0.55, angle: -90, spread: 360, count: 90, power: 11 }), 220)
}
