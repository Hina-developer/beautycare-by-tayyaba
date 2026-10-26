import { useRef, useState } from 'react'
import { SALON, bookingLink, whatsappLink } from '../data'
import { SERVICES } from '../services'
import { DEAL_POSTS } from '../designedDeals'
import PageHead from '../components/PageHead'
import CopyButton from '../components/CopyButton'
import { PhoneIcon, PinIcon, WhatsAppIcon } from '../components/Icons'

const CHOICES = [...SERVICES.map((s) => s.title), ...DEAL_POSTS.map((d) => d.title + ' (deal)'), 'Something else']
const TIMES = ['Any time', 'Morning', 'Afternoon', 'Evening']
const phoneOk = (p) => /^[0-9+\-\s]{10,15}$/.test(p.trim())

/** Fields + checks shared by both forms. Returns errors, or {} when everything is filled in. */
function validate(form, need) {
  const err = {}
  if (need.includes('name') && !form.name.trim()) err.name = 'Please write your name.'
  if (need.includes('phone') && !phoneOk(form.phone)) err.phone = 'Please write a phone number, e.g. 0300 1234567.'
  if (need.includes('day') && form.day && form.day < new Date().toISOString().slice(0, 10)) err.day = 'This date has already passed.'
  if (need.includes('message') && !form.message.trim()) err.message = 'Please write your message.'
  return err
}

function Field({ id, label, error, children }) {
  return (
    <label htmlFor={id}>
      {label}
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: CHOICES[0], day: '', time: TIMES[0], note: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const message = [
    'Assalam o Alaikum! I would like to book an appointment.',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Service: ${form.service}`,
    form.day && `Day: ${form.day}`,
    `Time: ${form.time}`,
    form.note && `Note: ${form.note}`,
  ]
    .filter(Boolean)
    .join('\n')
  function check(e) {
    const err = validate(form, ['name', 'phone', 'day'])
    setErrors(err)
    if (Object.keys(err).length) e.preventDefault()
    else setSent(true)
  }
  return (
    <form className="booking" onSubmit={(e) => e.preventDefault()} noValidate>
      <Field id="bk-name" label="Your name *" error={errors.name}>
        <input id="bk-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
      </Field>
      <Field id="bk-phone" label="Phone number *" error={errors.phone}>
        <input id="bk-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="03xx xxxxxxx" aria-invalid={!!errors.phone} />
      </Field>
      <Field id="bk-service" label="Service or deal">
        <select id="bk-service" value={form.service} onChange={set('service')}>
          {CHOICES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field id="bk-day" label="Preferred day" error={errors.day}>
        <input id="bk-day" type="date" min={new Date().toISOString().slice(0, 10)} value={form.day} onChange={set('day')} aria-invalid={!!errors.day} />
      </Field>
      <Field id="bk-time" label="Preferred time">
        <select id="bk-time" value={form.time} onChange={set('time')}>
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <label htmlFor="bk-note">
        Anything else? (optional)
        <input id="bk-note" value={form.note} onChange={set('note')} placeholder="e.g. two people, or a bridal trial" />
      </label>
      <a className="btn btn-primary booking-wide" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={check}>
        <WhatsAppIcon /> Send booking request
      </a>
      {sent && (
        <p className="form-ok booking-wide" role="status">
          WhatsApp is opening with your booking request. Tap Send in WhatsApp, and we will reply to confirm your time.
        </p>
      )}
    </form>
  )
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const message = ['Assalam o Alaikum!', form.message, `Name: ${form.name}`, `Phone: ${form.phone}`].join('\n')
  function check(e) {
    const err = validate(form, ['name', 'phone', 'message'])
    setErrors(err)
    if (Object.keys(err).length) e.preventDefault()
    else setSent(true)
  }
  return (
    <form className="booking" onSubmit={(e) => e.preventDefault()} noValidate>
      <Field id="eq-name" label="Your name *" error={errors.name}>
        <input id="eq-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
      </Field>
      <Field id="eq-phone" label="Phone number *" error={errors.phone}>
        <input id="eq-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="03xx xxxxxxx" aria-invalid={!!errors.phone} />
      </Field>
      <label htmlFor="eq-message" className="booking-wide">
        Your message *
        <textarea id="eq-message" rows="3" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>
      <a className="btn btn-primary booking-wide" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={check}>
        <WhatsAppIcon /> Send message
      </a>
      {sent && (
        <p className="form-ok booking-wide" role="status">
          WhatsApp is opening with your message. Tap Send in WhatsApp to reach us.
        </p>
      )}
    </form>
  )
}

export default function Contact() {
  const numberRef = useRef(null)
  return (
    <>
      <PageHead eyebrow="We are here for you" title="Contact Us" lead="Call, WhatsApp or visit the salon. The same number works for calls and WhatsApp." />

      <section className="block visit">
        <div className="visit-grid">
          <div className="visit-item">
            <PhoneIcon width={26} height={26} />
            <h2>Call or message</h2>
            <p className="visit-number" ref={numberRef}>
              {SALON.phoneCopy}
            </p>
            <div className="actions">
              <a className="btn btn-small" href={SALON.tel}>
                Call
              </a>
              <CopyButton text={SALON.phoneCopy} targetRef={numberRef} label="Copy number" />
            </div>
          </div>
          <div className="visit-item">
            <WhatsAppIcon width={26} height={26} />
            <h2>WhatsApp</h2>
            <p>Message us any time. We reply during salon hours: {SALON.hours}.</p>
            <a className="btn btn-small btn-primary" href={bookingLink()} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
          <div className="visit-item">
            <PinIcon width={26} height={26} />
            <h2>Location</h2>
            <p>{SALON.address}</p>
            <a className="btn btn-small" href={SALON.maps} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Book in one minute</p>
          <h2 className="gold-text">Appointment Booking</h2>
          <p>Fill this in and tap Send. WhatsApp opens with your request ready to send to us.</p>
        </div>
        <BookingForm />
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Questions?</p>
          <h2 className="gold-text">Send Us a Message</h2>
        </div>
        <EnquiryForm />
      </section>
    </>
  )
}
