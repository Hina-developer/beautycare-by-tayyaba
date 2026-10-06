import { bookingLink } from '../data'
import { WhatsAppIcon } from './Icons'

/** One deal: the poster (tap to see it large), its price and a booking button. */
export default function PosterCard({ deal, onView, featured = false }) {
  return (
    <article className={'card' + (featured ? ' card-featured' : '')}>
      <button className="card-poster" onClick={onView} aria-label={`View poster: ${deal.title}`}>
        {/* loading="eager": every poster is fetched at once, none wait for scrolling */}
        <img src={deal.src} width={deal.width} height={deal.height} alt={deal.title + ' poster'} loading="eager" decoding="sync" />
      </button>
      <div className="card-body">
        <h3>{deal.title}</h3>
        <p className="card-price">
          {deal.was && <s>{deal.was}</s>}
          <strong>{deal.now || deal.price}</strong>
        </p>
        {deal.note && <p className="card-note">{deal.note}</p>}
        <a className="btn btn-small" href={bookingLink(deal.title)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon width={16} height={16} /> Book this deal
        </a>
      </div>
    </article>
  )
}
