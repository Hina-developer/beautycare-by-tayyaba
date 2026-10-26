// Shop items: dresses, rental dresses, jewellery and beauty products.
//
// Everything here is a SAMPLE until you send your real items.
// HOW TO ADD A REAL ITEM
//   1. Put its photos in  public/shop/  (for example lehenga-red-1.jpg)
//   2. Copy one block below and change it:
//        images: ['shop/lehenga-red-1.jpg', 'shop/lehenga-red-2.jpg']
//        price: 45000            (a number, or null for "Price on request")
//        stock: 'in' | 'out' | 'order'   (in stock, out of stock, made on order)
//        sample: false           (removes the "Sample" label)
//   3. Delete the sample blocks you no longer need.

const sample = { sample: true, images: [], price: null, stock: 'order' }

export const BOUTIQUE_GROUPS = [
  { id: 'bridal', label: 'Bridal Dresses' },
  { id: 'wedding', label: 'Wedding Dresses' },
  { id: 'party', label: 'Party Wear' },
  { id: 'formal', label: 'Formal Wear' },
  { id: 'engagement', label: 'Engagement & Reception' },
]

export const BOUTIQUE = [
  { ...sample, id: 'b1', group: 'bridal', art: 'dress', name: 'Bridal Lehenga', text: 'Heavy embroidered bridal lehenga with dupatta.', sizes: ['S', 'M', 'L', 'XL'], colours: ['Red', 'Maroon'], isNew: true },
  { ...sample, id: 'b2', group: 'wedding', art: 'dress', name: 'Nikkah Dress', text: 'Soft pastel Nikkah outfit with fine handwork.', sizes: ['S', 'M', 'L'], colours: ['Ivory', 'Champagne'], isNew: true },
  { ...sample, id: 'b3', group: 'party', art: 'gown', name: 'Party Wear Gown', text: 'Flowing gown with shimmer for evening parties.', sizes: ['S', 'M', 'L'], colours: ['Black', 'Gold'], isNew: false },
  { ...sample, id: 'b4', group: 'formal', art: 'suit', name: 'Formal Embroidered Suit', text: 'Three-piece formal suit for family events.', sizes: ['S', 'M', 'L', 'XL'], colours: ['Bottle Green', 'Navy'], isNew: false },
  { ...sample, id: 'b5', group: 'engagement', art: 'gown', name: 'Engagement Maxi', text: 'Graceful maxi for ring ceremony and engagement.', sizes: ['S', 'M', 'L'], colours: ['Pink', 'Silver'], isNew: true },
  { ...sample, id: 'b6', group: 'engagement', art: 'dress', name: 'Reception (Walima) Dress', text: 'Light, elegant walima outfit with embellished dupatta.', sizes: ['S', 'M', 'L'], colours: ['Silver', 'Blush'], isNew: false },
]

export const RENTALS = [
  { ...sample, id: 'r1', art: 'dress', name: 'Red Bridal Lehenga (Rent)', text: 'Full bridal lehenga with dupatta, cleaned after every use.', sizes: ['M', 'L'], colours: ['Red'], rentDays: 3, deposit: null, booked: [] },
  { ...sample, id: 'r2', art: 'dress', name: 'Nikkah Dress (Rent)', text: 'Pastel Nikkah dress with matching dupatta.', sizes: ['S', 'M'], colours: ['Ivory'], rentDays: 3, deposit: null, booked: [] },
  { ...sample, id: 'r3', art: 'gown', name: 'Walima Gown (Rent)', text: 'Silver walima gown with long trail.', sizes: ['M', 'L'], colours: ['Silver'], rentDays: 3, deposit: null, booked: [] },
  { ...sample, id: 'r4', art: 'gown', name: 'Party Gown (Rent)', text: 'Shimmer party gown for one evening.', sizes: ['S', 'M', 'L'], colours: ['Black'], rentDays: 2, deposit: null, booked: [] },
]
// To block dates for a rental dress, add them to its `booked` list, for example:
//   booked: [{ from: '2026-11-14', to: '2026-11-16' }]
// The booking form then warns clients that those dates are taken.

