import { useEffect, useRef } from 'react'
import { bookingLink } from '../data'
import { ArrowIcon, CloseIcon, WhatsAppIcon } from './Icons'

/** Full-screen view of one poster, with next and previous. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const ref = useRef(null)
  const item = items[index]

  useEffect(() => {
    const dialog = ref.current
    if (!dialog.open) dialog.showModal()
  }, [])

  const go = (step) => onChange((index + step + items.length) % items.length)

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-label={item.title}
    >
      <div className="lightbox-inner">
        <img src={item.src} width={item.width} height={item.height} alt={item.title + ' poster'} />
        <div className="lightbox-bar">
          <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous poster">
            <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
          </button>
          <a className="btn btn-small" href={bookingLink(item.title)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={16} height={16} /> Book: {item.title}
          </a>
          <button className="icon-btn" onClick={() => go(1)} aria-label="Next poster">
            <ArrowIcon />
          </button>
        </div>
        <button className="icon-btn lightbox-close" onClick={() => ref.current.close()} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
    </dialog>
  )
}
