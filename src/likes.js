// Likes for the service cards.
//
// Two modes:
//   shared : FIREBASE in likesConfig.js is filled in. Every like is saved in a
//            free Firestore database, so everyone sees the same list of names.
//   local  : FIREBASE is empty. Likes are kept on this phone only.
//
// No library is needed: Firebase is reached through its plain web (REST) API.

import { useEffect, useSyncExternalStore } from 'react'
import { FIREBASE } from './likesConfig'

export const SHARED = Boolean(FIREBASE.apiKey && FIREBASE.projectId)

const NAME_KEY = 'bct-like-phone'
const LOCAL_KEY = 'bct-likes'
const AUTH_KEY = 'bct-like-auth'

const read = (k, fallback) => {
  try {
    const v = localStorage.getItem(k)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* private window: keep going without saving */
  }
}

/**
 * The phone number this visitor gave the first time they liked something.
 * Only a masked copy (e.g. "0327 ****309") is saved with the like, so the full
 * number is never shown to other visitors.
 */
export const savedName = () => read(NAME_KEY, '')
export const saveName = (n) => write(NAME_KEY, n)

/** "03001234567" or "+923001234567" -> "03001234567", or '' if it is not a Pakistani mobile number. */
export function cleanPhone(raw) {
  let d = raw.replace(/[\s-]/g, '')
  if (d.startsWith('+92')) d = '0' + d.slice(3)
  else if (d.startsWith('92') && d.length === 12) d = '0' + d.slice(2)
  return /^03\d{9}$/.test(d) ? d : ''
}

/** "03001234567" -> "0300 ****567" */
export const maskPhone = (p) => p.slice(0, 4) + ' ****' + p.slice(-3)

/** A short id for a post, e.g. "Bridal Makeup" -> "svc-bridal-makeup". */
export const postId = (prefix, title) =>
  prefix + '-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ---------------------------------------------------------------------------
// Store: { status, likes: { [post]: [{ name, uid, at }] }, me: uid }
// ---------------------------------------------------------------------------
let state = { status: 'idle', likes: {}, me: SHARED ? read(AUTH_KEY, {}).uid || null : 'me' }
const listeners = new Set()
const set = (patch) => {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}
const subscribe = (l) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

// ---- Firebase (REST) ----
const DB = SHARED
  ? `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents/likes`
  : ''

/** Signs this browser in anonymously (no email), so it can only remove its own likes. */
async function token() {
  let a = read(AUTH_KEY, null)
  if (a && a.idToken && a.exp > Date.now() + 60000) return a
  let res
  if (a && a.refreshToken) {
    res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(a.refreshToken),
    })
    if (res.ok) {
      const j = await res.json()
      a = { uid: j.user_id, idToken: j.id_token, refreshToken: j.refresh_token, exp: Date.now() + j.expires_in * 1000 }
    } else a = null
  } else a = null
  if (!a) {
    res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    })
    if (!res.ok) throw new Error('sign-in failed')
    const j = await res.json()
    a = { uid: j.localId, idToken: j.idToken, refreshToken: j.refreshToken, exp: Date.now() + j.expiresIn * 1000 }
  }
  write(AUTH_KEY, a)
  if (state.me !== a.uid) set({ me: a.uid })
  return a
}

async function loadShared() {
  const likes = {}
  let page = ''
  do {
    const res = await fetch(`${DB}?pageSize=300&key=${FIREBASE.apiKey}${page ? '&pageToken=' + page : ''}`)
    if (!res.ok) throw new Error('load failed')
    const j = await res.json()
    for (const d of j.documents || []) {
      const f = d.fields || {}
      const post = f.post?.stringValue
      if (!post) continue
      ;(likes[post] ||= []).push({ name: f.name?.stringValue || '', uid: f.uid?.stringValue, at: f.at?.timestampValue })
    }
    page = j.nextPageToken || ''
  } while (page)
  for (const k in likes) likes[k].sort((a, b) => (b.at || '').localeCompare(a.at || ''))
  return likes
}

// ---- local ----
function loadLocal() {
  const mine = read(LOCAL_KEY, {})
  const likes = {}
  for (const post in mine) likes[post] = [{ name: mine[post], uid: 'me', at: '' }]
  return likes
}

export function loadLikes() {
  if (state.status !== 'idle') return
  if (!SHARED) return set({ status: 'ready', likes: loadLocal() })
  set({ status: 'loading' })
  loadShared()
    .then((likes) => set({ status: 'ready', likes }))
    .catch(() => set({ status: 'error' }))
}

/** Adds a like. Resolves to true when saved. */
export async function like(post, name) {
  const before = state.likes
  const add = (uid) => ({ ...state.likes, [post]: [{ name, uid, at: new Date().toISOString() }, ...(state.likes[post] || []).filter((l) => l.uid !== uid)] })
  if (!SHARED) {
    write(LOCAL_KEY, { ...read(LOCAL_KEY, {}), [post]: name })
    set({ likes: add('me') })
    return true
  }
  try {
    const a = await token()
    set({ likes: add(a.uid) })
    const res = await fetch(`${DB}?documentId=${encodeURIComponent(post + '__' + a.uid)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + a.idToken },
      body: JSON.stringify({
        fields: {
          post: { stringValue: post },
          name: { stringValue: name },
          uid: { stringValue: a.uid },
          at: { timestampValue: new Date().toISOString() },
        },
      }),
    })
    // 409 means this person already liked it: that's fine
    if (!res.ok && res.status !== 409) throw new Error('save failed')
    return true
  } catch {
    set({ likes: before })
    return false
  }
}

/** Removes this visitor's like. Resolves to true when removed. */
export async function unlike(post) {
  const before = state.likes
  const drop = (uid) => ({ ...state.likes, [post]: (state.likes[post] || []).filter((l) => l.uid !== uid) })
  if (!SHARED) {
    const mine = read(LOCAL_KEY, {})
    delete mine[post]
    write(LOCAL_KEY, mine)
    set({ likes: drop('me') })
    return true
  }
  try {
    const a = await token()
    set({ likes: drop(a.uid) })
    const res = await fetch(`${DB}/${encodeURIComponent(post + '__' + a.uid)}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + a.idToken },
    })
    if (!res.ok && res.status !== 404) throw new Error('remove failed')
    return true
  } catch {
    set({ likes: before })
    return false
  }
}

/** Live likes for one post: { list, mine, status }. */
export function useLikes(post) {
  useEffect(loadLikes, [])
  const s = useSyncExternalStore(subscribe, () => state)
  const list = s.likes[post] || []
  return { list, mine: !!s.me && list.some((l) => l.uid === s.me), status: s.status }
}
