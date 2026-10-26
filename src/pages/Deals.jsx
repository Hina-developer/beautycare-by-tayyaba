import { useMemo, useState } from 'react'
import { ALL_POSTERS, CATEGORIES } from '../data'
import PageHead from '../components/PageHead'
import PosterCard from '../components/PosterCard'
import usePosterViewer from '../components/usePosterViewer'

// This weekend's posters, shown first and in this order (file names in public/images).
const WEEKEND_IDS = ['deal-2', 'deal-3', 'party-makeup', 'nikkah', 'ring-ceremony', 'mehndi', 'walima', 'deal-1', 'full-body-massage', 'full-body-wax', 'mani', 'pedi']
const WEEKEND = WEEKEND_IDS.map((id) => ALL_POSTERS.find((d) => d.id === id)).filter(Boolean)
const OTHERS = ALL_POSTERS.filter((d) => !WEEKEND_IDS.includes(d.id))

export default function Deals() {
  const [cat, setCat] = useState('all')
  const chips = CATEGORIES.filter((c) => c.id === 'all' || OTHERS.some((d) => d.cat === c.id))
  const posters = useMemo(() => (cat === 'all' ? OTHERS : OTHERS.filter((d) => d.cat === cat)), [cat])
  const [view, viewer] = usePosterViewer()

  return (
    <>
      <PageHead
        eyebrow="Book before the offer ends"
        title="Weekend Deals"
        lead="Weekend and special offers on bridal, makeup, skin, nails and spa. Tap Book to send us a message on WhatsApp."
      />

      <section className="block">
        <div className="wall">
          {WEEKEND.map((deal, i) => (
            <PosterCard key={deal.id} deal={deal} tall onView={() => view(WEEKEND, i)} />
          ))}
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Choose yours</p>
          <h2 className="gold-text">More Deals</h2>
          <p>Tap a poster to see it full size.</p>
        </div>
        <div className="chips" role="group" aria-label="Filter deal posters">
          {chips.map((c) => (
            <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="wall">
          {posters.map((deal, i) => (
            <PosterCard key={deal.id} deal={deal} onView={() => view(posters, i)} />
          ))}
        </div>
      </section>
      {viewer}
    </>
  )
}
