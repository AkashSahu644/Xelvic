/**
 * One-off importer: turn an uploaded Xelvic logo PNG into the site's brand
 * asset. Run with:
 *
 *   node scripts/import-logo.mjs <source.png>
 *
 * The upload is a square "app icon" plate: a dark navy field with a gold glow,
 * a gold-framed rounded square holding the X mark and the Xelvic wordmark. We
 * only want the frame — the navy field and the glow would read as a dirty
 * smudge on the pink site. So this:
 *
 *   1. crops in, then tightens onto the gold frame by looking for the
 *      brightest pixels (the frame is the outermost bright thing),
 *   2. measures the frame's own corner radius by walking its outer edge,
 *   3. re-applies that radius as an alpha mask, so the corners are genuinely
 *      transparent and the mark drops onto any background cleanly.
 *
 * Writes a 1024px master to public/media/brand/xelvic.png.
 */
import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = process.argv[2]
if (!src) {
  console.error('usage: node scripts/import-logo.mjs <source.png>')
  process.exit(1)
}

const OUT = resolve(root, 'public/media/brand/xelvic.png')
const SIZE = 1024
const SEED = 0.94 // generous first crop, then we tighten onto the frame
const BRIGHT = 205 // luminance the gold frame reaches and the soft glow does not

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const lum = (x, y) => {
  const i = (y * W + x) * C
  return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
}

// --- 1. tighten onto the gold frame -----------------------------------------
let side = Math.round(Math.min(W, H) * SEED)
let left = Math.round((W - side) / 2)
let top = Math.round((H - side) / 2)
{
  let x0 = side
  let y0 = side
  let x1 = -1
  let y1 = -1
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      if (lum(left + x, top + y) > BRIGHT) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) throw new Error('found no bright pixels — is this the right image?')
  const pad = 1
  x0 = Math.max(0, x0 - pad)
  y0 = Math.max(0, y0 - pad)
  x1 = Math.min(side - 1, x1 + pad)
  y1 = Math.min(side - 1, y1 + pad)
  left += x0
  top += y0
  side = Math.max(x1 - x0, y1 - y0) + 1
  console.log(`frame found at (${left},${top}) ${x1 - x0 + 1}×${y1 - y0 + 1}`)
}

// --- 2. measure the frame's corner radius ------------------------------------
// Row 0 cuts the frame's flat top edge, so its leftmost gold pixel sits exactly
// `radius` in from the left. Walk down until the gold reaches x=0.
const at = (x, y) => lum(left + x, top + y)
let radius = Math.round(side * 0.22)
for (let y = 0; y < Math.floor(side / 2); y++) {
  let first = -1
  for (let x = 0; x < side; x++) {
    if (at(x, y) > BRIGHT) {
      first = x
      break
    }
  }
  if (first === 0) {
    radius = y
    break
  }
}
const r = Math.round((radius / side) * SIZE)
console.log(`source ${W}×${H} · crop ${side}px @ (${left},${top}) · corner radius ${radius}px → ${r}px`)

// --- 3. crop, resize, punch the corners out ---------------------------------
const master = await sharp(src)
  .extract({ left, top, width: side, height: side })
  .resize(SIZE, SIZE, { kernel: 'lanczos3' })
  .png()
  .toBuffer()

await sharp(master)
  .ensureAlpha()
  .composite([
    {
      input: Buffer.from(
        `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">` +
          `<rect width="${SIZE}" height="${SIZE}" rx="${r}" ry="${r}" fill="#fff"/></svg>`
      ),
      blend: 'dest-in',
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log('✓ wrote', OUT)
