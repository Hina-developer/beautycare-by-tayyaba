import { useMemo, useState } from 'react'
import { ALL_POSTERS, CATEGORIES } from '../data'
import { DEAL_POSTS } from '../designedDeals'
import PageHead from '../components/PageHead'
import DealPost from '../components/DealPost'
import PosterCard from '../components/PosterCard'
import usePosterViewer from '../components/usePosterViewer'

export default function Deals() {
  const [cat, setCat] = useState('all')
  const posters = useMemo(() => (cat === 'all' ? ALL_POSTERS : cat === 'new' ? ALL_POSTERS.filter((d) => d.isNew) : ALL_POSTERS.filter((d) => d.cat === cat)), [cat])
  const [view, viewer] = usePosterViewer()

  return (
    <>
      <PageHead
        eyebrow="Book before the offer ends"
        title="Weekend Deals"
        lead="Weekend and special offers on bridal, makeup, skin, nails and spa. Tap Book now to send us a message on WhatsApp."
      />

      <section className="block">
        <div className="deal-posts">
          {DEAL_POSTS.map((d) => (
            <DealPost key={d.title} deal={d} />
          ))}
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <p className="script">Choose yours</p>
          <h2 className="gold-text">All Deal Posters</h2>
          <p>Tap a poster to see it full size.</p>
        </div>
        <div className="chips" role="group" aria-label="Filter deal posters">
          {CATEGORIES.map((c) => (
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
