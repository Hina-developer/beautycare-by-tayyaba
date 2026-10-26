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
  website: 'https://hina-developer.github.io/beautycare-by-tayyaba/',
  hours: 'Every day, 9:00 AM to 9:00 PM',
  address: 'Manawala Rd, near Haideri Mosque, Inayat Colony, Lahore',
  maps:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Manawala Rd near Haideri Mosque Inayat Colony Lahore'),
}

/** WhatsApp link with any message. */
export function whatsappLink(text) {
  return `${SALON.whatsapp}?text=${encodeURIComponent(text)}`
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
  { id: 'new', label: 'New Deals' },
  { id: 'special', label: 'Special Deals' },
  { id: 'bridal', label: 'Bridal & Makeup' },
  { id: 'skin', label: 'Skin & Spa' },
  { id: 'hair', label: 'Hair' },
  { id: 'nails', label: 'Nails & Lashes' },
  { id: 'more', label: 'Price list & Training' },
]

// The newest posters. They show first on the Weekend Deals page.
// `cat` must match an id in CATEGORIES.
export const NEW_DEALS = [
  { id: 'bridal-senior-artist', cat: 'bridal', title: 'Bridal Senior Artist Deal', price: 'Rs 19,999 (Barat or Walima)' },
  { id: 'bridal-makeup-services', cat: 'bridal', title: 'Bridal Makeup with Services & Hair Styling', price: 'Deal 1 Rs 25,999 · Deal 2 Rs 29,999' },
  { id: 'bridal-price-list', cat: 'bridal', title: 'Bridal Makeup with Hair Styling', price: 'Rs 8,500 to 14,999' },
  { id: 'bridal-services-package', cat: 'bridal', title: 'Bridal Services Package', price: 'Rs 12,000' },
  { id: 'party-makeup-deals', cat: 'bridal', title: 'Party Makeup Deals', price: 'Rs 4,999 · 6,999 · 9,999' },

  { id: 'hydra-diamond-facial', cat: 'skin', title: 'HydraFacial & Diamond Facial', price: 'HydraFacial Rs 2,999 · Diamond Rs 1,999' },
  { id: 'hydrafacial-7499', cat: 'skin', title: 'HydraFacial Deal (12 tools)', price: 'Rs 7,499' },
  { id: 'gold-hydrafacial-waxing', cat: 'skin', title: 'Gold with HydraFacial & Full Body Waxing', price: 'Rs 5,499 · Waxing Rs 3,499' },
  { id: 'hydrafacial-waxing', cat: 'skin', title: 'HydraFacial & Body Waxing', price: 'Rs 4,499 · Waxing Rs 3,499' },
  { id: 'gold-facial-waxing', cat: 'skin', title: '24k Gold Facial & Body Waxing', price: 'Rs 2,999 · Waxing Rs 3,499' },
  { id: 'korean-glass-facial', cat: 'skin', title: 'Korean Glass Skin Facial', price: 'Rs 7,999' },
  { id: 'janssen-facial-waxing', cat: 'skin', title: 'Janssen Facial & Full Body Waxing', price: 'Rs 4,999 · Waxing Rs 3,499' },
  { id: 'charcoal-facial-waxing', cat: 'skin', title: 'Charcoal Facial & Full Body Waxing', price: 'Rs 3,000 · Waxing Rs 3,499' },
  { id: 'body-waxing-spa', cat: 'skin', title: 'Body Waxing & Spa Deals', price: 'Rs 3,499 · 5,499 · 6,999' },
  { id: 'spa-massage-deals', cat: 'skin', title: 'Spa & Massage Deals', price: 'Rs 2,499 to 4,999' },
  { id: 'underarms-treatment', cat: 'skin', title: 'Underarms Treatment Deal', price: 'Rs 999' },

  { id: 'hair-cutting-deals', cat: 'hair', title: 'Hair Cutting Deals', price: 'Rs 1,999 · 2,999' },
  { id: 'hair-root-touchup', cat: 'hair', title: 'Hair Root Touch-up Deal', price: 'Rs 2,500 to 5,000' },
  { id: 'single-shade-color', cat: 'hair', title: 'Single Shade Base Colour', price: 'Rs 3,999 to 5,999' },
  { id: 'highlights-lowlights', cat: 'hair', title: 'Highlights & Lowlights', price: 'Rs 8,499 to 12,499' },
  { id: 'keratin-highlights', cat: 'hair', title: 'Keratin, Extenso, Rebonding & Highlights', price: 'Rs 7,000 to 14,500' },
  { id: 'botox-nanoplasty', cat: 'hair', title: 'Hair Botox & Nanoplasty', price: 'Rs 8,000 to 20,000' },

  { id: 'nail-art-50-off', cat: 'nails', title: 'Nail Art Deals, 50% Off', price: 'Rs 1,000 to 6,500' },
  { id: 'eyelash-extensions', cat: 'nails', title: 'Eyelash Extensions, 50% Off', price: 'Rs 3,999 to 6,999' },

  { id: 'students-course', cat: 'more', title: 'Students Professional Course (1 month)', price: 'Rs 24,999, certificate included' },
].map((d) => ({ ...d, isNew: true, ...img(d.id) }))

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
].map((d) => ({ ...d, cat: 'special', ...img(d.id) }))

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

/** Every poster, for the Weekend Deals page. */
export const ALL_POSTERS = [...NEW_DEALS, ...FEATURED_DEALS, ...DEALS]

/** The training program poster. */
export const TRAINING_POSTER = DEALS.find((d) => d.id === 'training')

/** Every image on the site. All of them are loaded before the page opens. */
export const ALL_IMAGES = [LOGO, ...NEW_DEALS, ...FEATURED_DEALS, ...DEALS].map((i) => i.src)
