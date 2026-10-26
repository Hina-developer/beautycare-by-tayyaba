import { useState } from 'react'
import { SHARED, like, unlike, saveName, savedName, useLikes } from '../likes'
import Modal from './Modal'
import { HeartIcon } from './Icons'

/**
 * Heart button + "N likes". Tap the heart to like (or tap again to remove your like).
 * Tap "N likes" to see the names of everyone who liked it.
 */
export default function LikeButton({ post, title }) {
  const { list, mine, status } = useLikes(post)
  const [asking, setAsking] = useState(false) // pop-up asking for a name
  const [showing, setShowing] = useState(false) // pop-up with the list of names
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
    const name = savedName()
    if (name) run(() => like(post, name))
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
          onSave={(name) => {
            saveName(name)
            setAsking(false)
            run(() => like(post, name))
          }}
        />
      )}
      {showing && <LikeList title={title} list={list} status={status} onClose={() => setShowing(false)} />}
    </>
  )
}

function NamePrompt({ title, onClose, onSave }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  function submit(e) {
    e.preventDefault()
    const clean = name.trim().replace(/\s+/g, ' ')
    if (!clean) return setError('Please write your name.')
    if (clean.length > 40) return setError('Please keep it under 40 letters.')
    onSave(clean)
  }
  return (
    <Modal label="Your name" onClose={onClose} className="like-modal">
      <h2 className="cart-title gold-text">Like {title}</h2>
      <p className="like-note">
        {SHARED
          ? 'Your name will show in the list of people who liked this. We only ask once.'
          : 'We only ask once.'}
      </p>
      <form className="booking like-form" onSubmit={submit} noValidate>
        <label htmlFor="like-name">
          Your name *
          <input id="like-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" maxLength={40} autoFocus aria-invalid={!!error} />
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
                {l.name.charAt(0).toUpperCase()}
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
