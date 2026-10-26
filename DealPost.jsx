import { SALON, bookingLink } from '../data'
import ServiceArt from './ServiceArt'
import LikeButton from './LikeButton'
import { postId } from '../likes'
import { WhatsAppIcon } from './Icons'

/** A deal drawn as a social-media style post: badge, drawing, price and what is included. */
export default function DealPost({ deal }) {
  return (
    <article className="post">
      <p className="post-brand">
        <span className="brand-script">Beauty Care</span>
        <span className="brand-caps">by Tayyaba</span>
      </p>
      <span className="post-badge">{deal.badge}</span>
      <span className="post-art">
        <ServiceArt name={deal.art} />
      </span>
      <h3 className="post-title gold-text">{deal.title}</h3>
      <div className="post-prices">
        {deal.prices.map((p) => (
          <p key={p.now + (p.label || '')} className="post-price">
            {p.label && <span className="post-price-label">{p.label}</span>}
            <s>{p.was}</s>
            <strong>{p.now}</strong>
          </p>
        ))}
      </div>
      {deal.includes.length > 0 && (
        <ul className="post-list">
          {deal.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {deal.ends && <p className="post-ends">Offer ends {deal.ends}</p>}
      <div className="post-foot">
        <div className="svc-actions post-actions">
          <a className="btn btn-small btn-primary" href={bookingLink(deal.title)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={16} height={16} /> Book
          </a>
          <LikeButton post={postId('deal', deal.title)} title={deal.title} />
        </div>
        <span className="post-phone">{SALON.phoneDisplay}</span>
      </div>
    </article>
  )
}
