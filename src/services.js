// Every salon service, for the Services pages.
//
// HOW TO EDIT
//   price    : write your price as text, for example 'Rs 2,500' or 'From Rs 15,000'.
//              Leave it as null to show "Price on request".
//   duration : for example '60 min'. Leave as null to hide it.
//   poster   : which poster photo to show on the card (file name in public/images, without .webp).
//              Remove it to show the drawing instead.
//   art      : which drawing to show when there is no poster (see src/components/ServiceArt.jsx)
//
// Prices are left as null on purpose: your posters show different prices for
// some services (for example eyebrows), so please send the final price list.

export const SERVICE_GROUPS = [
  { id: 'makeup', page: 'makeup', label: 'Makeup', intro: 'Bridal, engagement, reception and party makeup by our team.' },
  { id: 'hair', page: 'hair', label: 'Hair', intro: 'Cuts, styling, colour, smoothing and hair treatments.' },
  { id: 'nails', page: 'nails', label: 'Nails & Lashes', intro: 'Acrylics, gel extensions, nail art, mani-pedi and lashes.' },
  { id: 'skin', page: 'skin', label: 'Skin, Spa & Body', intro: 'HydraFacial, facials, polishers, massage, waxing and threading.' },
]

export const SERVICES = [
  // ---- Makeup ----
  { group: 'makeup', art: 'jhumka', title: 'Bridal Makeup', poster: 'bridal-senior-artist', text: 'Soft, elegant bridal looks for Nikkah, Mehndi and Barat, with jewellery and dupatta setting.', price: null, duration: null },
  { group: 'makeup', art: 'palette', title: 'Party Makeup', poster: 'party-makeup-deals', text: 'Long-lasting base, party eyes, false lashes and glossy lips for any party.', price: null, duration: null },
  { group: 'makeup', art: 'necklace', title: 'Engagement Makeup', poster: 'ring-ceremony', text: 'A graceful ring ceremony look, finished with jewellery setting.', price: null, duration: null },
  { group: 'makeup', art: 'jhumka', title: 'Reception (Walima) Makeup', poster: 'walima', text: 'Glamorous walima makeup with hair style and dupatta drape.', price: null, duration: null },
  { group: 'makeup', art: 'palette', title: 'Other Occasion Makeup', poster: 'party-makeup', text: 'Makeup for Eid, birthdays, photoshoots and family events.', price: null, duration: null },

  // ---- Hair ----
  { group: 'hair', art: 'scissors', title: 'Haircuts', poster: 'hair-cutting-deals', text: 'Butterfly cut, layer cut, step cut, baby cut, U-shape and other styles.', price: null, duration: null },
  { group: 'hair', art: 'dryer', title: 'Hair Styling & Blow-Dry', poster: 'premium-hair', text: 'Smooth, shiny blow-dry and everyday styling.', price: null, duration: null },
  { group: 'hair', art: 'straight', title: 'Rebonding & Smoothing', poster: 'keratin-highlights', text: 'Keratin, rebonding and extenso for straight, frizz-free hair.', price: null, duration: null },
  { group: 'hair', art: 'colorBowl', title: 'Hair Highlights', poster: 'highlights-lowlights', text: 'Highlights and lowlights with glossing, priced by hair length.', price: null, duration: null },
  { group: 'hair', art: 'colorBowl', title: 'Hair Colouring', poster: 'single-shade-color', text: 'Global single-colour dye, priced by hair length.', price: null, duration: null },
  { group: 'hair', art: 'drop', title: 'Shampoo & Hair Wash', poster: 'hair-root-touchup', text: 'Deep cleansing, relaxing hair wash.', price: null, duration: null },
  { group: 'hair', art: 'jar', title: 'Hair Treatments & Haircare', poster: 'botox-nanoplasty', text: 'Protein treatment, hair mask, oiling and head massage.', price: null, duration: null },
  { group: 'hair', art: 'waves', title: 'Bridal & Party Hairstyles', poster: 'bridal-makeup-services', text: 'Open hair, curls and updos for your special day.', price: null, duration: null },

  // ---- Nails & Lashes ----
  { group: 'nails', art: 'nails', title: 'Acrylic Nails', poster: 'nail-art-50-off', text: 'Strong, long-lasting acrylic nails in your shape and length.', price: null, duration: null },
  { group: 'nails', art: 'nails', title: 'Nail Extensions', poster: 'nail-shapes', text: 'Gel extensions with French or cat-eye finish.', price: null, duration: null },
  { group: 'nails', art: 'polish', title: 'Nail Art', poster: 'nail-art-50-off', text: 'Glitter, stones and designs, with nail paint in your colour.', price: null, duration: null },
  { group: 'nails', art: 'spaBowl', title: 'Manicure', poster: 'mani', text: '3-step essentials and 6-step luxury whitening manicure.', price: null, duration: null },
  { group: 'nails', art: 'spaBowl', title: 'Pedicure', poster: 'pedi', text: '3-step essentials and 6-step luxury whitening pedicure.', price: null, duration: null },
  { group: 'nails', art: 'eye', title: 'Eyelash Extensions', poster: 'eyelash-extensions', text: 'Classic and volume lashes, plus lash lift.', price: null, duration: null },

  // ---- Skin, Spa & Body ----
  { group: 'skin', art: 'drop', title: 'HydraFacial', poster: 'hydra-diamond-facial', text: 'Deep cleansing and hydration for fresh, glowing skin.', price: null, duration: null },
  { group: 'skin', art: 'facial', title: 'Facials & Skincare', poster: 'korean-glass-facial', text: 'Whitening, glow, 24k gold and Korean facials, cleansing and masks.', price: null, duration: null },
  { group: 'skin', art: 'glow', title: 'Polishers', poster: 'deal-2', text: 'Whitening, gold and pink glow polishers for face, hands and feet.', price: null, duration: null },
  { group: 'skin', art: 'stones', title: 'Spa Services', poster: 'spa-massage-deals', text: 'Face, head, back, neck and shoulder massages.', price: null, duration: null },
  { group: 'skin', art: 'stones', title: 'Full-Body Massage', poster: 'massage-wax', text: 'A relaxing full-body massage.', price: null, duration: '60 min' },
  { group: 'skin', art: 'wax', title: 'Full-Body Waxing', poster: 'body-waxing-spa', text: 'Sugar or fruit wax for arms, legs, underarms and full body.', price: null, duration: null },
  { group: 'skin', art: 'brow', title: 'Threading & Facial Waxing', poster: 'deal-1', text: 'Eyebrows, forehead and upper lip.', price: null, duration: null },
]
