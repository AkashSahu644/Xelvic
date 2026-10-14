/**
 * The Developer page's deep-link reference, kept out of the page so the
 * ItemList in the structured data can be built from the same six rows the
 * table renders.
 *
 * These values are URI schemes rather than site paths, which is why the list
 * carries them as names only — see the note in `routeExtras`.
 */
export const deepLinks = [
  { path: 'xelvic://u/<username>', desc: 'Open a user profile' },
  { path: 'xelvic://d/<id>', desc: 'Open a specific Drop' },
  { path: 'xelvic://v/<id>', desc: 'Open a Vibe' },
  { path: 'xelvic://live/<id>', desc: 'Join a live stream' },
  { path: 'xelvic://moments/<id>', desc: 'View a Moment' },
  { path: 'xelvic://room/<id>', desc: 'Walk into an audio room' },
]
