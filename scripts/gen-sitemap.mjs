/**
 * Generates public/sitemap.xml from the static routes plus data-driven slugs.
 * Run with: npm run gen:sitemap  (also runs automatically before build)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const BASE = 'https://xelvic.com'

/** Pull every `slug: '...'` / `id: '...'` string out of a data file. */
function extractKeys(file, key) {
  const src = readFileSync(resolve(root, 'src/data', file), 'utf8')
  const re = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`, 'g')
  const out = []
  let m
  while ((m = re.exec(src))) out.push(m[1])
  return out
}

/**
 * Blog posts carry a real publication date, so they get a real `lastmod`.
 *
 * Everything else gets none, and that is a deliberate choice. The previous
 * version stamped today's date on all forty-odd URLs on every build, which
 * says every page changed today, every day, forever — a claim that is false
 * and that a crawler learns to ignore. Google's own guidance is that it reads
 * `lastmod` only while it keeps proving accurate, so a sitemap that lies about
 * it ends up with no lastmod signal at all, which is the thing the field was
 * there to provide. An absent `lastmod` costs nothing; a wrong one costs the
 * field.
 *
 * The lazy scan is safe because every post object carries exactly one `date`,
 * and it is the next one after the slug.
 */
function extractPosts(file) {
  const src = readFileSync(resolve(root, 'src/data', file), 'utf8')
  const re = /slug:\s*['"]([^'"]+)['"][\s\S]*?date:\s*['"]([^'"]+)['"]/g
  const out = []
  let m
  while ((m = re.exec(src))) out.push({ slug: m[1], date: m[2] })
  return out
}

const features = extractKeys('features.ts', 'slug')
const posts = extractPosts('posts.ts')
const jobs = extractKeys('jobs.ts', 'id')

/* `settings` is a real page — it walks through every switch in the app — and
   `characters` is a real page too, with a section per theme pack. Both were
   missing from this list, which meant two of the more linkable pages on the
   site were only discoverable by following the footer. */
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
  ['/characters', 0.7],
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
  ['/settings', 0.5],
  ['/community', 0.6],
  ['/support', 0.5],
  ['/contact', 0.6],
]

const urls = [
  ...staticRoutes.map(([loc, pr]) => ({ loc, pr })),
  ...features.map((s) => ({ loc: `/features/${s}`, pr: 0.6 })),
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, pr: 0.5, lastmod: p.date })),
  ...jobs.map((id) => ({ loc: `/careers/${id}`, pr: 0.4 })),
]

const body = urls
  .map(({ loc, pr, lastmod }) => {
    const lines = [`    <loc>${BASE}${loc}</loc>`]
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`)
    lines.push(`    <priority>${pr.toFixed(1)}</priority>`)
    return `  <url>\n${lines.join('\n')}\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`✓ sitemap.xml written with ${urls.length} URLs`)
