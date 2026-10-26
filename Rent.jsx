import { useState } from 'react'
import { RENTALS, formatPrice } from '../catalog'
import { whatsappLink } from '../data'
import PageHead from '../components/PageHead'
import Modal from '../components/Modal'
import LikeButton from '../components/LikeButton'
import ServiceArt from '../components/ServiceArt'
import { WhatsAppIcon } from '../components/Icons'

const today = () => new Date().toISOString().slice(0, 10)
function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}
const overlaps = (a1, a2, b1, b2) => a1 <= b2 && b1 <= a2

function RentalForm({ dress, onClose }) {
  const [form, setForm] = useState({ from: '', to: '', size: dress.sizes?.[0] || '', name: '', phone: '', event: '', note: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => {
    const v = e.target.value
    setForm((f) => (k === 'from' ? { ...f, from: v, to: v ? addDays(v, dress.rentDays - 1) : '' } : { ...f, [k]: v }))
  }

  const clash = form.from && form.to && dress.booked.find((b) => overlaps(form.from, form.to, b.from, b.to))
  const message = [
    'Assalam o Alaikum! I would like to rent a dress (please confirm if it is free):',
    `Dress: ${dress.name}`,
    form.size && `Size: ${form.size}`,
    `Dates: ${form.from} to ${form.to}`,
    form.event && `Event: ${form.event}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.note && `Note: ${form.note}`,
  ]
    .filter(Boolean)
    .join('\n')

  function check(e) {
    const err = {}
    if (!form.from) err.from = 'Please choose the first day.'
    else if (form.from < today()) err.from = 'This date has already passed.'
    if (form.from && form.to < form.from) err.to = 'The last day must be after the first day.'
    if (clash) err.from = `This dress is already booked from ${clash.from} to ${clash.to}. Please pick other dates.`
    if (!form.name.trim()) err.name = 'Please write your name.'
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) err.phone = 'Please write a phone number, e.g. 0300 1234567.'
    setErrors(err)
    if (Object.keys(err).length) e.preventDefault()
    else setSent(true)
  }

  return (
    <Modal label={`Rent ${dress.name}`} onClose={onClose}>
      <h2 className="gold-text cart-title">{dress.name}</h2>
      <p className="service-text">
        Rent for {dress.rentDays} days · {formatPrice(dress.price)} · Security deposit: {dress.deposit ? formatPrice(dress.deposit) : 'told on WhatsApp'}
      </p>
      <form className="booking cart-form" onSubmit={(e) => e.preventDefault()} noValidate>
        <label htmlFor="rt-from">
          First day *
          <input id="rt-from" type="date" min={today()} value={form.from} onChange={set('from')} aria-invalid={!!errors.from} />
          {errors.from && <span className="field-error">{errors.from}</span>}
        </label>
        <label htmlFor="rt-to">
          Last day
          <input id="rt-to" type="date" min={form.from || today()} value={form.to} onChange={set('to')} aria-invalid={!!errors.to} />
          {errors.to && <span className="field-error">{errors.to}</span>}
        </label>
        {clash && !errors.from && <p className="field-error booking-wide">These dates are already booked for this dress. Please pick other dates.</p>}
        {dress.sizes?.length > 0 && (
          <label htmlFor="rt-size">
            Size
            <select id="rt-size" value={form.size} onChange={set('size')}>
              {dress.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        )}
        <label htmlFor="rt-event">
          Event (optional)
          <input id="rt-event" value={form.event} onChange={set('event')} placeholder="e.g. Walima" />
        </label>
        <label htmlFor="rt-name">
          Your name *
          <input id="rt-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label htmlFor="rt-phone">
          Phone number *
          <input id="rt-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="03xx xxxxxxx" aria-invalid={!!errors.phone} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
        <label htmlFor="rt-note" className="booking-wide">
          Note (optional)
          <input id="rt-note" value={form.note} onChange={set('note')} />
        </label>
        <a className="btn btn-primary booking-wide" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={check}>
          <WhatsAppIcon /> Send booking request
        </a>
        <p className="service-text booking-wide">Your booking is confirmed only after we check the dress is free on your dates and reply on WhatsApp.</p>
        {sent && (
          <p className="form-ok booking-wide" role="status">
            WhatsApp is opening with your request. Tap Send in WhatsApp, and we will reply to confirm.
          </p>
        )}
      </form>
    </Modal>
  )
}

const STEPS = [
  ['Choose a dress and your dates', 'Tap Request booking on any dress.'],
  ['Send the request on WhatsApp', 'Your details are written for you. Just tap Send.'],
  ['We check and confirm', 'We reply with availability, rent, security deposit and return day.'],
  ['Wear it on your day', 'Your booking is final once we confirm it.'],
]

export default function Rent() {
  const [openId, setOpenId] = useState(null)
  const open = RENTALS.find((r) => r.id === openId)
  return (
    <>
      <PageHead eyebrow="Look like a bride for less" title="Dress on Rent" lead="Bridal, walima and party dresses on rent. Choose your dates and send a booking request on WhatsApp." />
      {RENTALS.some((r) => r.sample) && <p className="sample-note">Rental collection coming soon. The dresses below are samples; ask us on WhatsApp what is free on your dates.</p>}

      <section className="block">
        <ul className="product-grid rent-grid">
          {RENTALS.map((r) => (
            <li key={r.id} className="product rental">
              <span className="product-art">
                {r.images.length ? <img src={r.images[0]} alt="" loading="lazy" /> : <ServiceArt name={r.art} />}
                {r.sample && <span className="tag tag-sample">Sample</span>}
              </span>
              <span className="service-title">{r.name}</span>
              <span className="service-text">{r.text}</span>
              <span className="product-price">
                {formatPrice(r.price)} · {r.rentDays} days
              </span>
              <span className="service-text">Security deposit: {r.deposit ? formatPrice(r.deposit) : 'told on WhatsApp'}</span>
              <div className="svc-actions">
                <button className="btn btn-small btn-primary" onClick={() => setOpenId(r.id)}>
                  Book
                </button>
                <LikeButton post={'rent-' + r.id} title={r.name} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Simple and safe</p>
          <h2 className="gold-text">How Renting Works</h2>
          <p>Rent, security deposit and the return rules are confirmed on WhatsApp before your booking is final.</p>
        </div>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}>
              <span className="step-no">{i + 1}</span>
              <strong>{t}</strong>
              <span className="service-text">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      {open && <RentalForm key={open.id} dress={open} onClose={() => setOpenId(null)} />}
    </>
  )
}
