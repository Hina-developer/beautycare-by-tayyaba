import { useState } from 'react'
import Lightbox from './Lightbox'

/** Opens posters full screen. Returns [open(items, index), viewerElement]. */
export default function usePosterViewer() {
  const [viewer, setViewer] = useState(null)
  const open = (items, index) => setViewer({ items, index })
  const element = viewer && (
    <Lightbox
      items={viewer.items}
      index={viewer.index}
      onChange={(index) => setViewer((v) => ({ ...v, index }))}
      onClose={() => setViewer(null)}
    />
  )
  return [open, element]
}
