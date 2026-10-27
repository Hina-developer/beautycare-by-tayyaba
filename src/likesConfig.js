// Firebase settings for the Like buttons and the private Admin page (#admin).
//
// These values are public by design: every Firebase website shows them in its
// code. What protects the data are the Firestore rules in README.md ("Likes"):
//   - everyone can read the likes with the HALF-HIDDEN number (0300 ****567)
//   - only ADMIN_EMAIL, after logging in with its password, can read the full numbers
// Never put a password here.
export const FIREBASE = {
  apiKey: 'AIzaSyCLxtZIrO3MWw6-fw-4bZCBT_pu8hscyDw',
  projectId: 'beautycare-likes',
}

/** The only account that can open the Admin page and see full phone numbers. */
export const ADMIN_EMAIL = 'h31902572@gmail.com'
