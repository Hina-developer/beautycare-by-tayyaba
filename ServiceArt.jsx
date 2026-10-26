// Gold line drawings for the services, one per kind of work.
// Lines use the current text colour (gold); filled parts use the classes
// .a-rose, .a-blush and .a-gold from styles.css.

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ART = {
  drop: (
    <>
      <path d="M32 8S16 27 16 38a16 16 0 0 0 32 0C48 27 32 8 32 8z" className="a-blush" />
      <path d="M24 40a8 8 0 0 0 7 8" />
      <circle cx="49" cy="15" r="2.4" className="a-rose" />
      <circle cx="54" cy="24" r="1.6" className="a-rose" />
    </>
  ),
  facial: (
    <>
      <ellipse cx="32" cy="37" rx="15" ry="19" />
      <path d="M15 32c0-18 34-18 34 0-6-5-28-5-34 0z" className="a-blush" />
      <circle cx="26" cy="38" r="3.5" className="a-rose" />
      <circle cx="38" cy="38" r="3.5" className="a-rose" />
      <path d="M28 48q4 3 8 0" />
    </>
  ),
  glow: (
    <>
      <circle cx="29" cy="36" r="15" />
      <path d="M22 34q2.5 2.5 5 0M31 34q2.5 2.5 5 0M25 42q4 3 8 0" />
      <path d="M49 8l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" className="a-gold" />
      <path d="M13 10l1.2 3.6 3.6 1.2-3.6 1.2L13 19.6l-1.2-3.6L8.2 14.8l3.6-1.2z" className="a-rose" />
    </>
  ),
  jar: (
    <>
      <rect x="16" y="24" width="32" height="30" rx="6" />
      <rect x="14" y="14" width="36" height="10" rx="3" className="a-gold" />
      <rect x="22" y="33" width="20" height="11" rx="2" className="a-blush" />
    </>
  ),
  jhumka: (
    <>
      <path d="M32 5v5" />
      <circle cx="32" cy="15" r="4.5" className="a-gold" />
      <path d="M19 37c0-14 26-14 26 0z" />
      <path d="M23 37v7M32 37v10M41 37v7" />
      {[20, 26, 32, 38, 44].map((x) => (
        <circle key={x} cx={x} cy="37" r="2" className="a-rose" />
      ))}
      <circle cx="23" cy="46" r="2" className="a-gold" />
      <circle cx="32" cy="49" r="2.4" className="a-rose" />
      <circle cx="41" cy="46" r="2" className="a-gold" />
    </>
  ),
  palette: (
    <>
      <rect x="8" y="20" width="36" height="28" rx="6" />
      <circle cx="18" cy="30" r="4.2" className="a-rose" />
      <circle cx="31" cy="30" r="4.2" className="a-blush" />
      <circle cx="18" cy="40" r="4.2" className="a-gold" />
      <circle cx="31" cy="40" r="4.2" className="a-rose" />
      <path d="M42 54L55 16" strokeWidth="3.2" />
      <path d="M53 15c1-6 7-6 6 0l-2 5h-5z" className="a-rose" />
    </>
  ),
  necklace: (
    <>
      <path d="M10 12c4 28 40 28 44 0" />
      {[[15, 22], [21, 28], [27, 31], [37, 31], [43, 28], [49, 22]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.2" className="a-gold" />
      ))}
      <path d="M32 34l7 9-7 10-7-10z" className="a-rose" />
    </>
  ),
  scissors: (
    <>
      <circle cx="19" cy="49" r="7" />
      <circle cx="45" cy="49" r="7" />
      <path d="M24 44L46 8M40 44L18 8" />
      <circle cx="32" cy="27" r="2" className="a-gold" />
    </>
  ),
  dryer: (
    <>
      <circle cx="24" cy="25" r="13" />
      <circle cx="24" cy="25" r="5" className="a-blush" />
      <path d="M36 19h15v12H36" />
      <path d="M20 38l-3 18h8l3-18" className="a-gold" />
      <path d="M55 21h4M55 25h5M55 29h4" />
    </>
  ),
  waves: (
    <>
      <path d="M18 8c-8 16 8 24 0 48M28 8c-8 16 8 24 0 48M38 8c-8 16 8 24 0 48" />
      <path d="M48 10l1.6 4.4 4.4 1.6-4.4 1.6L48 22l-1.6-4.4-4.4-1.6 4.4-1.6z" className="a-rose" />
      <circle cx="47" cy="44" r="4" className="a-gold" />
    </>
  ),
  straight: (
    <>
      <path d="M17 8v48M25 8v48M33 8v48M41 8v48" />
      <path d="M50 18l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" className="a-gold" />
    </>
  ),
  colorBowl: (
    <>
      <path d="M10 34h40a20 18 0 0 1-40 0z" />
      <ellipse cx="30" cy="34" rx="20" ry="4" className="a-rose" />
      <path d="M38 32L54 10" strokeWidth="3" />
      <path d="M52 7l7 4-3 5-7-4z" className="a-gold" />
    </>
  ),
  oil: (
    <>
      <path d="M20 28h20v24a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" className="a-blush" />
      <rect x="26" y="18" width="8" height="10" />
      <circle cx="30" cy="13" r="5" className="a-rose" />
      <path d="M50 26s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" className="a-gold" />
    </>
  ),
  spaBowl: (
    <>
      <path d="M8 34h48a24 20 0 0 1-48 0z" />
      <ellipse cx="32" cy="34" rx="24" ry="4.5" className="a-blush" />
      <ellipse cx="24" cy="33" rx="3.5" ry="1.8" className="a-rose" />
      <ellipse cx="38" cy="34" rx="3.5" ry="1.8" className="a-rose" />
      <path d="M24 25q-3-5 0-10M32 23q-3-5 0-10M40 25q-3-5 0-10" />
    </>
  ),
  nails: (
    <>
      {[
        [12, 26],
        [23, 18],
        [34, 16],
        [45, 22],
      ].map(([x, top]) => (
        <g key={x}>
          <path d={`M${x} 60V${top + 5}a5 5 0 0 1 10 0V60`} />
          <path d={`M${x + 2} ${top + 6}V${top - 1}q3-8 6 0v7q-3 3-6 0z`} className="a-rose" />
        </g>
      ))}
    </>
  ),
  polish: (
    <>
      <rect x="26" y="5" width="12" height="22" rx="2" className="a-gold" />
      <path d="M28 27h8v5h-8z" />
      <path d="M18 40q0-8 8-8h12q8 0 8 8v12q0 8-8 8H26q-8 0-8-8z" className="a-rose" />
      <path d="M24 40v12" stroke="#fff" opacity=".5" />
      <path d="M53 12l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z" className="a-gold" />
    </>
  ),
  eye: (
    <>
      <path d="M8 36c12-16 36-16 48 0-12 16-36 16-48 0z" />
      <circle cx="32" cy="36" r="8" className="a-blush" />
      <circle cx="32" cy="36" r="3.2" className="a-gold" />
      <path d="M15 28l-4-6M23 23l-2-7M32 21.5V14M41 23l2-7M49 28l4-6" />
    </>
  ),
  brow: (
    <>
      <path d="M10 32c10-14 32-16 44-6-12-4-32-2-42 8z" className="a-gold" />
      <path d="M18 46q14 9 28 0" />
      <path d="M6 54l52-8" strokeWidth="1.4" />
      <path d="M30 51l3 4 4-4" strokeWidth="1.4" />
    </>
  ),
  wax: (
    <>
      <path d="M14 30h30v20a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6z" />
      <path d="M14 30q4 7 8 0 4 9 8 0 4 6 8 0 3 7 6 0z" className="a-gold" />
      <path d="M40 28L55 6" strokeWidth="3.2" />
    </>
  ),
  stones: (
    <>
      <ellipse cx="30" cy="52" rx="17" ry="6" />
      <ellipse cx="30" cy="40" rx="13" ry="5" className="a-blush" />
      <ellipse cx="30" cy="30" rx="9" ry="4" className="a-gold" />
      <path d="M44 22c6-12 15-10 14-5-1 6-9 9-14 5z" className="a-rose" />
    </>
  ),
  certificate: (
    <>
      <rect x="6" y="10" width="42" height="34" rx="3" />
      <path d="M14 20h26M14 27h22M14 34h14" />
      <path d="M43 50l-3 11 7-4 7 4-3-11" className="a-rose" />
      <circle cx="47" cy="45" r="8" className="a-gold" />
    </>
  ),
  dress: (
    <>
      <path d="M26 6h12l-1 6 7 5-3 5-4-2v8H27v-8l-4 2-3-5 7-5z" className="a-gold" />
      <path d="M27 28h10l16 30H11z" className="a-rose" />
      <path d="M15 52h34M19 46h26" />
      {[20, 26, 32, 38, 44].map((x) => (
        <circle key={x} cx={x} cy="55" r="1.4" className="a-gold" />
      ))}
    </>
  ),
  gown: (
    <>
      <path d="M27 6l2 13M37 6l-2 13" />
      <path d="M26 19h12l-2 14 15 25H13l15-25z" className="a-blush" />
      <path d="M26 33h12" />
      <path d="M44 10l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z" className="a-gold" />
    </>
  ),
  suit: (
    <>
      <path d="M24 8h16l7 10-5 3-2-3v38H24V18l-2 3-5-3z" className="a-rose" />
      <path d="M28 8q4 6 8 0" />
      <path d="M24 12c12 10 16 24 18 44" strokeWidth="3" />
      <path d="M28 44h8M28 49h8" />
    </>
  ),
  bangles: (
    <>
      <circle cx="24" cy="34" r="15" strokeWidth="3.2" />
      <circle cx="40" cy="34" r="15" strokeWidth="3.2" />
      {[[24, 19], [9, 34], [40, 49], [55, 34]].map(([x, y]) => (
        <circle key={x + '-' + y} cx={x} cy={y} r="2.4" className="a-rose" />
      ))}
    </>
  ),
  tikka: (
    <>
      <path d="M32 4v14" strokeDasharray="2 3" />
      <circle cx="32" cy="24" r="7" className="a-gold" />
      <path d="M32 32l7 9-7 11-7-11z" className="a-rose" />
      <circle cx="32" cy="57" r="2.2" className="a-gold" />
    </>
  ),
  lipstick: (
    <>
      <path d="M25 26V14q0-7 14-9v21z" className="a-rose" />
      <rect x="23" y="26" width="18" height="8" className="a-gold" />
      <rect x="21" y="34" width="22" height="24" rx="2" />
    </>
  ),
  tube: (
    <>
      <path d="M20 8h24l-4 40H24z" className="a-blush" />
      <rect x="25" y="48" width="14" height="9" rx="2" className="a-gold" />
      <path d="M26 20h12M27 26h10" />
    </>
  ),
  bottle: (
    <>
      <rect x="18" y="22" width="28" height="36" rx="8" className="a-blush" />
      <rect x="26" y="14" width="12" height="8" className="a-gold" />
      <path d="M32 14V7h10" />
      <path d="M24 34h16M24 40h12" />
    </>
  ),
  mascara: (
    <>
      <rect x="26" y="26" width="12" height="32" rx="3" className="a-gold" />
      <path d="M32 26V12" />
      <rect x="29" y="4" width="6" height="11" rx="2" className="a-rose" />
      <path d="M26 12h-3M26 8h-3M38 12h3M38 8h3" />
    </>
  ),
  foundation: (
    <>
      <rect x="18" y="24" width="28" height="34" rx="5" className="a-blush" />
      <rect x="26" y="12" width="12" height="12" rx="2" className="a-gold" />
      <rect x="24" y="36" width="16" height="10" rx="2" />
    </>
  ),
  salon: (
    <>
      <ellipse cx="32" cy="24" rx="13" ry="16" className="a-blush" />
      {[[14, 12], [12, 24], [14, 36], [50, 12], [52, 24], [50, 36], [32, 4]].map(([x, y]) => (
        <circle key={x + '-' + y} cx={x} cy={y} r="2" className="a-gold" />
      ))}
      <path d="M8 46h48M14 46v12M50 46v12" />
    </>
  ),
}

export default function ServiceArt({ name }) {
  return (
    <svg viewBox="0 0 64 64" {...line} aria-hidden="true">
      {ART[name] || ART.glow}
    </svg>
  )
}
