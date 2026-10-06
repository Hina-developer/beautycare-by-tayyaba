// Small line icons, drawn here so the site needs no icon library.
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const WhatsAppIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
    <path d="M9 8.3c-.3 2.6 3.3 6.2 6.4 6.6l1.2-1.3-2-1.2-.9.8c-1-.4-2.2-1.6-2.6-2.6l.8-.9-1.2-2L9 8.3z" fill="currentColor" stroke="none" />
  </svg>
)
export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.5l1.5 4.2-2 1.5a12 12 0 0 0 6.3 6.3l1.5-2 4.2 1.5V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
  </svg>
)
export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)
export const TikTokIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14 3v11.5a3.7 3.7 0 1 1-3.7-3.7" />
    <path d="M14 3c.3 2.6 2 4.4 4.8 4.7" />
  </svg>
)
export const InstagramIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r=".9" fill="currentColor" stroke="none" />
  </svg>
)
export const ScissorsIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="6" cy="17.5" r="2.5" />
    <path d="M8.2 7.8L21 17M8.2 16.2L21 7" />
  </svg>
)
export const PopperIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20l4.5-12 7.5 7.5L4 20z" />
    <path d="M13 6.5c1-.3 1.8-1.3 1.7-2.5M17.5 10.5c.3-1 1.3-1.8 2.5-1.7M15 9l3-3" />
    <path d="M19.5 3.5v.01M20.5 13.5v.01M10.5 3.5v.01" strokeWidth="2.4" />
  </svg>
)
export const SparkleIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M10 3.5l1.8 5.2L17 10.5l-5.2 1.8L10 17.5l-1.8-5.2L3 10.5l5.2-1.8L10 3.5z" />
    <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
  </svg>
)
export const ChevronIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 14.5l6-6 6 6" />
  </svg>
)
export const ArrowIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)
export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const PlayIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
  </svg>
)

/** Three bars that bounce while music plays. */
export const Equalizer = ({ playing }) => (
  <span className={'eq' + (playing ? ' is-playing' : '')} aria-hidden="true">
    <i />
    <i />
    <i />
  </span>
)
