// Loads every image up front, so nothing pops in late while the visitor scrolls.
// The opening screen stays up until this finishes.

const kept = [] // keep references so the browser holds the decoded images in memory

export function preloadImages(urls, onProgress) {
  let done = 0
  const tick = () => {
    done += 1
    onProgress?.(done, urls.length)
  }
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const im = new Image()
          im.decoding = 'async'
          im.fetchPriority = 'high'
          const finish = () => {
            tick()
            resolve()
          }
          im.onload = () => {
            // decode() makes the image ready to paint, not just downloaded
            if (im.decode) im.decode().then(finish, finish)
            else finish()
          }
          im.onerror = finish // a missing image must never block the site
          im.src = url
          kept.push(im)
        }),
    ),
  )
}
