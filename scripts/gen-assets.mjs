/**
 * Generates favicons, apple-touch-icon and the Open Graph share image
 * from the brand assets in /public/media. Run with: npm run gen:assets
 *
 * Outputs to /public (favicons) and /public/og (share image).
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const pub = resolve(root, 'public')
const ogDir = resolve(pub, 'og')
mkdirSync(ogDir, { recursive: true })

const PINK = '#ec4899'
const PLUM = '#3a0a24'
const BLUSH = '#fff5f9'

const LOGO = resolve(pub, 'media/brand/xelvic.png')

// ---- Favicons: the app icon, at every size browsers ask for -----------------
const iconSizes = [16, 32, 48, 180, 192, 512]
for (const s of iconSizes) {
  const name = s === 180 ? 'apple-touch-icon.png' : `favicon-${s}x${s}.png`
  await sharp(LOGO).resize(s, s).png().toFile(resolve(pub, name))
}
// Primary favicon.ico-style PNG (browsers accept PNG at /favicon.ico via link tag)
await sharp(LOGO).resize(32, 32).png().toFile(resolve(pub, 'favicon.png'))

// Maskable icons get circle-cropped by the launcher. The master is the app
// icon on its own plate now, and the mark already sits comfortably inside the
// safe zone, so the plate itself is the maskable file — nothing to inset.
//
// This block used to crop the top 68% of the master to lift the mark off the
// wordmark underneath it. That was for a stacked lockup; run against the icon
// it just cuts the bottom third off. If the master ever becomes a lockup
// again, the crop has to come back.
await sharp(LOGO).resize(512, 512).png().toFile(resolve(pub, 'favicon-maskable-512.png'))

// Standalone mark: the brand center offers it beside the full lockup.
await sharp(LOGO).resize(512, 512).png().toFile(resolve(pub, 'media/brand/xelvic-icon.png'))
console.log('✓ favicons generated')

// ---- Open Graph image: 1200×630 branded card -------------------------------
const W = 1200
const H = 630
const ogBg = Buffer.from(`
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="78%" cy="12%" r="70%">
        <stop offset="0" stop-color="${PINK}" stop-opacity="0.32"/>
        <stop offset="1" stop-color="${BLUSH}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="txt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#9d174d"/>
        <stop offset="1" stop-color="${PINK}"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${BLUSH}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <circle cx="${W - 120}" cy="${H - 90}" r="220" fill="${PINK}" opacity="0.12"/>
    <text x="90" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="118" fill="url(#txt)">Chat. Call. Vibe.</text>
    <text x="94" y="378" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="40" fill="${PLUM}" opacity="0.72">One app for the people you talk to every day.</text>
    <rect x="94" y="430" width="300" height="4" rx="2" fill="${PINK}"/>
  </svg>`)

const logo = await sharp(LOGO).resize({ width: 180 }).toBuffer()

await sharp(ogBg)
  .composite([{ input: logo, left: 90, top: 66 }])
  .png()
  .toFile(resolve(ogDir, 'xelvic-og.png'))
console.log('✓ OG image generated')

// ---- Web app manifest ------------------------------------------------------
const manifest = {
  name: 'Xelvic',
  short_name: 'Xelvic',
  description: 'Chat, call, go live and vibe. One app for the people you talk to every day.',
  theme_color: BLUSH,
  background_color: BLUSH,
  display: 'standalone',
  start_url: '/',
  icons: [
    { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    { src: '/favicon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
writeFileSync(resolve(pub, 'site.webmanifest'), JSON.stringify(manifest, null, 2))
console.log('✓ web manifest written')
