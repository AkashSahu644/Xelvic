/**
 * Every theme that ships in the app, read straight off the build:
 *
 *   assets/themes/<slug>/typing.png   the character's typing pose
 *   assets/themes/<slug>/wait.png     the character's waiting pose
 *   assets/themes/<slug>/page.png     the full-page illustration (12 packs)
 *   assets/themes/covers/<slug>.png   the theme's cover
 *
 * That is 33 themes in all: 17 of them ship a character with the look, and the
 * other 16 are colour-only packs. 29 of the 33 also have a light cover
 * (`<slug>_light.png`); Alone, Anime Blue, Catgirl and Teddy are dark only.
 *
 * Nothing here is padded to a round marketing number — if a theme is not in
 * the APK asset tree, it is not in this file.
 */

export type ThemePack = {
  slug: string
  name: string
  emoji: string
  /** one line, the way the app describes the look */
  note: string
  /** ships typing/wait artwork and a character */
  character: boolean
  /** ships a full page.png illustration */
  pageArt: boolean
  /** ships a `<slug>_light.png` cover */
  hasLight: boolean
  cover: string
  coverLight?: string
}

const cover = (slug: string) => `/media/themes/covers/${slug}.png`

/* The 17 packs that carry a character. Notes match the cast section. */
const castPacks: Omit<ThemePack, 'cover' | 'coverLight' | 'hasLight'>[] = [
  { slug: 'animeblue', name: 'Anime Blue', emoji: '🌀', note: 'Neon-lit anime daydream', character: true, pageArt: false },
  { slug: 'catgirl', name: 'Catgirl', emoji: '🐱', note: 'Magenta cyberpunk nights', character: true, pageArt: false },
  { slug: 'alone', name: 'Alone', emoji: '🌙', note: 'Quiet midnight blues', character: true, pageArt: false },
  { slug: 'teddy', name: 'Teddy', emoji: '🧸', note: 'Soft pink clouds', character: true, pageArt: false },
  { slug: 'kitsune', name: 'Kitsune', emoji: '🦊', note: 'Fox-spirit folklore', character: true, pageArt: true },
  { slug: 'shinobi', name: 'Shinobi', emoji: '🥷', note: 'Shadow-runner stealth', character: true, pageArt: true },
  { slug: 'ronin', name: 'Ronin', emoji: '⚔️', note: 'Wandering-sword dusk', character: true, pageArt: true },
  { slug: 'mecha', name: 'Mecha', emoji: '🤖', note: 'Chrome and cockpit glow', character: true, pageArt: true },
  { slug: 'astro', name: 'Astro', emoji: '🚀', note: 'Deep-space mission', character: true, pageArt: true },
  { slug: 'bubblegum', name: 'Bubblegum', emoji: '🍬', note: 'Sugar-pop pastels', character: true, pageArt: true },
  { slug: 'dino', name: 'Dino', emoji: '🦕', note: 'Prehistoric playground', character: true, pageArt: true },
  { slug: 'shojo', name: 'Shojo', emoji: '🎎', note: 'Ink-and-petal romance', character: true, pageArt: true },
  { slug: 'idol', name: 'Idol', emoji: '⭐', note: 'Stage lights and spotlights', character: true, pageArt: true },
  { slug: 'toon', name: 'Toon', emoji: '🎮', note: 'Saturday-morning cartoon', character: true, pageArt: true },
  { slug: 'cutlass', name: 'Cutlass', emoji: '🏴‍☠️', note: 'High-seas adventure', character: true, pageArt: true },
  { slug: 'windup', name: 'Windup', emoji: '⚙️', note: 'Brass gears and springs', character: true, pageArt: true },
  { slug: 'pink', name: 'Pink', emoji: '🌸', note: 'Straight-up pink, always', character: true, pageArt: false },
]

