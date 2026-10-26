// The deal posts on the Weekend Deals page. Prices and contents are copied
// from the salon's own posters. To add a deal, copy one block and change it.
//   art   = drawing to show (see src/components/ServiceArt.jsx)
//   badge = the ribbon on top, as written on the poster
//   ends  = optional last day of the offer, for example ends: '12 Oct 2026'
//   To remove a deal, delete its block. To pause one, put // in front of each of its lines.

export const DEAL_POSTS = [
  {
    title: 'Gold Polisher',
    art: 'glow',
    badge: 'Weekend Deal',
    prices: [{ was: 'Rs 400', now: 'Rs 300' }],
    includes: ['Gold polisher', 'Free hand & foot massage', 'Free face massage'],
  },
  {
    title: 'Gold Glow Skin Polisher',
    art: 'glow',
    badge: 'Weekend Deal',
    prices: [{ was: 'Rs 700', now: 'Rs 650' }],
    includes: ['Gold skin polisher', 'Free hand & foot massage', 'Free face massage'],
  },
  {
    title: 'Party Makeup',
    art: 'palette',
    badge: 'Weekend Deal',
    prices: [{ was: 'Rs 2,500', now: 'Rs 2,000' }],
    includes: ['Flawless long-lasting base', 'Party makeup look', 'False lashes (optional)', 'Hair style (optional)', 'Touch up kit'],
  },
  {
    title: 'Nikkah Bridal Look',
    art: 'jhumka',
    badge: 'Weekend Deal',
    prices: [{ was: 'Rs 20,000', now: 'Rs 15,000' }],
    includes: ['Bridal makeup', 'Hair style (open or updo)', 'Premium jewellery set', 'Bridal outfit & dupatta styling', 'Mani pedi'],
  },
  {
    title: 'Ring Ceremony Bridal',
    art: 'necklace',
    badge: 'Weekend Deal',
    prices: [{ was: 'Rs 18,000', now: 'Rs 14,000' }],
    includes: ['Whitening facial', 'Mani pedi', 'Hair style', 'Makeup', 'Jewellery setting'],
  },
  {
    title: 'Mehndi Bridal',
    art: 'jhumka',
    badge: 'Special Deal',
    prices: [{ was: 'Rs 15,000', now: 'Rs 12,000' }],
    includes: ['Whitening facial', 'Mani pedi', 'Hair style', 'Makeup', 'Jewellery setting'],
  },
  {
    title: 'Walima Bridal',
    art: 'necklace',
    badge: 'Special Deal',
    prices: [{ was: 'Rs 25,000', now: 'Rs 21,000' }],
    includes: ['Whitening facial', 'Mani pedi', 'Walima hair style & makeup', 'Jewellery setting', 'Dupatta setting & drape'],
  },
  {
    title: 'Eyebrows Deal',
    art: 'brow',
    badge: "Today's Deal",
    prices: [{ was: 'Rs 200', now: 'Rs 150' }],
    includes: ['Eyebrow threading', 'Forehead free', 'Upper lip free'],
  },
  {
    title: 'Full Body Massage',
    art: 'stones',
    badge: "Today's Deal",
    prices: [{ was: 'Rs 4,500', now: 'Rs 3,800' }],
    includes: ['Relaxing full body massage'],
  },
  {
    title: 'Full Body Wax',
    art: 'wax',
    badge: "Today's Deal",
    prices: [{ was: 'Rs 5,500', now: 'Rs 4,500' }],
    includes: ['Full body wax'],
  },
  {
    title: 'Manicure Packages',
    art: 'spaBowl',
    badge: "Today's Deal",
    prices: [
      { label: '6-Step Luxury', was: 'Rs 3,500', now: 'Rs 2,500' },
      { label: '3-Step Essentials', was: 'Rs 1,500', now: 'Rs 1,200' },
    ],
    includes: [],
  },
  {
    title: 'Pedicure Packages',
    art: 'spaBowl',
    badge: "Today's Deal",
    prices: [
      { label: '6-Step Luxury', was: 'Rs 3,500', now: 'Rs 2,500' },
      { label: '3-Step Essentials', was: 'Rs 1,500', now: 'Rs 1,200' },
    ],
    includes: [],
  },
]
