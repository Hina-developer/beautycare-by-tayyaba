import { useRef } from 'react'
import { SALON, bookingLink } from '../data'
import PageHead from '../components/PageHead'
import CopyButton from '../components/CopyButton'
import { GlobeIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../components/Icons'

export default function Follow() {
  const siteRef = useRef(null)
  const shareText = `Beauty Care by Tayyaba, Lahore: ${SALON.website}`
  const shareLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  return (
    <>
      <PageHead eyebrow="Stay in touch" title="Follow Us" lead="See our newest work, deals and results, and share our website with your friends." />

      <section className="block">
        <div className="socials">
          <a className="social" href={SALON.instagram} target="_blank" rel="noopener noreferrer">
            <InstagramIcon width={30} height={30} />
            <span>
              <strong>Instagram</strong>
              {SALON.handle}
            </span>
            <em>Open Instagram</em>
          </a>
          <a className="social" href={SALON.tiktok} target="_blank" rel="noopener noreferrer">
            <TikTokIcon width={30} height={30} />
            <span>
              <strong>TikTok</strong>
              {SALON.handle}
            </span>
            <em>Open TikTok</em>
          </a>
          <a className="social" href={bookingLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={30} height={30} />
            <span>
              <strong>WhatsApp</strong>
              {SALON.phoneDisplay}
            </span>
            <em>Open chat</em>
          </a>
        </div>
      </section>

      <section className="block site-link">
        <GlobeIcon width={30} height={30} />
        <h2 className="service-title">Our website</h2>
        <p className="site-url" ref={siteRef}>
          {SALON.website}
        </p>
        <div className="actions">
          <CopyButton text={SALON.website} targetRef={siteRef} label="Copy link" />
          <a className="btn btn-small btn-primary" href={shareLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={16} height={16} /> Share on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
