/**
 * The Xelvic character system, exactly as it ships in the app.
 *
 * Both layers below are lifted from the real APK asset tree — nothing here is
 * invented:
 *
 *   assets/flutter_assets/assets/char/{bio,typing,wait}.png   the three global poses
 *   assets/flutter_assets/assets/themes/<theme>/typing.png    a mascot per theme
 *   assets/flutter_assets/assets/themes/<theme>/wait.png
 *   assets/flutter_assets/assets/themes/<theme>/page.png      richer themes only
 *
 * The short version: the mascot is not one fixed character. It is a cast. Every
 * theme pack ships its own artwork, so the character changes when you change
 * your look.
 */

export type Pose = {
  key: 'bio' | 'typing' | 'wait'
  src: string
  label: string
  role: string
  detail: string
}

/** The three poses that ship globally, outside any theme. */
export const poses: Pose[] = [
  {
    key: 'bio',
    src: '/media/char/bio.png',
    label: 'Bio',
    role: 'Profiles & onboarding',
    detail:
      'The one that introduces you. It fronts the welcome flow and stands in wherever a profile needs a face.',
  },
  {
    key: 'typing',
    src: '/media/char/typing.png',
    label: 'Typing',
    role: 'The typing indicator',
    detail:
      'What bobs at the bottom of a chat while the other person is mid-sentence. Three dots, one character.',
  },
  {
    key: 'wait',
    src: '/media/char/wait.png',
    label: 'Wait',
    role: 'Loading & empty screens',
    detail:
      'The patient one. It keeps you company on loading screens and when a list has nothing in it yet.',
  },
]

export type CastMember = {
  slug: string
  name: string
  emoji: string
  note: string
}

/**
 * Seventeen themes, seventeen characters. `slug` is the theme folder inside
 * the APK, so `/media/themes/<slug>/typing.png` and `/media/themes/<slug>/wait.png`
 * both resolve to art that ships with the app.
 */
export const cast: CastMember[] = [
  { slug: 'animeblue', name: 'Anime Blue', emoji: '🌀', note: 'Neon-lit anime daydream' },
  { slug: 'catgirl', name: 'Catgirl', emoji: '🐱', note: 'Magenta cyberpunk nights' },
  { slug: 'alone', name: 'Alone', emoji: '🌙', note: 'Quiet midnight blues' },
  { slug: 'teddy', name: 'Teddy', emoji: '🧸', note: 'Soft pink clouds' },
  { slug: 'kitsune', name: 'Kitsune', emoji: '🦊', note: 'Fox-spirit folklore' },
  { slug: 'shinobi', name: 'Shinobi', emoji: '🥷', note: 'Shadow-runner stealth' },
  { slug: 'ronin', name: 'Ronin', emoji: '⚔️', note: 'Wandering-sword dusk' },
  { slug: 'mecha', name: 'Mecha', emoji: '🤖', note: 'Chrome and cockpit glow' },
  { slug: 'astro', name: 'Astro', emoji: '🚀', note: 'Deep-space mission' },
  { slug: 'bubblegum', name: 'Bubblegum', emoji: '🍬', note: 'Sugar-pop pastels' },
  { slug: 'dino', name: 'Dino', emoji: '🦕', note: 'Prehistoric playground' },
  { slug: 'shojo', name: 'Shojo', emoji: '🎎', note: 'Ink-and-petal romance' },
  { slug: 'idol', name: 'Idol', emoji: '⭐', note: 'Stage lights and spotlights' },
  { slug: 'toon', name: 'Toon', emoji: '🎮', note: 'Saturday-morning cartoon' },
  { slug: 'cutlass', name: 'Cutlass', emoji: '🏴☠️', note: 'High-seas adventure' },
  { slug: 'windup', name: 'Windup', emoji: '⚙️', note: 'Brass gears and springs' },
  { slug: 'pink', name: 'Pink', emoji: '🌸', note: 'Straight-up pink, always' },
]

/** A theme's mascot for a given pose. */
export const mascotFor = (slug: string, pose: 'typing' | 'wait') =>
  `/media/themes/${slug}/${pose}.png`

/** A theme's preview cover — the tint the character sits on. */
export const coverFor = (slug: string) => `/media/themes/covers/${slug}.png`

/** Where the cast turns up while you're actually using the app. */
export const sightings = [
  {
    title: 'Someone is typing',
    body: 'The typing pose takes over the bottom of the thread the moment the other person starts writing.',
  },
  {
    title: 'Nothing here yet',
    body: 'Empty inbox, no moments, no drops — the wait pose fills the gap so a blank screen never feels broken.',
  },
  {
    title: 'Heavy screens loading',
    body: 'Opening a live room or a big gallery, the character holds the frame instead of a bare spinner.',
  },
  {
    title: 'Your own profile',
    body: 'The bio pose fronts onboarding and stands in as your placeholder avatar until you upload one.',
  },
]

