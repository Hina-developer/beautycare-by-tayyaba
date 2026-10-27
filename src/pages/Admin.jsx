import { useEffect, useMemo, useState } from 'react'
import { ADMIN_EMAIL, FIREBASE } from '../likesConfig'
import { SHARED } from '../likes'
import PageHead from '../components/PageHead'
import { PhoneIcon, WhatsAppIcon } from '../components/Icons'

// Private page: .../#admin  (not in the menu)
// Logs in with the admin's Firebase email + password, then shows who liked what,
// with FULL phone numbers. The password is checked by Firebase, never stored in code.
// The Firestore rules only give the full numbers to ADMIN_EMAIL.

const AUTH = 'https://identitytoolkit.googleapis.com/v1/accounts'
const PRIVATE = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents/likes_private`
const SESSION_KEY = 'bct-admin'

const readSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}
const writeSession = (s) => {
  try {
    if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(s))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

async function loadAll(idToken) {
  const rows = []
  let page = ''
  do {
    const res = await fetch(`${PRIVATE}?pageSize=300${page ? '&pageToken=' + page : ''}`, {
      headers: { Authorization: 'Bearer ' + idToken },
    })
    if (res.status === 401 || res.status === 403) throw new Error('denied')
    if (!res.ok) throw new Error('load')
    const j = await res.json()
    for (const d of j.documents || []) {
      const f = d.fields || {}
      rows.push({
        id: d.name,
        post: f.post?.stringValue || '',
        title: f.title?.stringValue || f.post?.stringValue || '',
        phone: f.phone?.stringValue || '',
        at: f.at?.timestampValue || '',
      })
    }
    page = j.nextPageToken || ''
  } while (page)
  return rows.sort((a, b) => b.at.localeCompare(a.at))
}

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''
const intl = (p) => '92' + p.slice(1) // 03001234567 -> 923001234567

function Login({ onDone }) {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    if (!password) return setMsg('Please write your password.')
    setBusy(true)
    try {
      const res = await fetch(`${AUTH}:signInWithPassword?key=${FIREBASE.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, returnSecureToken: true }),
      })
      const j = await res.json()
      if (!res.ok) {
        const code = j.error?.message || ''
        setMsg(code.includes('TOO_MANY') ? 'Too many tries. Please wait a few minutes.' : 'Wrong email or password.')
      } else if (j.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setMsg('This account is not the admin.')
      } else {
        const s = { idToken: j.idToken, exp: Date.now() + j.expiresIn * 1000, email: j.email }
        writeSession(s)
        onDone(s)
      }
    } catch {
      setMsg('No internet connection. Please try again.')
    }
    setBusy(false)
  }

  async function forgot() {
    setMsg('')
    try {
      const res = await fetch(`${AUTH}:sendOobCode?key=${FIREBASE.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType: 'PASSWORD_RESET', email: ADMIN_EMAIL }),
      })
      setMsg(res.ok ? `A password reset email was sent to ${ADMIN_EMAIL}. Check your inbox (and spam).` : 'Could not send the email. Try again later.')
    } catch {
      setMsg('No internet connection. Please try again.')
    }
  }

  return (
    <form className="booking admin-login" onSubmit={submit} noValidate>
      <label htmlFor="ad-email">
        Email
        <input id="ad-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
      </label>
      <label htmlFor="ad-pass">
        Password
        <input id="ad-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" autoFocus />
      </label>
      {msg && <p className="form-ok booking-wide" role="status">{msg}</p>}
      <div className="actions booking-wide">
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        <button className="btn" type="button" onClick={forgot}>
          Forgot password
        </button>
      </div>
    </form>
  )
}

export default function Admin() {
  const [session, setSession] = useState(() => {
    const s = readSession()
    return s && s.exp > Date.now() + 60000 ? s : null
  })
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  function logout() {
    writeSession(null)
    setSession(null)
    setRows(null)
  }

  useEffect(() => {
    if (!session) return
    setError('')
    loadAll(session.idToken)
      .then(setRows)
      .catch((e) => {
        if (e.message === 'denied') {
          setError('Access denied. Please log in again.')
          logout()
        } else setError('The list could not load. Check your internet and try again.')
      })
  }, [session])

  const posts = useMemo(() => {
    const m = new Map()
    for (const r of rows || []) m.set(r.post, { title: r.title, n: (m.get(r.post)?.n || 0) + 1 })
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n)
  }, [rows])
  const shown = (rows || []).filter((r) => filter === 'all' || r.post === filter)

  return (
    <>
      <PageHead eyebrow="Private" title="Admin: Likes" lead="Only you can see this page. It shows the full phone number of everyone who liked a post." />
      <section className="block">
        {!SHARED ? (
          <p className="center service-text">Firebase is not set up yet (src/likesConfig.js).</p>
        ) : !session ? (
          <Login onDone={setSession} />
        ) : (
          <div className="admin">
            <div className="admin-bar">
              <span className="service-text">Logged in as {session.email}</span>
              <span className="actions">
                <button className="btn btn-small" onClick={() => setSession({ ...session })}>
                  Refresh
                </button>
                <button className="btn btn-small" onClick={logout}>
                  Log out
                </button>
              </span>
            </div>
            {error && <p className="field-error">{error}</p>}
            {!rows && !error && <p className="service-text">Loading…</p>}
            {rows && (
              <>
                <p className="admin-total">
                  <strong>{rows.length}</strong> {rows.length === 1 ? 'like' : 'likes'} in total
                </p>
                {posts.length > 0 && (
                  <label className="admin-filter">
                    Post
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                      <option value="all">All posts</option>
                      {posts.map(([id, p]) => (
                        <option key={id} value={id}>
                          {p.title} ({p.n})
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {shown.length === 0 ? (
                  <p className="service-text">No likes yet.</p>
                ) : (
                  <ul className="admin-list">
                    {shown.map((r) => (
                      <li key={r.id}>
                        <div className="admin-main">
                          <strong className="admin-phone">{r.phone}</strong>
                          <span>{r.title}</span>
                          <span className="service-text">{fmtDate(r.at)}</span>
                        </div>
                        <div className="actions">
                          <a className="btn btn-small btn-primary" href={`https://wa.me/${intl(r.phone)}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon width={16} height={16} /> WhatsApp
                          </a>
                          <a className="btn btn-small" href={`tel:${r.phone}`}>
                            <PhoneIcon width={16} height={16} /> Call
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </>
  )
}
