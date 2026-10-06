import sizes from './posterSizes.json'

// ---------------------------------------------------------------------------
// Salon details. Change a number, link or address here and it updates everywhere.
// ---------------------------------------------------------------------------
export const SALON = {
  name: 'Beauty Care by Tayyaba',
  tagline: 'Professional Salon & Spa Services',
  phoneDisplay: '0327 4000309',
  phoneCopy: '03274000309',
  tel: 'tel:+923274000309',
  whatsapp: 'https://wa.me/923274000309',
  tiktok: 'https://www.tiktok.com/@beautycare.bytayyaba',
  instagram: 'https://www.instagram.com/beautycare.bytayyaba',
  handle: '@beautycare.bytayyaba',
  address: 'Manawala Rd, near Haideri Mosque, Inayat Colony, Lahore',
  maps:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Manawala Rd near Haideri Mosque Inayat Colony Lahore'),
}

/** WhatsApp link with a ready-made message for one deal. */
export function bookingLink(dealTitle) {
  const text = dealTitle
    ? `Assalam o Alaikum! I would like to book: ${dealTitle}`
    : 'Assalam o Alaikum! I would like to book an appointment.'
  return `${SALON.whatsapp}?text=${encodeURIComponent(text)}`
}

const img = (id) => ({
  src: `images/${id}.webp`,
  width: sizes[id][0],
  height: sizes[id][1],
})

export const LOGO = img('logo')

export const CATEGORIES = [
  { id: 'all', label: 'All deals' },
  { id: 'bridal', label: 'Bridal & Makeup' },
  { id: 'skin', label: 'Skin & Spa' },
  { id: 'hair', label: 'Hair' },
  { id: 'nails', label: 'Nails' },
  { id: 'more', label: 'Price list & Training' },
]

// The three special deals shown at the top of the page.
export const FEATURED_DEALS = [
  {
    id: 'deal-1',
    title: 'Deal #1: Eyebrows',
    was: 'Rs 200',
    now: 'Rs 150',
    note: 'Forehead and upper lip are free with it.',
  },
  {
    id: 'deal-2',
    title: 'Deal #2: Gold Polisher',
    was: 'Rs 400',
    now: 'Rs 300',
    note: 'Free hand and foot massage, plus a face massage.',
  },
  {
    id: 'deal-3',
    title: 'Deal #3: Gold Glow',
    was: 'Rs 700',
    now: 'Rs 650',
    note: 'Gold skin polisher with free hand, foot and face massage.',
  },
].map((d) => ({ ...d, ...img(d.id) }))

// Every other poster. `cat` must match an id in CATEGORIES.
export const DEALS = [
  { id: 'nikkah', cat: 'bridal', title: 'Complete Nikkah Bridal Look', was: 'Rs 20,000', now: 'Rs 15,000' },
  { id: 'walima', cat: 'bridal', title: 'Walima Bridal Package', was: 'Rs 25,000', now: 'Rs 21,000' },
  { id: 'ring-ceremony', cat: 'bridal', title: 'Ring Ceremony Bridal Package', was: 'Rs 18,000', now: 'Rs 14,000' },
  { id: 'mehndi', cat: 'bridal', title: 'Mehndi Bridal Package', was: 'Rs 15,000', now: 'Rs 12,000' },
  { id: 'party-makeup', cat: 'bridal', title: 'Party Makeup', was: 'Rs 2,500', now: 'Rs 2,000' },

  { id: 'skin-care', cat: 'skin', title: 'Skin Care Deals', price: 'Rs 3,500 to 6,000' },
  { id: 'five-beauty-deals', cat: 'skin', title: '5 Beauty Deals', price: 'From Rs 2,000' },
  { id: 'massage-wax', cat: 'skin', title: 'Full Body Massage & Wax', price: 'Massage Rs 3,800 · Wax Rs 4,500' },

  { id: 'hair-deals', cat: 'hair', title: 'Hair Deals', price: 'Rs 3,000 to 15,000' },
  { id: 'premium-hair', cat: 'hair', title: 'Premium Hair Services', price: 'Four services for Rs 5,000' },
  { id: 'student-deals', cat: 'hair', title: 'Student Deals', price: 'Rs 1,500 to 2,500' },
  { id: 'two-person', cat: 'hair', title: 'Two Person Deals', price: 'Rs 5,500 to 6,000 for two' },

  { id: 'mani', cat: 'nails', title: 'Mani Packages', price: '6-step Rs 2,500 · 3-step Rs 1,200' },
  { id: 'pedi', cat: 'nails', title: 'Pedi Packages', price: '6-step Rs 2,500 · 3-step Rs 1,200' },
  { id: 'nail-shapes', cat: 'nails', title: 'Nail Shapes Guide', price: 'Seven classic shapes' },

  { id: 'price-list', cat: 'more', title: '30% Off All Services', price: 'Full price list' },
  { id: 'training', cat: 'more', title: 'Beauty Salon Training Program', price: '6 months at Rs 5,000 a month' },
].map((d) => ({ ...d, ...img(d.id) }))

/** Every image on the site. All of them are loaded before the page opens. */
export const ALL_IMAGES = [LOGO, ...FEATURED_DEALS, ...DEALS].map((i) => i.src)
