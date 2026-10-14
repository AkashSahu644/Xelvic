/**
 * Generates public/sitemap.xml from `src/seo/routes.ts`.
 * Run with: npm run gen:sitemap  (also runs automatically before build)
 *
 * The URL list used to be assembled here by regex-scraping slugs and IDs out
 * of the data files, which meant the sitemap could — and did — fall behind:
 * `settings` and `characters` were real pages that only the footer linked to,
 * because nobody had added them to a second list. It reads the route table
 * now, so a route that exists is in the sitemap and a route that is in the
 * sitemap exists. There is no third list to forget.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadSeo, root } from './lib/seo-bundle.mjs'

const seo = await loadSeo()
const { site, sitemapRoutes, ogImageFor } = seo

/**
 * `lastmod` is only emitted where it is a real date.
 *
 * Blog posts carry one, so they get one. Everything else gets none, and that
 * is deliberate: an earlier version of this file stamped today's date on all
 * forty-odd URLs on every build, which says every page changed today, every
 * day, forever. Google reads `lastmod` only while it keeps proving accurate,
 * so a sitemap that lies about it ends up with no `lastmod` signal at all,
 * which is the thing the field was there to provide. An absent `lastmod` costs
 * nothing; a wrong one costs the field.
 */
const urls = sitemapRoutes().filter((r) => !r.noindex)

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const body = urls
  .map((r) => {
    const loc = `${site.url}${r.path === '/' ? '/' : r.path}`
    const lines = [`    <loc>${escapeXml(loc)}</loc>`]
    if (r.lastmod) lines.push(`    <lastmod>${r.lastmod}</lastmod>`)
    /* The share card is a real, indexable picture of the page and it is
       already generated at 1200×630 — telling the crawler about it is what
       gets the card into a visual result instead of a bare link. */
    lines.push(
      `    <image:image>`,
      `      <image:loc>${escapeXml(`${site.url}${ogImageFor(r.path)}`)}</image:loc>`,
      `      <image:title>${escapeXml(r.title)}</image:title>`,
      `    </image:image>`,
    )
    lines.push(`    <priority>${r.priority.toFixed(1)}</priority>`)
    return `  <url>\n${lines.join('\n')}\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`✓ sitemap.xml written with ${urls.length} URLs`)
