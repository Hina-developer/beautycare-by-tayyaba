import { useState } from 'react'
import { GALLERY, GALLERY_GROUPS } from '../gallery'
import { SALON } from '../data'
import PageHead from '../components/PageHead'
import usePosterViewer from '../components/usePosterViewer'
import { InstagramIcon, TikTokIcon } from '../components/Icons'

export default function Gallery() {
  const [group, setGroup] = useState('all')
  const [view, viewer] = usePosterViewer()
  const shown = group === 'all' ? GALLERY : GALLERY.filter((g) => g.group === group)
  const photos = shown.filter((g) => g.type === 'image').map((g) => ({ ...g, title: g.caption }))

  return (
    <>
      <PageHead eyebrow="Real work, real clients" title="Gallery" lead="Our salon, makeup, hairstyles, nails, bridal looks, dresses and products." />
      <section className="block">
        <div className="chips" role="group" aria-label="Filter gallery">
          {GALLERY_GROUPS.map((g) => (
            <button key={g.id} className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>

        {shown.length > 0 ? (
          <ul className="gallery">
            {shown.map((g) => (
              <li key={g.src}>
                {g.type === 'video' ? (
                  <video src={g.src} controls preload="metadata" playsInline aria-label={g.caption} />
                ) : (
                  <button className="gallery-photo" onClick={() => view(photos, photos.findIndex((p) => p.src === g.src))} aria-label={`View photo: ${g.caption}`}>
                    <img src={g.src} alt={g.caption} loading="lazy" />
                  </button>
                )}
                <p className="service-text">{g.caption}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="note-panel">
            <h2 className="service-title">Photos coming soon</h2>
            <p className="service-text">
              We are adding photos of our work here. Until then, see our latest looks every week on TikTok and Instagram ({SALON.handle}).
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={SALON.tiktok} target="_blank" rel="noopener noreferrer">
                <TikTokIcon /> Watch on TikTok
              </a>
              <a className="btn" href={SALON.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> See on Instagram
              </a>
            </div>
          </div>
        )}
      </section>
      {viewer}
    </>
  )
}
