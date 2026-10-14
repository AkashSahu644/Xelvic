/**
 * Generates favicons, the apple-touch-icon and the web app manifest from the
 * brand assets in /public/media. Run with: npm run gen:assets
 *
 * The share cards used to live here too. They moved to `gen-og.mjs`, because
 * there is now one per route rather than one for the site, and that script
 * needs to read the route table to know what to draw.
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const pub = resolve(root, 'public')
mkdirSync(resolve(pub, 'og'), { recursive: true })

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
