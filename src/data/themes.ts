export type Theme = {
  slug: string
  name: string
  emoji: string
  tier: 'rich' | 'lite'
  cover?: string // rich themes: a screen; lite: page.png
}

export const themes: Theme[] = [
  { slug: 'animeblue', name: 'Anime Blue', emoji: '🌀', tier: 'rich', cover: '/media/themes/animeblue/convo.jpg' },
  { slug: 'catgirl', name: 'Catgirl', emoji: '🐱', tier: 'rich', cover: '/media/themes/catgirl/convo.jpg' },
  { slug: 'alone', name: 'Alone', emoji: '🌙', tier: 'rich', cover: '/media/themes/alone/convo.jpg' },
  { slug: 'teddy', name: 'Teddy', emoji: '🧸', tier: 'rich', cover: '/media/themes/teddy/convo.jpg' },
  { slug: 'kitsune', name: 'Kitsune', emoji: '🦊', tier: 'lite', cover: '/media/themes/kitsune/page.png' },
  { slug: 'shinobi', name: 'Shinobi', emoji: '🥷', tier: 'lite', cover: '/media/themes/shinobi/page.png' },
  { slug: 'ronin', name: 'Ronin', emoji: '⚔️', tier: 'lite', cover: '/media/themes/ronin/page.png' },
  { slug: 'unicorn', name: 'Unicorn', emoji: '🦄', tier: 'lite', cover: '/media/themes/unicorn/page.jpg' },
  { slug: 'mecha', name: 'Mecha', emoji: '🤖', tier: 'lite', cover: '/media/themes/mecha/page.png' },
  { slug: 'astro', name: 'Astro', emoji: '🚀', tier: 'lite', cover: '/media/themes/astro/page.png' },
  { slug: 'bubblegum', name: 'Bubblegum', emoji: '🍬', tier: 'lite', cover: '/media/themes/bubblegum/page.png' },
  { slug: 'dino', name: 'Dino', emoji: '🦕', tier: 'lite', cover: '/media/themes/dino/page.png' },
  { slug: 'shojo', name: 'Shojo', emoji: '🎎', tier: 'lite', cover: '/media/themes/shojo/page.png' },
  { slug: 'idol', name: 'Idol', emoji: '⭐', tier: 'lite', cover: '/media/themes/idol/page.png' },
  { slug: 'toon', name: 'Toon', emoji: '🎮', tier: 'lite', cover: '/media/themes/toon/page.png' },
  { slug: 'cutlass', name: 'Cutlass', emoji: '🏴‍☠️', tier: 'lite', cover: '/media/themes/cutlass/page.png' },
  { slug: 'windup', name: 'Windup', emoji: '⚙️', tier: 'lite', cover: '/media/themes/windup/page.png' },
  { slug: 'pink', name: 'Pink', emoji: '🌸', tier: 'lite' },
]

/**
 * The full palette of colour themes shipped in the app (preview covers
 * extracted from the real build). Together with `themes` above these power
 * the "50+ themes" wall — 18 full UI themes + 33 colour palettes.
 */
export const themeCovers: { name: string; src: string }[] = [
  'alone', 'animeblue', 'astro', 'aurora', 'bubblegum', 'catgirl', 'chai',
  'cosmos', 'cutlass', 'dino', 'eclipse', 'ember', 'idol', 'kitsune',
  'marigold', 'mecha', 'monsoon', 'nebula', 'neon', 'obsidian', 'orchid',
  'peacock', 'pink', 'ronin', 'sakura', 'shinobi', 'shojo', 'solaris',
  'teddy', 'tidepool', 'toon', 'unicorn', 'windup',
].map((slug) => ({
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  src: `/media/themes/covers/${slug}.png`,
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
