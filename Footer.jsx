import { MENU } from '../router'
import { SALON } from '../data'
import { MUSIC_CREDIT } from '../music'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <p className="brand">
            <span className="brand-script">Beauty Care</span>
            <span className="brand-caps">by Tayyaba</span>
          </p>
          <p>{SALON.tagline}</p>
          <div className="footer-social">
            <a className="icon-btn" href={SALON.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a className="icon-btn" href={SALON.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a className="icon-btn" href={SALON.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h2 className="footer-head">Visit us</h2>
          <p>{SALON.address}</p>
          <p>
            Call or WhatsApp: <span className="nowrap">{SALON.phoneDisplay}</span>
          </p>
          <p>Open: {SALON.hours}</p>
        </div>
        {MENU.filter((m) => m.children).map((m) => (
          <div className="footer-col" key={m.label}>
            <h2 className="footer-head">{m.label}</h2>
            <ul className="footer-links">
              {m.children.map((c) => (
                <li key={c.id}>
                  <a href={'#' + c.id}>{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-col">
          <h2 className="footer-head">Quick links</h2>
          <ul className="footer-links">
            {MENU.filter((m) => !m.children).map((m) => (
              <li key={m.id}>
                <a href={'#' + m.id}>{m.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="script footer-sign">See you at the salon</p>
      {MUSIC_CREDIT && (
        <p className="footer-credit">
          <a href={MUSIC_CREDIT.url} target="_blank" rel="noopener noreferrer">
            {MUSIC_CREDIT.text}
          </a>
        </p>
      )}
    </footer>
  )
}
