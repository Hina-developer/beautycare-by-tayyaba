import { bookingLink } from '../data'
import { WhatsAppIcon } from './Icons'
import LikeButton from './LikeButton'

/**
 * One deal: the poster (tap to see it large), its price and a booking button.
 * Every card is the same size. The poster sits whole inside a fixed frame, and
 * a blurred copy of it fills any space left over, so nothing is cut off.
 */
export default function PosterCard({ deal, onView, featured = false, tall = false }) {
  return (
    <article className={'card' + (featured ? ' card-featured' : '') + (tall ? ' card-tall' : '')}>
      <button className="card-poster card-frame" onClick={onView} aria-label={`View poster: ${deal.title}`}>
        <img className="card-blur" src={deal.src} alt="" aria-hidden="true" loading="eager" />
        {/* loading="eager": every poster is fetched at once, none wait for scrolling */}
        <img className="card-art" src={deal.src} width={deal.width} height={deal.height} alt={deal.title + ' poster'} loading="eager" decoding="sync" />
        {deal.isNew && <span className="tag tag-new tag-poster">New</span>}
      </button>
      <div className="card-body">
        <h3>{deal.title}</h3>
        <p className="card-price">
          {deal.was && <s>{deal.was}</s>}
          <strong>{deal.now || deal.price}</strong>
        </p>
        {deal.note && <p className="card-note">{deal.note}</p>}
        <div className="svc-actions card-actions">
          <a className="btn btn-small btn-primary" href={bookingLink(deal.title)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={16} height={16} /> Book
          </a>
          <LikeButton post={'poster-' + deal.id} title={deal.title} />
        </div>
      </div>
    </article>
  )
}
