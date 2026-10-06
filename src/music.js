// Background songs: a different song for each day of the week.
//
// HOW TO CHANGE A SONG
//   1. Replace the file in the  public/songs  folder. Keep exactly these names:
//        monday.mp3  tuesday.mp3  wednesday.mp3  thursday.mp3
//        friday.mp3  saturday.mp3  sunday.mp3
//   2. Write the new song's name in `title` below. It shows in the gold bar.
//
// The site plays only your files. A day with no file stays silent.
// Browsers do not allow sound before the visitor taps something, so the song
// starts when the visitor cuts the ribbon on the opening screen.

export const SONGS = {
  monday:    { file: 'songs/monday.mp3',    title: 'Daybreak' },
  tuesday:   { file: 'songs/tuesday.mp3',   title: 'Home' },
  wednesday: { file: 'songs/wednesday.mp3', title: 'Find You' },
  thursday:  { file: 'songs/thursday.mp3',  title: 'Faith' },
  friday:    { file: 'songs/friday.mp3',    title: 'From Here' },
  saturday:  { file: 'songs/saturday.mp3',  title: 'Lost Islands' },
  sunday:    { file: 'songs/sunday.mp3',    title: 'Leaving Millie' },
}

// The seven songs above are by Tanner Helland and are free to use, including
// for a business, as long as this credit stays on the site (CC BY 4.0 licence).
// If you replace ALL seven files with your own songs, set MUSIC_CREDIT to null.
export const MUSIC_CREDIT = {
  text: 'Music by Tanner Helland, used under CC BY 4.0',
  url: 'https://github.com/tannerhelland/free-music',
}

export const VOLUME = 0.6 // 0 = silent, 1 = full

export const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
export const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Today's day name on the visitor's device, for example "monday". */
export const todayKey = () => DAY_KEYS[new Date().getDay()]

export function createMusicPlayer() {
  let audio = null
  let token = 0 // guards against an old song starting after a newer one was chosen

  function stop() {
    token += 1
    if (audio) audio.pause()
    audio = null
  }

  /**
   * Call this from a click or tap. Plays that day's song on repeat.
   * Resolves to true when the song is playing, false when the file is missing.
   */
  function play(dayKey) {
    stop()
    const mine = ++token
    const el = new Audio(SONGS[dayKey].file)
    el.loop = true
    el.volume = VOLUME
    audio = el
    return el.play().then(
      () => {
        if (mine !== token) el.pause()
        return true
      },
      () => {
        if (mine === token) audio = null
        return false
      },
    )
  }

  return { play, stop }
}
