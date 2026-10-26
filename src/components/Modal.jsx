import { useEffect, useRef } from 'react'
import { CloseIcon } from './Icons'

/** A pop-up window. Closes with the × button, Escape, or a tap outside it. */
export default function Modal({ label, onClose, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current.open) ref.current.showModal()
  }, [])
  return (
    <dialog
      ref={ref}
      className={'modal ' + className}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="modal-body">
        <button className="icon-btn modal-close" onClick={() => ref.current.close()} aria-label="Close">
          <CloseIcon />
        </button>
        {children}
      </div>
    </dialog>
  )
}
