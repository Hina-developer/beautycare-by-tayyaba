import { useState } from 'react'
import PageHead from './PageHead'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import { useCart } from '../cart'
import { BagIcon } from './Icons'

/** A shop page: category filter, item grid and item details. Used by Boutique, Jewellery and Beauty Products. */
export default function ShopPage({ eyebrow, title, lead, groups, items }) {
  const [group, setGroup] = useState('all')
  const [openId, setOpenId] = useState(null)
  const shown = group === 'all' ? items : group === 'new' ? items.filter((i) => i.isNew) : items.filter((i) => i.group === group)
  const hasNew = items.some((i) => i.isNew)
  const hasSamples = items.some((i) => i.sample)
  const open = items.find((i) => i.id === openId)
  const cart = useCart()

  return (
    <>
      <PageHead eyebrow={eyebrow} title={title} lead={lead} />

      {hasSamples && (
        <p className="sample-note">
          New collection coming soon. The items below are samples; send us a message on WhatsApp to ask what is available today.
        </p>
      )}

      <section className="block">
        <div className="chips" role="group" aria-label={`Filter ${title}`}>
          <button className="chip" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
            All
          </button>
          {hasNew && (
            <button className="chip" aria-pressed={group === 'new'} onClick={() => setGroup('new')}>
              New Arrivals
            </button>
          )}
          {groups.map((g) => (
            <button key={g.id} className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        {cart.count > 0 && (
          <p className="center">
            <button className="btn btn-small" onClick={() => cart.setOpen(true)}>
              <BagIcon width={16} height={16} /> View your order ({cart.count})
            </button>
          </p>
        )}
        {shown.length ? (
          <ul className="product-grid">
            {shown.map((item) => (
              <ProductCard key={item.id} item={item} onOpen={() => setOpenId(item.id)} />
            ))}
          </ul>
        ) : (
          <p className="center service-text">Nothing here yet. Ask us on WhatsApp what is coming next.</p>
        )}
      </section>

      {open && <ProductModal key={open.id} item={open} onClose={() => setOpenId(null)} />}
    </>
  )
}
