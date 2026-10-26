import { useState } from 'react'
import { CopyIcon } from './Icons'

/** Copies text. If the browser refuses, it selects the text on the page instead so it can be copied by hand. */
export default function CopyButton({ text, targetRef, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    const done = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    const selectIt = () => {
      if (!targetRef?.current) return
      const range = document.createRange()
      range.selectNodeContents(targetRef.current)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, selectIt)
    else selectIt()
  }
  return (
    <button className="btn btn-small" onClick={copy} type="button">
      <CopyIcon width={16} height={16} /> {copied ? 'Copied' : label}
    </button>
  )
}
