/* Build one labelled contact sheet of every character image, plus print their
   metadata (size + whether they carry real transparency). Run from web/:
     node scripts/char-sheet.mjs
*/
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const dir = 'public/media/char'
const out = 'public/media/char/_contact-sheet.png'

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('_')).sort()

const CELL_W = 300
const CELL_H = 400
const LABEL_H = 34
const COLS = 4
const ROWS = Math.ceil(files.length / COLS)

console.log(`\n${files.length} character images\n`)
for (const f of files) {
  const m = await sharp(path.join(dir, f)).metadata()
  console.log(
    `${f}\n    ${m.width}x${m.height}  channels=${m.channels}  alpha=${m.hasAlpha}  ${(fs.statSync(path.join(dir, f)).size / 1024).toFixed(0)}KB`,
  )
}

const composites = []
for (let i = 0; i < files.length; i++) {
  const col = i % COLS
  const row = Math.floor(i / COLS)

  const buf = await sharp(path.join(dir, files[i]))
    .resize(CELL_W - 20, CELL_H - LABEL_H - 20, { fit: 'contain', background: { r: 24, g: 24, b: 32, alpha: 1 } })
    .toBuffer()

  composites.push({ input: buf, left: col * CELL_W + 10, top: row * CELL_H + 10 })

  const label = `<svg width="${CELL_W}" height="${LABEL_H}">
    <rect width="${CELL_W}" height="${LABEL_H}" fill="#101018"/>
    <text x="8" y="22" font-family="monospace" font-size="17" fill="#ff8fc4">${i + 1}. ${files[i].replace('file_', '').slice(0, 26)}</text>
  </svg>`

  composites.push({ input: Buffer.from(label), left: col * CELL_W, top: row * CELL_H + CELL_H - LABEL_H })
}

await sharp({
  create: {
    width: COLS * CELL_W,
    height: ROWS * CELL_H,
    channels: 4,
    background: { r: 16, g: 16, b: 22, alpha: 1 },
  },
})
  .composite(composites)
  .png()
  .toFile(out)

console.log(`\nwrote ${out}  (${COLS}x${ROWS} grid, left-to-right, top-to-bottom)\n`)