/* The 16 colour-only packs. Their covers are the whole look in the app. */
const colourPacks: Omit<ThemePack, 'cover' | 'coverLight' | 'hasLight'>[] = [
  { slug: 'aurora', name: 'Aurora', emoji: '🌌', note: 'Night sky, lit from the horizon', character: false, pageArt: false },
  { slug: 'chai', name: 'Chai', emoji: '☕', note: 'Warm spice and slow mornings', character: false, pageArt: false },
  { slug: 'cosmos', name: 'Cosmos', emoji: '🪐', note: 'Something enormous, very far away, and mostly pink', character: false, pageArt: false },
  { slug: 'eclipse', name: 'Eclipse', emoji: '🌑', note: 'A dark disc with a bright rim', character: false, pageArt: false },
  { slug: 'ember', name: 'Ember', emoji: '🔥', note: 'The last hour of a fire — all glow, no flame', character: false, pageArt: false },
  { slug: 'marigold', name: 'Marigold', emoji: '🌼', note: 'Market-day orange and gold', character: false, pageArt: false },
  { slug: 'monsoon', name: 'Monsoon', emoji: '🌧️', note: 'Rain on hot pavement', character: false, pageArt: false },
  { slug: 'nebula', name: 'Nebula', emoji: '☁️', note: 'Dust and light, far from here', character: false, pageArt: false },
  { slug: 'neon', name: 'Neon', emoji: '🏙️', note: 'After-midnight signage', character: false, pageArt: false },
  { slug: 'obsidian', name: 'Obsidian', emoji: '⚫', note: 'Black glass, no shine', character: false, pageArt: false },
  { slug: 'orchid', name: 'Orchid', emoji: '🌺', note: 'A quiet, expensive bloom', character: false, pageArt: false },
  { slug: 'peacock', name: 'Peacock', emoji: '🦚', note: 'Blue-green, all eyes on it', character: false, pageArt: false },
  { slug: 'sakura', name: 'Sakura', emoji: '🌸', note: 'A week in spring, and then the pavement is pink', character: false, pageArt: false },
  { slug: 'solaris', name: 'Solaris', emoji: '☀️', note: 'Noon, turned all the way up', character: false, pageArt: false },
  { slug: 'tidepool', name: 'Tidepool', emoji: '🌊', note: 'Shallow water, warm stone', character: false, pageArt: false },
  { slug: 'unicorn', name: 'Unicorn', emoji: '🦄', note: 'Pastel horns and glitter', character: false, pageArt: false },
]

/** The four dark-only covers; every other theme ships a light variant too. */
const darkOnly = new Set(['alone', 'animeblue', 'catgirl', 'teddy'])

export const themePacks: ThemePack[] = [...castPacks, ...colourPacks].map((t) => ({
  ...t,
  hasLight: !darkOnly.has(t.slug),
  cover: cover(t.slug),
  coverLight: darkOnly.has(t.slug) ? undefined : cover(`${t.slug}_light`),
}))

export const characterThemes = themePacks.filter((t) => t.character)
export const colourThemes = themePacks.filter((t) => !t.character)
export const pageArtThemes = themePacks.filter((t) => t.pageArt)

/** Counts the pages print, so a count is never typed twice. */
export const themeCount = themePacks.length
export const characterThemeCount = characterThemes.length
export const colourThemeCount = colourThemes.length
export const pageArtCount = pageArtThemes.length
export const lightCoverCount = themePacks.filter((t) => t.hasLight).length

/* ── the older, narrower shapes ──────────────────────────────────────────────
 * The home page's marquee and the closing band still read these. They are
 * projections of `themePacks`, not a second source of truth, so a theme added
 * above turns up here without another edit.
 * ------------------------------------------------------------------------- */

export type Theme = {
  slug: string
  name: string
  emoji: string
  tier: 'rich' | 'lite'
  cover?: string
}

const richSlugs = new Set(['alone', 'animeblue', 'catgirl', 'teddy'])

export const themes: Theme[] = characterThemes.map((t) => ({
  slug: t.slug,
  name: t.name,
  emoji: t.emoji,
  tier: richSlugs.has(t.slug) ? 'rich' : 'lite',
  cover: richSlugs.has(t.slug)
    ? `/media/themes/${t.slug}/convo.jpg`
    : t.pageArt
      ? `/media/themes/${t.slug}/page.png`
      : undefined,
}))

/** One cover per theme, in the order the app lists them. */
export const themeCovers = themePacks.map((t) => ({
  slug: t.slug,
  name: t.name,
  src: t.cover,
}))

// Full-bleed chat wallpapers shipped with the app
export const wallpapers = [
  { slug: 'mehfil', name: 'Mehfil', src: '/media/walls/mehfil.jpg' },
  { slug: 'raat', name: 'Raat', src: '/media/walls/raat.jpg' },
  { slug: 'safar', name: 'Safar', src: '/media/walls/safar.jpg' },
  { slug: 'sheher', name: 'Sheher', src: '/media/walls/sheher.jpg' },
  { slug: 'studio', name: 'Studio', src: '/media/walls/studio.jpg' },
  { slug: 'xelvic', name: 'Xelvic', src: '/media/walls/xelvic.jpg' },
]
