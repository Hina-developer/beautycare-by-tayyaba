import { useEffect, useState } from 'react'

// The menu. An item with `children` is a drop-down; every page has its own
// link, like  .../#boutique  (the # keeps pages working on GitHub Pages).
export const MENU = [
  { id: 'home', label: 'Home' },
  {
    label: 'Services',
    children: [
      { id: 'services', label: 'All Services' },
      { id: 'makeup', label: 'Makeup' },
      { id: 'hair', label: 'Hair' },
      { id: 'nails', label: 'Nails & Lashes' },
      { id: 'skin', label: 'Skin, Spa & Body' },
      { id: 'training', label: 'Training for Girls' },
    ],
  },
  { id: 'deals', label: 'Weekend Deals' },
  {
    label: 'About',
    children: [
      { id: 'about', label: 'About Us' },
      { id: 'follow', label: 'Follow Us' },
    ],
  },
  { id: 'contact', label: 'Contact' },
]

/** Every page, in menu order. */
export const PAGES = MENU.flatMap((m) => m.children || [m])

// old links that should still open the right page
const ALIASES = {}

function currentPage() {
  const raw = window.location.hash.replace('#', '')
  const id = ALIASES[raw] || raw
  return PAGES.some((p) => p.id === id) ? id : 'home'
}

/** Which page is open. Changes when a menu link is clicked. */
export function useRoute() {
  const [route, setRoute] = useState(currentPage)
  useEffect(() => {
    const onChange = () => {
      setRoute(currentPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    const page = PAGES.find((p) => p.id === route)
    document.title = route === 'home' ? 'Beauty Care by Tayyaba | Ladies Salon in Lahore' : `${page.label} | Beauty Care by Tayyaba`
  }, [route])
  return route
}