/* ── Concept art ─────────────────────────────────────────────────────────────
 * Character artwork made for Xelvic. This is NOT app content — the cast above
 * is what actually ships in the APK. These are extra drawings: alternate poses
 * and side characters that live outside the theme system.
 *
 * Note: these are full-resolution PNGs (~1.3 MB each, ~24 MB for the set), so
 * every use is `loading="lazy"`. Compress them before this ever gets deployed.
 * ------------------------------------------------------------------------- */

export type ArtPiece = {
  /** Stable React key — the filename is long and not unique enough alone. */
  key: string
  src: string
  pose: string
}

export type ArtSet = {
  key: string
  name: string
  note: string
  pieces: ArtPiece[]
}

const piece = (file: string, pose: string): ArtPiece => {
  /* The uploads are named `file_<24 hex chars>.png`, and the first eight hex
     chars are zeroes on every single one — so the key has to come from the
     whole id, not a prefix slice, or every piece collides. */
  const id = file.replace(/^file_/, '').replace(/\.png$/, '')
  return { key: id, src: `/media/char/${file}`, pose }
}

export const artSets: ArtSet[] = [
  {
    key: 'robo-cat',
    name: 'Robo-cat',
    note: 'Round blue helper bot',
    pieces: [
      piece('file_000000005c288211a131376d9a024c56.png', 'Thinking'),
      piece('file_00000000535882088f1c4784fb8d622f.png', 'On the phone'),
    ],
  },
  {
    key: 'glasses-kid',
    name: 'Glasses kid',
    note: 'Nervous schoolboy',
    pieces: [
      piece('file_0000000050e88211ab52ed571049fc9c.png', 'Thinking'),
      piece('file_0000000076348211a06daa48ead57b41.png', 'Pointing'),
      piece('file_00000000af488208a2e5e96fa7ddb22c.png', 'On the phone'),
    ],
  },
  {
    key: 'grey-cat',
    name: 'Grey cat',
    note: 'Smug house cat',
    pieces: [
      piece('file_000000009f0c82119e29f685868d79fa.png', 'Thinking'),
      piece('file_0000000015208208b8b7639b30108cca.png', 'Pointing'),
      piece('file_00000000e48c820884e1dc560ccde6da.png', 'On the phone'),
    ],
  },
  {
    key: 'orange-mouse',
    name: 'Orange mouse',
    note: 'Cocky little schemer',
    pieces: [
      piece('file_000000003dd8820896781f4861e66d60.png', 'Thinking'),
      piece('file_0000000009888211b5c18bd5601690da.png', 'On the phone'),
    ],
  },
  {
    key: 'red-shirt-kid',
    name: 'Red-shirt kid',
    note: 'Cheeky five-year-old',
    pieces: [piece('file_00000000c2b482088fc5e4e845910585.png', 'Pointing')],
  },
  {
    key: 'blue-cat',
    name: 'Blue cat',
    note: 'Wide-eyed showman',
    pieces: [piece('file_00000000ef108211ab2e931c71274f9c.png', 'Pointing')],
  },
  {
    key: 'helmet-rider',
    name: 'Helmet rider',
    note: 'Faceless night courier',
    pieces: [
      piece('file_00000000d61c8208b4353fec13433314.png', 'Pointing'),
      piece('file_000000006a4c82088795a00d692a6657.png', 'Arms crossed'),
      piece('file_000000003aa08208b7d2f24bda738950.png', 'On the phone'),
    ],
  },
  {
    key: 'fox',
    name: 'Fox',
    note: 'Hoodie-and-backpack explorer',
    pieces: [
      piece('file_0000000095dc8208a069c43dcda25027.png', 'Thinking'),
      piece('file_0000000004dc8208b9d3d442be5a92ed.png', 'On the phone'),
    ],
  },
  {
    key: 'robot',
    name: 'Robot',
    note: 'Glowing blue android',
    pieces: [piece('file_0000000053c48211b912d171dd9f36f7.png', 'Thinking')],
  },
]

/** Every concept-art piece, flattened, each carrying its character's name. */
export const artWall = artSets.flatMap((set) =>
  set.pieces.map((p) => ({ ...p, name: set.name })),
)

/** One piece per character — the row used on the home page. */
export const artHighlights = artSets.map((set) => ({
  ...set.pieces[0],
  name: set.name,
}))
