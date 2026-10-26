import { useState } from 'react'
import { STOCK_LABEL, formatPrice } from '../catalog'
import { whatsappLink } from '../data'
import { useCart } from '../cart'
import Modal from './Modal'
import ServiceArt from './ServiceArt'
import { MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'

/** Full details of a shop item: photos, sizes, colours, quantity, add to cart or ask on WhatsApp. */
export default function ProductModal({ item, onClose }) {
  const cart = useCart()
  const [photo, setPhoto] = useState(0)
  const [size, setSize] = useState(item.sizes?.[0] || '')
  const [colour, setColour] = useState(item.colours?.[0] || '')
  const [qty, setQty] = useState(1)
  const soldOut = item.stock === 'out'

  const ask = whatsappLink(
    [`Assalam o Alaikum! I am interested in: ${item.name}`, size && `Size: ${size}`, colour && `Colour: ${colour}`, 'Is it available?']
      .filter(Boolean)
      .join('\n'),
  )

  return (
    <Modal label={item.name} onClose={onClose} className="product-modal">
      <div className="pm">
        <div className="pm-media">
          <div className="pm-main">
            {item.images.length ? <img src={item.images[photo]} alt={item.name} /> : <ServiceArt name={item.art} />}
          </div>
          {item.images.length > 1 && (
            <div className="pm-thumbs">
              {item.images.map((src, i) => (
                <button key={src} className="pm-thumb" aria-pressed={i === photo} onClick={() => setPhoto(i)} aria-label={`Photo ${i + 1}`}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pm-info">
          {item.sample && <p className="tag tag-sample pm-tag">Sample item: real photos and price coming soon</p>}
          <h2 className="gold-text pm-title">{item.name}</h2>
          <p className="product-price pm-price">{formatPrice(item.price)}</p>
          <p className={'stock stock-' + item.stock}>{STOCK_LABEL[item.stock]}</p>
          <p className="service-text">{item.text}</p>

          <div className="pm-options">
            {item.sizes?.length > 0 && (
              <label htmlFor="pm-size">
                Size
                <select id="pm-size" value={size} onChange={(e) => setSize(e.target.value)}>
                  {item.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            )}
            {item.colours?.length > 0 && (
              <label htmlFor="pm-colour">
                Colour
                <select id="pm-colour" value={colour} onChange={(e) => setColour(e.target.value)}>
                  {item.colours.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="pm-qty">
              <span>Quantity</span>
              <div className="stepper">
                <button className="icon-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One less">
                  <MinusIcon />
                </button>
                <output aria-live="polite">{qty}</output>
                <button className="icon-btn" onClick={() => setQty((q) => q + 1)} aria-label="One more">
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="actions pm-actions">
            <button className="btn btn-primary" disabled={soldOut} onClick={() => cart.add(item, { size, colour, qty })}>
              {soldOut ? 'Out of stock' : 'Add to cart'}
            </button>
            <a className="btn" href={ask} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}
