import { SALON, TRAINING_POSTER } from '../data'
import PageHead from '../components/PageHead'
import ServiceArt from '../components/ServiceArt'
import usePosterViewer from '../components/usePosterViewer'
import { WhatsAppIcon } from '../components/Icons'

// Course details from the salon's training poster.
const PLANS = [
  { name: '6 Month Plan', price: '5,000 PKR', per: 'per month', text: 'The complete course: the full training program in six months.' },
  { name: '2 Year Plan', price: '2,000 PKR', per: 'per month', text: 'Two years of training with daily work at the salon.' },
]
const SKILLS = [
  { art: 'facial', name: 'Facial' },
  { art: 'dryer', name: 'Hair Care' },
  { art: 'polish', name: 'Nail Art' },
  { art: 'palette', name: 'Makeup' },
  { art: 'stones', name: 'Spa Services' },
]
const PERKS = [
  ['Uniform provided', 'You get the salon uniform.'],
  ['Trendy & modern techniques', 'Learn the looks clients ask for today.'],
  ['Experienced & friendly trainers', 'Learn step by step from our team.'],
  ['Safe, clean & professional place', 'A ladies salon where you can learn with confidence.'],
  ['Timing: 9:00 AM to 9:00 PM', 'Daily.'],
  ['Certificate', 'After the course you get a certificate with the salon name and the senior’s signature.'],
]

const admission = `${SALON.whatsapp}?text=${encodeURIComponent('Assalam o Alaikum! I would like to know about admission in the Beauty Salon Training Program.')}`

export default function Training() {
  const [view, viewer] = usePosterViewer()
  return (
    <>
      <PageHead
        eyebrow="Learn · Practice · Get Certified"
        title="Beauty Training for Girls"
        lead="Learn professional salon skills at Beauty Care by Tayyaba and start your career in beauty."
      />

      <section className="block">
        <div className="plans">
          {PLANS.map((p) => (
            <div key={p.name} className="plan">
              <h2 className="plan-name">{p.name}</h2>
              <p className="plan-price gold-text">{p.price}</p>
              <p className="plan-per">{p.per}</p>
              <p className="service-text">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="center">
          <a className="btn btn-primary" href={admission} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Ask about admission
          </a>
        </p>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">What you will learn</p>
          <h2 className="gold-text">Skills</h2>
        </div>
        <ul className="skills">
          {SKILLS.map((s) => (
            <li key={s.name} className="skill">
              <span className="teaser-art">
                <ServiceArt name={s.art} />
              </span>
              <span className="service-title">{s.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block training-more">
        <ul className="perks">
          {PERKS.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <button className="card-poster training-poster" onClick={() => view([TRAINING_POSTER], 0)} aria-label="View the training poster">
          <img src={TRAINING_POSTER.src} width={TRAINING_POSTER.width} height={TRAINING_POSTER.height} alt="Beauty Salon Training Program poster" />
        </button>
      </section>
      {viewer}
    </>
  )
}
