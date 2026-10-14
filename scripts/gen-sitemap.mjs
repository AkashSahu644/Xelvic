/**
 * Generates public/sitemap.xml from the static routes plus data-driven slugs.
 * Run with: npm run gen:sitemap  (also runs automatically before build)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const BASE = 'https://xelvic.app'

/** Pull every `slug: '...'` / `id: '...'` string out of a data file. */
function extractKeys(file, key) {
  const src = readFileSync(resolve(root, 'src/data', file), 'utf8')
  const re = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`, 'g')
  const out = []
  let m
  while ((m = re.exec(src))) out.push(m[1])
  return out
}

const features = extractKeys('features.ts', 'slug')
const posts = extractKeys('posts.ts', 'slug')
const jobs = extractKeys('jobs.ts', 'id')

// path -> change priority. Higher = more important.
const staticRoutes = [
  ['/', 1.0],
  ['/features', 0.9],
  ['/how-it-works', 0.8],
  ['/whats-new', 0.8],
  ['/explore', 0.7],
  ['/overview', 0.6],
  ['/download', 0.9],
  ['/creators', 0.7],
  ['/developers', 0.7],
  ['/about', 0.6],
  ['/careers', 0.6],
  ['/blog', 0.7],
  ['/press', 0.5],
  ['/brand', 0.4],
  ['/privacy', 0.4],
  ['/data', 0.5],
  ['/terms', 0.4],
  ['/security', 0.5],
  ['/safety', 0.6],
  ['/help', 0.6],
  ['/community', 0.6],
  ['/support', 0.5],
  ['/contact', 0.6],
]

const urls = [
  ...staticRoutes.map(([loc, pr]) => ({ loc, pr })),
  ...features.map((s) => ({ loc: `/features/${s}`, pr: 0.6 })),
  ...posts.map((s) => ({ loc: `/blog/${s}`, pr: 0.5 })),
  ...jobs.map((id) => ({ loc: `/careers/${id}`, pr: 0.4 })),
]

const today = new Date().toISOString().slice(0, 10)
const body = urls
  .map(
    ({ loc, pr }) =>
      `  <url>\n    <loc>${BASE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${pr.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`✓ sitemap.xml written with ${urls.length} URLs`)
