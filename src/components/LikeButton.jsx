import { useState } from 'react'
import { SHARED, cleanPhone, like, unlike, saveName, savedName, useLikes } from '../likes'
import Modal from './Modal'
import { HeartIcon } from './Icons'

/**
 * Heart button + "N likes". Tap the heart to like (or tap again to remove your like).
 * Tap "N likes" to see who liked it (contact numbers, partly hidden).
 */
export default function LikeButton({ post, title }) {
  const { list, mine, status } = useLikes(post)
  const [asking, setAsking] = useState(false) // pop-up asking for a contact number
  const [showing, setShowing] = useState(false) // pop-up with the list of who liked
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  async function run(fn) {
    setBusy(true)
    setFailed(false)
    const ok = await fn()
    setBusy(false)
    if (!ok) setFailed(true)
  }
  function tapHeart() {
    if (mine) return run(() => unlike(post))
    const phone = savedName()
    if (phone) run(() => like(post, phone, title))
    else setAsking(true)
  }

  const n = list.length
  return (
    <>
      <span className="like">
        <button
          type="button"
          className={'btn btn-small like-btn' + (mine ? ' is-liked' : '')}
          onClick={tapHeart}
          disabled={busy || status === 'loading'}
          aria-pressed={mine}
          aria-label={mine ? `Remove your like from ${title}` : `Like ${title}`}
        >
          <HeartIcon filled={mine} width={17} height={17} />
          {mine ? 'Liked' : 'Like'}
        </button>
        <button type="button" className="like-count" onClick={() => setShowing(true)}>
          {status === 'loading' ? '…' : n === 1 ? '1 like' : `${n} likes`}
        </button>
      </span>
      {failed && <span className="field-error like-error">Could not save. Check your internet and try again.</span>}

      {asking && (
        <NamePrompt
          title={title}
          onClose={() => setAsking(false)}
          onSave={(phone) => {
            saveName(phone)
            setAsking(false)
            run(() => like(post, phone, title))
          }}
        />
      )}
      {showing && <LikeList title={title} list={list} status={status} onClose={() => setShowing(false)} />}
    </>
  )
}

function NamePrompt({ title, onClose, onSave }) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  function submit(e) {
    e.preventDefault()
    const clean = cleanPhone(phone)
    if (!clean) return setError('Please write your mobile number, e.g. 0300 1234567.')
    onSave(clean)
  }
  return (
    <Modal label="Your contact number" onClose={onClose} className="like-modal">
      <h2 className="cart-title gold-text">Like {title}</h2>
      <p className="like-note">We only ask once. Others see only part of your number, like 0300 ****567.</p>
      <form className="booking like-form" onSubmit={submit} noValidate>
        <label htmlFor="like-phone">
          Your contact number *
          <input id="like-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="03xx xxxxxxx" maxLength={16} autoFocus aria-invalid={!!error} />
          {error && <span className="field-error">{error}</span>}
        </label>
        <button className="btn btn-primary" type="submit">
          <HeartIcon filled width={17} height={17} /> Like
        </button>
      </form>
    </Modal>
  )
}

function LikeList({ title, list, status, onClose }) {
  return (
    <Modal label={`People who liked ${title}`} onClose={onClose} className="like-modal">
      <h2 className="cart-title gold-text">Liked by</h2>
      <p className="like-note">{title}</p>
      {status === 'error' ? (
        <p className="field-error">The list could not load. Check your internet and try again.</p>
      ) : list.length === 0 ? (
        <p>No likes yet. Be the first to tap the heart.</p>
      ) : (
        <ul className="like-list">
          {list.map((l, i) => (
            <li key={(l.uid || '') + i}>
              <span className="like-avatar" aria-hidden="true">
                <HeartIcon filled width={15} height={15} />
              </span>
              {l.name}
            </li>
          ))}
        </ul>
      )}
      {!SHARED && <p className="like-note">Only likes made on this phone are shown here.</p>}
    </Modal>
  )
}
