/**
 * Generates the Open Graph share cards — one per route, plus the brand card.
 * Run with: npm run gen:og
 *
 * Why one per route rather than one for the site: a link to /help and a link
 * to /features/chat are different things to be asked about, and a card that
 * says "Xelvic — Chat. Call. Vibe." for both tells the person deciding whether
 * to tap nothing they did not already know. Each card carries the route's own
 * section, headline and lede, taken from src/seo/routes.ts, which is the same
 * table the page and its static HTML are built from.
 *
 * Drawn as SVG and rasterised with sharp: no headless browser, no font files
 * to ship, and the whole set renders in a second or two.
 *
 * Layout note — the reason the old card is gone: the logo was composited at
 * `top: 66` with a 180px lockup while the headline's first baseline sat at
 * `y: 300`, so the mark covered the "C" in "Chat". Every element below is
 * placed on a shared grid and the headline block is measured before anything
 * under it is positioned, so nothing can land on anything else.
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadSeo, root } from './lib/seo-bundle.mjs'

const PINK = '#ec4899'
const PINK_DEEP = '#9d174d'
const PLUM = '#3a0a24'
const BLUSH = '#fff5f9'

const W = 1200
const H = 630
const PAD = 84
const CONTENT_W = W - PAD * 2

/* ── Text measurement ─────────────────────────────────────────────────────────
 * sharp has no text metrics, so widths are estimated per character. The
 * figures are Arial's, which is what librsvg will fall back to, and they only
 * have to be good enough to choose a line break — an estimate that is a few
 * percent out moves a wrap by one word, not off the card.
 * ------------------------------------------------------------------------- */
const NARROW = `iljtIf.,:;'!|()[] `
const WIDE = 'mwMW@%'

function charWidth(ch, size, bold) {
  if (NARROW.includes(ch)) return size * 0.3
  if (WIDE.includes(ch)) return size * (bold ? 0.85 : 0.79)
  if (ch !== ch.toLowerCase()) return size * (bold ? 0.68 : 0.63)
  return size * (bold ? 0.56 : 0.52)
}

const measure = (text, size, bold) =>
  [...text].reduce((w, ch) => w + charWidth(ch, size, bold), 0)

/** Greedy wrap. `maxLines` truncates rather than overflowing the card. */
function wrap(text, maxWidth, size, bold, maxLines = Infinity) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (!line || measure(candidate, size, bold) <= maxWidth) line = candidate
    else {
      lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  if (lines.length <= maxLines) return lines

  const kept = lines.slice(0, maxLines)
  let last = kept[maxLines - 1]
  while (last && measure(`${last}…`, size, bold) > maxWidth) last = last.slice(0, -1)
  kept[maxLines - 1] = `${last.replace(/[\s,.;:—-]+$/, '')}…`
  return kept
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const FONT = 'Plus Jakarta Sans, Segoe UI, Helvetica Neue, Arial, sans-serif'

const text = (x, y, content, { size, bold = false, fill, spacing, anchor }) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}"` +
  `${bold ? ' font-weight="800"' : ' font-weight="500"'}` +
  `${fill ? ` fill="${fill}"` : ''}` +
  `${spacing ? ` letter-spacing="${spacing}"` : ''}` +
  `${anchor ? ` text-anchor="${anchor}"` : ''}>${esc(content)}</text>`

/* ── The card ─────────────────────────────────────────────────────────────── */

function cardSvg({ kicker, headline, sub, path }) {
  /* The headline picks the largest size that still fits on two lines, so a
     long blog title shrinks instead of running off the edge. */
  const sizes = [68, 60, 52, 46]
  let size = sizes[sizes.length - 1]
  let headLines = wrap(headline, CONTENT_W, size, true, 2)
  for (const candidate of sizes) {
    const natural = wrap(headline, CONTENT_W, candidate, true)
    if (natural.length <= 2) {
      size = candidate
      headLines = natural
      break
    }
  }
  const lineHeight = Math.round(size * 1.12)

  const kickerBaseline = 262
  const headTop = kickerBaseline + 104
  const headBaselines = headLines.map((_, i) => headTop + i * lineHeight)
  const lastHead = headBaselines[headBaselines.length - 1]

  const ruleY = lastHead + 34
  const subTop = ruleY + 62
  /* A two-line headline leaves room for two lines of lede; a one-line headline
     for three. Either way the block ends above the bottom margin. */
  const subLines = wrap(sub, CONTENT_W, 26, false, headLines.length === 2 ? 2 : 3)
  const subBaselines = subLines.map((_, i) => subTop + i * 38)

  return Buffer.from(`
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="80%" cy="8%" r="72%">
        <stop offset="0" stop-color="${PINK}" stop-opacity="0.30"/>
        <stop offset="1" stop-color="${BLUSH}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="txt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${PINK_DEEP}"/>
        <stop offset="1" stop-color="${PINK}"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="${BLUSH}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <circle cx="${W - 70}" cy="${H + 30}" r="250" fill="${PINK}" opacity="0.10"/>
    <circle cx="${W - 30}" cy="${H - 120}" r="120" fill="${PINK}" opacity="0.07"/>

    ${text(W - PAD, 132, `xelvic.com${path === '/' ? '' : path}`, {
      size: 25,
      fill: PLUM,
      spacing: 0.5,
      anchor: 'end',
    })}

    ${text(PAD, kickerBaseline, kicker.toUpperCase(), {
      size: 29,
      bold: true,
      fill: PINK,
      spacing: 3.4,
    })}

    ${headBaselines
      .map((y, i) => text(PAD, y, headLines[i], { size, bold: true, fill: 'url(#txt)' }))
      .join('\n    ')}

    <rect x="${PAD}" y="${ruleY}" width="280" height="5" rx="2.5" fill="${PINK}"/>

    ${subBaselines
      .map((y, i) => text(PAD, y, subLines[i], { size: 26, fill: PLUM }))
      .join('\n    ')}
  </svg>`)
}

/* ── Driver ───────────────────────────────────────────────────────────────── */

const seo = await loadSeo()
const ogDir = resolve(root, 'public', 'og')
mkdirSync(ogDir, { recursive: true })
/* The logo is composited in rather than referenced, so the SVG stays a single
   self-contained string with no file paths to resolve at raster time. */
const logo = await sharp(resolve(root, 'public', 'media', 'brand', 'xelvic.png'))
  .resize(112, 112, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

async function render(card, filename) {
  const svg = cardSvg(card)
  await sharp(svg)
    .composite([{ input: logo, left: PAD, top: 64 }])
    .png({ compressionLevel: 9 })
    .toFile(resolve(ogDir, filename))
}

/* The brand card. Kept because it is the one image that is about the app
   rather than about a page, and because older links point at it. */
await render(
  {
    kicker: 'Free on iOS, Android & the web',
    headline: seo.site.tagline,
    sub: 'One app for the people you talk to every day — chat, calls, Moments, live rooms, Drops, Vibes and music.',
    path: '/',
  },
  'xelvic-og.png',
)

for (const r of seo.routes) {
  await render({ ...seo.cardFor(r), path: r.path }, `${seo.ogImageFor(r.path).split('/').pop()}`)
}

console.log(`✓ ${seo.routes.length + 1} share cards generated in public/og`)
