import { useState } from 'react'
import { formatPrice } from '../catalog'
import { whatsappLink } from '../data'
import { useCart } from '../cart'
import Modal from './Modal'
import { MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'

/** The cart, with a checkout form that sends the order on WhatsApp. */
export default function CartDrawer() {
  const cart = useCart()
  const [form, setForm] = useState({ name: '', phone: '', method: 'Pick up from the salon', address: '', note: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const delivery = form.method === 'Home delivery'

  const lines = cart.items.map(
    (i, n) => `${n + 1}. ${i.name}${i.size ? `, size ${i.size}` : ''}${i.colour ? `, ${i.colour}` : ''} × ${i.qty}: ${formatPrice(typeof i.price === 'number' ? i.price * i.qty : null)}`,
  )
  const message = [
    'Assalam o Alaikum! I would like to place an order from the website:',
    ...lines,
    cart.total > 0 && `Total: ${formatPrice(cart.total)}${cart.unpriced ? ' + items with price on request' : ''}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `${form.method}${delivery ? `: ${form.address}` : ''}`,
    form.note && `Note: ${form.note}`,
  ]
    .filter(Boolean)
    .join('\n')

  function check(e) {
    const err = {}
    if (!form.name.trim()) err.name = 'Please write your name.'
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) err.phone = 'Please write a phone number, e.g. 0300 1234567.'
    if (delivery && !form.address.trim()) err.address = 'Please write your delivery address.'
    setErrors(err)
    if (Object.keys(err).length) e.preventDefault()
    else setSent(true)
  }

  if (!cart.open) return null
  return (
    <Modal label="Your cart" onClose={() => cart.setOpen(false)} className="cart-modal">
      <h2 className="gold-text cart-title">Your Cart</h2>

      {cart.items.length === 0 ? (
        <p className="service-text">
          Your cart is empty. Browse the <a href="#boutique" onClick={() => cart.setOpen(false)}>shop</a> and tap Add to cart.
        </p>
      ) : (
        <>
          <ul className="cart-lines">
            {cart.items.map((i) => (
              <li key={cart.lineKey(i)} className="cart-line">
                <div className="cart-line-text">
                  <strong>{i.name}</strong>
                  <span className="service-text">
                    {[i.size && `Size ${i.size}`, i.colour].filter(Boolean).join(' · ')}
                    {i.sample && ' · sample'}
                  </span>
                  <span className="product-price">{formatPrice(typeof i.price === 'number' ? i.price * i.qty : null)}</span>
                </div>
                <div className="stepper">
                  <button className="icon-btn" onClick={() => cart.setQty(i, i.qty - 1)} aria-label={`One less ${i.name}`}>
                    <MinusIcon />
                  </button>
                  <output>{i.qty}</output>
                  <button className="icon-btn" onClick={() => cart.setQty(i, i.qty + 1)} aria-label={`One more ${i.name}`}>
                    <PlusIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            <span>Total</span>
            <strong>{cart.total > 0 ? formatPrice(cart.total) : 'Confirmed on WhatsApp'}</strong>
          </p>
          {cart.unpriced && cart.total > 0 && <p className="service-text">Items with "price on request" are confirmed on WhatsApp.</p>}

          <form className="booking cart-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <label htmlFor="co-name">
              Your name *
              <input id="co-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label htmlFor="co-phone">
              Phone number *
              <input id="co-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="03xx xxxxxxx" aria-invalid={!!errors.phone} />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
            <label htmlFor="co-method" className="booking-wide">
              How do you want it?
              <select id="co-method" value={form.method} onChange={set('method')}>
                <option>Pick up from the salon</option>
                <option>Home delivery</option>
              </select>
            </label>
            {delivery && (
              <label htmlFor="co-address" className="booking-wide">
                Delivery address *
                <textarea id="co-address" rows="2" value={form.address} onChange={set('address')} autoComplete="street-address" aria-invalid={!!errors.address} />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </label>
            )}
            <label htmlFor="co-note" className="booking-wide">
              Note (optional)
              <input id="co-note" value={form.note} onChange={set('note')} />
            </label>
            <a className="btn btn-primary booking-wide" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={check}>
              <WhatsAppIcon /> Send order on WhatsApp
            </a>
            {sent && (
              <p className="form-ok booking-wide" role="status">
                WhatsApp is opening with your order. Tap Send in WhatsApp to place it. We will reply to confirm price, stock and delivery.
              </p>
            )}
            <button type="button" className="btn btn-small booking-wide" onClick={cart.clear}>
              Empty the cart
            </button>
          </form>
        </>
      )}
    </Modal>
  )
}
