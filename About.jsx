import { LOGO, SALON } from '../data'
import PageHead from '../components/PageHead'
import ServiceArt from '../components/ServiceArt'

const PROMISES = [
  { art: 'jar', title: 'Premium Products', text: 'Good quality products for your skin, hair and nails.' },
  { art: 'drop', title: 'Hygienic & Clean', text: 'A clean, hygienic place for every client.' },
  { art: 'scissors', title: 'Experienced Staff', text: 'A professional team that knows its work.' },
  { art: 'glow', title: 'Your Beauty, Our Priority', text: 'We take our time to get your look right.' },
]

export default function About() {
  return (
    <>
      <PageHead eyebrow="Look good, feel amazing" title="About Us" />

      <section className="block about">
        <img className="about-logo" src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="Beauty Care by Tayyaba logo" />
        <div className="about-text">
          <p>
            <strong>Beauty Care by Tayyaba</strong> is a professional ladies salon and spa on Manawala Road, near Haideri Mosque, in
            Inayat Colony, Lahore.
          </p>
          <p>
            We do bridal and party makeup, facials and skin polishers, hair cuts, styling and treatments, nails and nail art, lashes,
            threading, waxing and massage. We also train girls who want to learn salon work and build a career in beauty.
          </p>
          <p>
            We are open {SALON.hours.toLowerCase()}. Book on WhatsApp or call {SALON.phoneDisplay}; the same number works for both.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#contact">
              Contact us
            </a>
            <a className="btn" href="#deals">
              See our deals
            </a>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Our promise</p>
          <h2 className="gold-text">Why Choose Us</h2>
        </div>
        <ul className="teasers">
          {PROMISES.map((p) => (
            <li key={p.title} className="teaser">
              <span className="teaser-art">
                <ServiceArt name={p.art} />
              </span>
              <span className="service-title">{p.title}</span>
              <span className="service-text">{p.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