export const JEWELLERY_GROUPS = [
  { id: 'bridal', label: 'Bridal Jewellery' },
  { id: 'party', label: 'Party Wear Jewellery' },
  { id: 'necklace', label: 'Necklace Sets' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bangles', label: 'Bangles & Accessories' },
]

export const JEWELLERY = [
  { ...sample, id: 'j1', group: 'bridal', art: 'necklace', name: 'Bridal Kundan Set', text: 'Necklace, earrings and tikka for the bride.', colours: ['Gold'], isNew: true },
  { ...sample, id: 'j2', group: 'bridal', art: 'tikka', name: 'Maang Tikka', text: 'Statement tikka with pearls and stones.', colours: ['Gold', 'Silver'], isNew: false },
  { ...sample, id: 'j3', group: 'party', art: 'necklace', name: 'Party Choker Set', text: 'Light choker set for parties and dinners.', colours: ['Silver', 'Rose Gold'], isNew: true },
  { ...sample, id: 'j4', group: 'necklace', art: 'necklace', name: 'Pearl Necklace Set', text: 'Layered pearl necklace with earrings.', colours: ['Pearl'], isNew: false },
  { ...sample, id: 'j5', group: 'earrings', art: 'jhumka', name: 'Jhumka Earrings', text: 'Classic gold jhumkas with small pearls.', colours: ['Gold'], isNew: false },
  { ...sample, id: 'j6', group: 'bangles', art: 'bangles', name: 'Bangles Set', text: 'Set of matching bangles for bridal and party looks.', sizes: ['2.4', '2.6', '2.8'], colours: ['Gold', 'Red'], isNew: false },
]

export const PRODUCT_GROUPS = [
  { id: 'makeup', label: 'Makeup' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'haircare', label: 'Haircare' },
]

export const PRODUCTS = [
  { ...sample, id: 'p1', group: 'makeup', art: 'foundation', name: 'Foundation', text: 'Long-wear foundation in several shades.', colours: ['Fair', 'Medium', 'Wheatish'] },
  { ...sample, id: 'p2', group: 'makeup', art: 'tube', name: 'Concealer', text: 'Creamy concealer for full coverage.', colours: ['Light', 'Medium'] },
  { ...sample, id: 'p3', group: 'makeup', art: 'lipstick', name: 'Matte Lipstick', text: 'Smooth matte lipstick that lasts all day.', colours: ['Red', 'Nude', 'Berry'] },
  { ...sample, id: 'p4', group: 'makeup', art: 'palette', name: 'Eyeshadow Palette', text: 'Party shades with shimmer and matte.', salonUsed: true },
  { ...sample, id: 'p5', group: 'makeup', art: 'mascara', name: 'Mascara', text: 'Volume mascara for full lashes.' },
  { ...sample, id: 'p6', group: 'skincare', art: 'tube', name: 'Face Cleanser', text: 'Gentle daily face wash.' },
  { ...sample, id: 'p7', group: 'skincare', art: 'jar', name: 'Moisturiser', text: 'Light cream for soft, smooth skin.' },
  { ...sample, id: 'p8', group: 'skincare', art: 'oil', name: 'Face Serum', text: 'Brightening serum for a fresh glow.', salonUsed: true },
  { ...sample, id: 'p9', group: 'skincare', art: 'tube', name: 'Sunscreen SPF 50', text: 'Daily sun protection.' },
  { ...sample, id: 'p10', group: 'skincare', art: 'jar', name: 'Face Mask', text: 'Clay mask for clear pores.' },
  { ...sample, id: 'p11', group: 'haircare', art: 'bottle', name: 'Shampoo', text: 'Mild shampoo for daily use.', salonUsed: true },
  { ...sample, id: 'p12', group: 'haircare', art: 'bottle', name: 'Conditioner', text: 'Smooth, tangle-free hair.' },
  { ...sample, id: 'p13', group: 'haircare', art: 'jar', name: 'Hair Mask', text: 'Protein mask for dry, damaged hair.', salonUsed: true },
  { ...sample, id: 'p14', group: 'haircare', art: 'oil', name: 'Hair Oil', text: 'Nourishing oil for strong hair.' },
  { ...sample, id: 'p15', group: 'haircare', art: 'bottle', name: 'Styling Spray', text: 'Holds curls and updos in place.' },
]

/** "Rs 45,000", or "Price on request" when there is no price yet. */
export function formatPrice(n) {
  return typeof n === 'number' ? `Rs ${n.toLocaleString('en-US')}` : 'Price on request'
}

export const STOCK_LABEL = { in: 'In stock', out: 'Out of stock', order: 'Available on order' }
