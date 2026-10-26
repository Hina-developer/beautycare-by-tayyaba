// Photos and videos for the Gallery page.
//
// HOW TO ADD YOUR PHOTOS AND VIDEOS
//   1. Put the files in  public/gallery/  (for example bridal-1.jpg, nails-2.mp4)
//   2. Add one line for each file below, for example:
//        { type: 'image', src: 'gallery/bridal-1.jpg', caption: 'Bridal makeup', group: 'bridal' },
//        { type: 'video', src: 'gallery/nails-2.mp4', caption: 'Nail art', group: 'nails' },
//      group is one of the ids in GALLERY_GROUPS.
//   Keep videos short (15 to 30 seconds). Only use photos of real work and the real salon.

export const GALLERY_GROUPS = [
  { id: 'all', label: 'All' },
  { id: 'salon', label: 'Salon' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'hair', label: 'Hairstyles' },
  { id: 'nails', label: 'Nails' },
  { id: 'bridal', label: 'Bridal Looks' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'products', label: 'Products' },
]

export const GALLERY = []
