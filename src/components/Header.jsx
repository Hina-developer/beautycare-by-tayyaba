import { useEffect, useRef, useState } from 'react'
import { MENU } from '../router'
import { bookingLink } from '../data'
import { ChevronIcon, CloseIcon, MenuIcon } from './Icons'

/** Top bar: salon name, menu with drop-downs and Book now. On phones the menu folds into a button. */
export default function Header({ route }) {
  const [open, setOpen] = useState(false) // phone menu
  const [drop, setDrop] = useState(null) // which drop-down is open on wide screens
  const navRef = useRef(null)

  // close drop-downs on a click outside or on Escape
  useEffect(() => {
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setDrop(null)
    const onKey = (e) => e.key === 'Escape' && (setDrop(null), setOpen(false))
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])
  const closeAll = () => {
    setDrop(null)
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#home" onClick={closeAll}>
          <span className="brand-script">Beauty Care</span>
          <span className="brand-caps">by Tayyaba</span>
        </a>

        <nav aria-label="Main menu" ref={navRef}>
          <ul className={'nav' + (open ? ' is-open' : '')} id="main-menu">
            {MENU.map((item) =>
              item.children ? (
                <li key={item.label} className="nav-group">
                  <button
                    className={'nav-drop' + (item.children.some((c) => c.id === route) ? ' is-active' : '')}
                    aria-expanded={drop === item.label}
                    onClick={() => setDrop((d) => (d === item.label ? null : item.label))}
                  >
                    {item.label} <ChevronIcon width={14} height={14} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <ul className={'sub' + (drop === item.label ? ' is-open' : '')}>
                    {item.children.map((c) => (
                      <li key={c.id}>
                        <a href={'#' + c.id} aria-current={route === c.id ? 'page' : undefined} onClick={closeAll}>
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.id}>
                  <a href={'#' + item.id} aria-current={route === item.id ? 'page' : undefined} onClick={closeAll}>
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <a className="btn btn-small btn-primary header-book" href={bookingLink()} target="_blank" rel="noopener noreferrer">
          Book now
        </a>
        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
