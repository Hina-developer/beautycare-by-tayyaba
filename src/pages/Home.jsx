import { LOGO, OPENING_DEALS, SALON, bookingLink, whatsappLink } from '../data'
import PosterCard from '../components/PosterCard'
import usePosterViewer from '../components/usePosterViewer'
import { REVIEWS } from '../reviews'
import ServiceArt from '../components/ServiceArt'
import { PhoneIcon, PinIcon, WhatsAppIcon } from '../components/Icons'

const EXPLORE = [
  { href: '#services', art: 'palette', title: 'Salon Services', text: 'Makeup, hair, nails, lashes, skin and spa.' },
  { href: '#deals', art: 'glow', title: 'Weekend Deals', text: 'Special offers on salon services.' },
  { href: '#training', art: 'certificate', title: 'Training for Girls', text: 'Learn salon work and get certified.' },
  { href: '#contact', art: 'salon', title: 'Book & Contact', text: 'Book an appointment or find us.' },
]

const reviewLink = whatsappLink('Assalam o Alaikum! Here is my review of Beauty Care by Tayyaba:\n')

export default function Home() {
  const [view, viewer] = usePosterViewer()
  return (
    <>
      <header className="hero">
        <img className="hero-logo" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Beauty Care by Tayyaba, Professional Salon and Spa Services" />
        <p className="script hero-script">Because you deserve the best</p>
        <h1 className="gold-text">Your Beauty, Our Passion</h1>
        <p className="hero-lead">
          Welcome to Beauty Care by Tayyaba, a ladies salon and spa in Lahore. Bridal and party makeup, hair, nails, lashes,
          skin care, spa and body care, all in one place.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href={bookingLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Book on WhatsApp
          </a>
          <a className="btn" href="#contact">
            Book an appointment
          </a>
          <a className="btn" href={SALON.tel}>
            <PhoneIcon /> Call {SALON.phoneDisplay}
          </a>
        </div>
        <a className="hero-address" href={SALON.maps} target="_blank" rel="noopener noreferrer">
          <PinIcon width={16} height={16} /> {SALON.address} · {SALON.hours}
        </a>
      </header>

      <section className="block">
        <div className="section-head">
          <p className="script">Grand opening</p>
          <h2 className="gold-text">Opening Deals</h2>
          <p>Tap a poster to see it full size.</p>
        </div>
        <div className="wall">
          {OPENING_DEALS.map((deal, i) => (
            <PosterCard key={deal.id} deal={deal} onView={() => view(OPENING_DEALS, i)} />
          ))}
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Explore</p>
          <h2 className="gold-text">Everything We Offer</h2>
        </div>
        <ul className="teasers explore">
          {EXPLORE.map((m) => (
            <li key={m.href}>
              <a className="teaser" href={m.href}>
                <span className="teaser-art">
                  <ServiceArt name={m.art} />
                </span>
                <span className="service-title">{m.title}</span>
                <span className="service-text">{m.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Kind words</p>
          <h2 className="gold-text">Client Reviews</h2>
        </div>
        {REVIEWS.length ? (
          <ul className="reviews">
            {REVIEWS.map((r) => (
              <li key={r.name + r.text} className="review">
                <p className="review-stars" aria-label={`${r.stars} out of 5 stars`}>
                  {'★'.repeat(r.stars)}
                </p>
                <p>“{r.text}”</p>
                <p className="service-text">
                  {r.name} · {r.service}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="note-panel">
            <p className="service-text">No reviews on the website yet. Visited us? Send us your review on WhatsApp and we will add it here with your permission.</p>
            <a className="btn" href={reviewLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Send a review
            </a>
          </div>
        )}
      </section>
      {viewer}
    </>
  )
}
