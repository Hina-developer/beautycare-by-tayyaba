import { SERVICES, SERVICE_GROUPS } from '../services'
import { ALL_POSTERS, bookingLink } from '../data'
import usePosterViewer from '../components/usePosterViewer'
import PageHead from '../components/PageHead'
import ServiceArt from '../components/ServiceArt'
import { WhatsAppIcon } from '../components/Icons'
import LikeButton from '../components/LikeButton'
import { postId } from '../likes'

function ServiceCard({ s, onView }) {
  const poster = ALL_POSTERS.find((p) => p.id === s.poster)
  return (
    <li className="svc">
      {poster ? (
        <button className="card-poster card-frame svc-photo" onClick={() => onView(poster)} aria-label={`View photo: ${s.title}`}>
          <img className="card-blur" src={poster.src} alt="" aria-hidden="true" loading="eager" />
          <img className="card-art" src={poster.src} width={poster.width} height={poster.height} alt={s.title} loading="eager" />
        </button>
      ) : (
        <span className="service-art">
          <ServiceArt name={s.art} />
        </span>
      )}
      <h3 className="service-title">{s.title}</h3>
      <p className="service-text">{s.text}</p>
      <dl className="svc-meta">
        <div>
          <dt>Price</dt>
          <dd className={s.price ? '' : 'is-placeholder'}>{s.price || 'Price on request'}</dd>
        </div>
        {s.duration && (
          <div>
            <dt>Time</dt>
            <dd>{s.duration}</dd>
          </div>
        )}
      </dl>
      <div className="svc-actions">
        <a className="btn btn-small btn-primary" href={bookingLink(s.title)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon width={16} height={16} /> Book
        </a>
        <LikeButton post={postId('svc', s.title)} title={s.title} />
      </div>
    </li>
  )
}

/** One service category page (makeup, hair, nails, skin), or every category when group is 'all'. */
export default function ServicesPage({ group = 'all' }) {
  const groups = group === 'all' ? SERVICE_GROUPS : SERVICE_GROUPS.filter((g) => g.id === group)
  const single = groups.length === 1
  const [view, viewer] = usePosterViewer()

  return (
    <>
      <PageHead
        eyebrow="Everything under one roof"
        title={single ? groups[0].label : 'Our Services'}
        lead={single ? groups[0].intro : 'Makeup, hair, nails, lashes, skin, spa and body care. Tap Book to message us on WhatsApp.'}
      />

      {!single && (
        <nav className="chips" aria-label="Service categories">
          {SERVICE_GROUPS.map((g) => (
            <a key={g.id} className="chip" href={'#' + g.page}>
              {g.label}
            </a>
          ))}
          <a className="chip" href="#training">
            Training for Girls
          </a>
        </nav>
      )}

      {groups.map((g) => (
        <section key={g.id} className="block">
          {!single && (
            <div className="section-head">
              <h2 className="gold-text">{g.label}</h2>
              <p>{g.intro}</p>
            </div>
          )}
          <ul className="svc-grid">
            {SERVICES.filter((s) => s.group === g.id).map((s) => (
              <ServiceCard key={s.title} s={s} onView={(p) => view([p], 0)} />
            ))}
          </ul>
          {!single && (
            <p className="center">
              <a className="btn btn-small" href={'#' + g.page}>
                Open the {g.label} page
              </a>
            </p>
          )}
        </section>
      ))}

      {viewer}
      {single && (
        <p className="center">
          <a className="btn" href="#services">
            See all services
          </a>
        </p>
      )}
    </>
  )
}
