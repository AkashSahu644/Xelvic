/**
 * One route's head, and one route's no-JavaScript body.
 *
 * Two things read this: `scripts/prerender.mjs`, which writes a real file per
 * route into `dist/` and is what production serves, and the dev-server plugin
 * in `vite.config.ts`, which swaps the head on the HTML Vite serves so a local
 * link preview matches. They call the same functions so that what you see
 * while iterating is the thing that ships, rather than a different document
 * that merely looks like it.
 *
 * Three rules the head has to keep, each learned the hard way:
 *
 *   1. The head is written from `src/seo/routes.ts` and nothing else. The same
 *      table drives `useSEO` in the browser, so a crawler that runs no
 *      JavaScript and a reader who does are told the same thing.
 *
 *   2. Nothing here may claim anything the page does not also say in words.
 *
 *   3. The shell in `index.html` must not contain a *tag* inside an HTML
 *      comment. A share-link scraper looks for the first `<title>` in the
 *      document, and it does not care that this one is inside a comment: the
 *      card that came out of it read "below with the whole route block for
 *      every route in that table". `prepareShell` strips every comment before
 *      it goes looking for slots, and the assertions at the end of it refuse to
 *      produce a document with two titles in it.
 */

/** Escape for HTML text and attribute contexts. */
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const ROBOTS_INDEX =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

/** One `<script type="application/ld+json">`, pretty-printed like the rest. */
const ldScript = (data, marker) =>
  `<script type="application/ld+json" data-seo="${marker}">\n${JSON.stringify(data, null, 2)}\n    </script>`

/* ── Head ─────────────────────────────────────────────────────────────────── */

export function headFor(r, seo) {
  const { site } = seo
  const abs = (path) => `${site.url}${path === '/' ? '/' : path}`
  const canonical = abs(r.path)
  const image = `${site.url}${r.image}`
  const robots = r.noindex ? 'noindex, nofollow' : ROBOTS_INDEX

  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
  ]

  /* A page that is deliberately out of the index does not get to name a
     canonical URL — that is a request to be indexed under another name, which
     is the opposite of what `noindex` says. */
  if (!r.noindex) {
    tags.push(
      `<link rel="canonical" href="${canonical}" />`,
      /* One language, so the alternates point at the same URL. They are
         emitted anyway: a hreflang set that names the only version there is
         costs nothing and stops a crawler guessing from a `?lang=` it
         invented. */
      `<link rel="alternate" hreflang="en" href="${canonical}" />`,
      `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    )
  }

  tags.push(
    `<meta name="robots" content="${robots}" />`,
    '',
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${r.type}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(r.imageAlt)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
  )

  if (r.type === 'article') {
    if (r.published) tags.push(`<meta property="article:published_time" content="${r.published}" />`)
    if (r.lastmod) tags.push(`<meta property="article:modified_time" content="${r.lastmod}" />`)
    if (r.author) tags.push(`<meta property="article:author" content="${esc(r.author)}" />`)
    if (r.section) tags.push(`<meta property="article:section" content="${esc(r.section)}" />`)
  }

  tags.push(
    '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${esc(site.twitter)}" />`,
    `<meta name="twitter:creator" content="${esc(site.twitter)}" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(r.imageAlt)}" />`,
    '',
    /* One complete graph, in the one document a bot that does not run
       JavaScript is certain to receive: the company, the site and the app,
       then this page's own nodes. `data-seo="route"` is the same marker
       useSEO puts on the script it writes at runtime, so when React mounts it
       takes this one out and puts its identical twin back rather than leaving
       two descriptions of the same page in the head. */
    ldScript({ '@context': 'https://schema.org', '@graph': seo.fullNodes(r) }, 'route'),
  )

  return tags.map((t) => (t ? `    ${t}` : '')).join('\n')
}

/* ── The no-JavaScript fallback ───────────────────────────────────────────── */

const P = 'font-size:1.05rem;margin:0 0 1.25rem'
const H2 = 'font-size:1.15rem;margin:1.75rem 0 0.5rem'
const UL = 'margin:0;padding-left:1.15rem'

const NEXT_LINKS = [
  ['/features', 'All features'],
  ['/how-it-works', 'How it works'],
  ['/download', 'Download Xelvic'],
  ['/help', 'Help Center'],
  ['/about', 'About us'],
  ['/contact', 'Contact'],
]

const HOME_BULLETS = [
  ['Chat', 'one-to-one and group messaging with channels, voice notes, media, documents and an offline outbox.'],
  ['Voice &amp; video calls', 'peer-to-peer over WebRTC, with encrypted media and a full call history.'],
  ['Moments &amp; Memories', 'posts with text, polls and music that last 24 hours, then file themselves away.'],
  ['Live &amp; Rooms', 'go live by camera or text, or open an audio room and hand out the microphones.'],
  ['Drops &amp; Vibes', 'photo posts and short-video reels, with feels and private notes on each one.'],
  ['Audio &amp; music', 'charts, playlists, offline saving, and sharing a track straight into a chat.'],
  ['Themes &amp; Drip', '50+ themes that restyle the whole app, chat wallpapers, and wearables for your profile.'],
  ['Sparks', 'a streak for every day two people actually talk.'],
  ['Private Vault', 'an encrypted, code-locked space for the conversations you want out of the way.'],
]

/** Body copy that only exists for some routes, always taken from the data the
 *  page itself renders — never written a second time for the crawler. */
function extrasFor(r, seo) {
  if (r.path === '/') {
    return `
        <h2 style="${H2}">What it does</h2>
        <ul style="${UL}">
${HOME_BULLETS.map(([k, v]) => `          <li><strong>${k}</strong> — ${v}</li>`).join('\n')}
        </ul>

        <h2 style="${H2}">The essentials</h2>
        <ul style="${UL}">
          <li>Free to use. Sparks are spent on cosmetic themes and looks, never on features.</li>
          <li>Available on iOS, Android and any modern browser. Minimum age 13.</li>
          <li>Contacts are matched on your device — your address book is never uploaded.</li>
        </ul>`
  }

  const slug = r.path.split('/').pop() ?? ''

  if (r.path.startsWith('/features/')) {
    const feature = seo.features.find((f) => f.slug === slug)
    const guide = seo.featureGuides[slug]
    if (!feature) return ''
    return `
        <p style="${P}"><em>${esc(feature.tagline)}</em></p>

        <h2 style="${H2}">What it does</h2>
        <ul style="${UL}">
${feature.points.map((p) => `          <li><strong>${esc(p.title)}</strong> — ${esc(p.body)}</li>`).join('\n')}
        </ul>
${
  guide
    ? `
        <h2 style="${H2}">Where to tap</h2>
        <ol style="${UL}">
${guide.steps.map((s) => `          <li><strong>${esc(s.tap)}</strong> — ${esc(s.detail)}</li>`).join('\n')}
        </ol>

        <h2 style="${H2}">Worth knowing</h2>
        <ul style="${UL}">
${guide.tips.map((t) => `          <li>${esc(t)}</li>`).join('\n')}
        </ul>`
    : ''
}`
  }

  if (r.type === 'article') {
    const post = seo.posts.find((p) => p.slug === slug)
    if (!post) return ''
    return `
        <p style="${P}">${esc(post.author)} · ${esc(post.date)} · ${esc(post.readTime)} read</p>
${post.body.map((para) => `        <p style="${P}">${esc(para)}</p>`).join('\n')}`
  }

  if (r.path.startsWith('/careers/')) {
    const job = seo.jobs.find((j) => j.id === slug)
    if (!job) return ''
    return `
        <h2 style="${H2}">What you would do</h2>
        <ul style="${UL}">
${job.responsibilities.map((x) => `          <li>${esc(x)}</li>`).join('\n')}
        </ul>

        <h2 style="${H2}">What we are looking for</h2>
        <ul style="${UL}">
${job.requirements.map((x) => `          <li>${esc(x)}</li>`).join('\n')}
        </ul>`
  }

  if (r.path === '/characters') {
    return `
        <h2 style="${H2}">The cast</h2>
        <ul style="${UL}">
${seo.cast.map((c) => `          <li><strong>${esc(c.name)}</strong> — ${esc(c.note)}</li>`).join('\n')}
        </ul>

        <h2 style="${H2}">The three global poses</h2>
        <ul style="${UL}">
${seo.poses.map((p) => `          <li><strong>${esc(p.label)}</strong> — ${esc(p.role)}. ${esc(p.detail)}</li>`).join('\n')}
        </ul>`
  }

  if (r.path === '/features') {
    return `
        <h2 style="${H2}">Every feature</h2>
        <ul style="${UL}">
${seo.features
  .map(
    (f) =>
      `          <li><a href="/features/${esc(f.slug)}"><strong>${esc(f.name)}</strong></a> — ${esc(f.blurb)}</li>`,
  )
  .join('\n')}
        </ul>`
  }

  if (r.path === '/how-it-works') {
    return `
        <h2 style="${H2}">The five steps</h2>
        <ol style="${UL}">
${seo.gettingStarted
  .map(
    (s) =>
      `          <li><strong>${esc(s.title)}</strong> — ${esc(s.body)} In the app: ${esc(s.taps.join(' → '))}.</li>`,
  )
  .join('\n')}
        </ol>`
  }

  if (r.path === '/help') {
    return `
${seo.faqCategories
  .map(
    (c) => `
        <h2 style="${H2}">${esc(c.title)}</h2>
${c.faqs.map((f) => `        <p style="${P}"><strong>${esc(f.q)}</strong><br />${esc(f.a)}</p>`).join('\n')}`,
  )
  .join('\n')}`
  }

  if (r.path === '/download') {
    return `
        <h2 style="${H2}">Questions people ask before installing</h2>
${seo.downloadFaqs
  .map((f) => `        <p style="${P}"><strong>${esc(f.q)}</strong><br />${esc(f.a)}</p>`)
  .join('\n')}`
  }

  if (r.path === '/contact') {
    return `
        <h2 style="${H2}">Nine addresses, and what each is for</h2>
        <ul style="${UL}">
${seo.doors
  .map(
    (d) =>
      `          <li><strong>${esc(d.k)}</strong> — <a href="mailto:${esc(d.address)}">${esc(d.address)}</a>. ${esc(d.d)} ${esc(d.when)}.</li>`,
  )
  .join('\n')}
        </ul>`
  }

  if (r.path === '/creators') {
    return `
        <h2 style="${H2}">Creator tools</h2>
        <ul style="${UL}">
${seo.creatorTools.map((t) => `          <li><strong>${esc(t.title)}</strong> — ${esc(t.body)}</li>`).join('\n')}
        </ul>

        <h2 style="${H2}">How a brand deal works</h2>
        <ol style="${UL}">
${seo.dealSteps.map((s) => `          <li><strong>${esc(s.t)}</strong> — ${esc(s.d)}</li>`).join('\n')}
        </ol>`
  }

  if (r.path === '/developers') {
    return `
        <h2 style="${H2}">Deep link reference</h2>
        <ul style="${UL}">
${seo.deepLinks.map((l) => `          <li><code>${esc(l.path)}</code> — ${esc(l.desc)}</li>`).join('\n')}
        </ul>`
  }

  return ''
}

function nextLinksFor(r, seo) {
  const slug = r.path.split('/').pop() ?? ''
  if (r.path.startsWith('/features/')) {
    return seo.features.filter((f) => f.slug !== slug).map((f) => [`/features/${f.slug}`, f.name])
  }
  if (r.type === 'article') {
    return seo.posts.filter((p) => p.slug !== slug).map((p) => [`/blog/${p.slug}`, p.title])
  }
  return NEXT_LINKS
}

export function noscriptFor(r, seo) {
  const trail = r.breadcrumbs
    .map((b, i) =>
      i === r.breadcrumbs.length - 1 ? esc(b.name) : `<a href="${b.path}">${esc(b.name)}</a>`,
    )
    .join(' › ')

  const next = nextLinksFor(r, seo)
    .map(([path, label]) => `          <li><a href="${path}">${esc(label)}</a></li>`)
    .join('\n')

  return `    <noscript>
      <div style="max-width:44rem;margin:0 auto;padding:2rem 1.25rem 4rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.65;color:#3a0a24">
        <p style="font-size:0.9rem;margin:0 0 1rem;opacity:0.7">${trail}</p>
        <h1 style="font-size:1.9rem;line-height:1.15;margin:0 0 0.5rem">${esc(r.ld.name)}</h1>
        <p style="${P}">${esc(r.description)}</p>${extrasFor(r, seo)}

        <h2 style="${H2}">Where to go next</h2>
        <ul style="${UL}">
${next}
        </ul>

        <p style="margin:1.75rem 0 0;font-size:0.95rem">
          Xelvic is on <a href="/download">iOS, Android</a> and the web. Signing in to an existing
          account: <a href="${seo.site.web}">web.xelvic.com</a>
        </p>
      </div>
    </noscript>`
}

/* ── The shell ────────────────────────────────────────────────────────────── */

/* A page that is not in the table. Hosts that have a 404 document serve it
   instead of the home page for a URL that does not exist, which is the
   difference between "no such page, here is where to look" and the home page
   pretending to be it. */
export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found — Xelvic',
  description:
    'That page is not here. The features, the download, the Help Center and the rest of xelvic.com are one tap away.',
  image: '/og/home.png',
  imageAlt: 'Xelvic — Chat. Call. Vibe.',
  type: 'website',
  noindex: true,
  breadcrumbs: [{ name: 'Home', path: '/' }],
  ld: { name: 'Page not found', description: 'That page is not here.' },
  priority: 0,
}

/**
 * Turn `index.html` into a template with two slots in it.
 *
 * Comments go first, and that is the whole point of doing it in this order: the
 * shell's own explanatory comments have always mentioned the tags they are
 * talking about, and a regex looking for the first `<title>` finds the one in
 * the prose. Stripping comments up front means the only `<title>` left is the
 * real one.
 *
 * Route-specific tags left in the shell are then deleted rather than trusted,
 * because a crawler reads the first of a duplicated pair.
 */
export function prepareShell(template) {
  const shell = String(template)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, '<!-- @seo-head -->')
    .replace(/<noscript>[\s\S]*?<\/noscript>/, '<!-- @seo-noscript -->')
    .replace(/^\s*<meta\s+name="description"[\s\S]*?\/>\s*$/m, '')
    .replace(/^\s*<link\s+rel="canonical"[\s\S]*?\/>\s*$/gm, '')
    .replace(/^\s*<link\s+rel="alternate"[\s\S]*?\/>\s*$/gm, '')
    .replace(/^\s*<meta\s+name="robots"[\s\S]*?\/>\s*$/m, '')
    .replace(/^\s*<meta\s+property="og:[\s\S]*?\/>\s*$/gm, '')
    .replace(/^\s*<meta\s+name="twitter:[\s\S]*?\/>\s*$/gm, '')
    .replace(/^\s*<script type="application\/ld\+json"[\s\S]*?<\/script>\s*$/m, '')

  if (!shell.includes('@seo-head')) {
    throw new Error('index.html has no <title> to replace — has it been edited?')
  }
  if (!shell.includes('@seo-noscript')) {
    throw new Error('index.html has no <noscript> to replace — has it been edited?')
  }
  return shell
}

/**
 * The whole document for one route.
 *
 * Both replacements pass a function rather than a string. A string replacement
 * is not inserted literally: `$&`, `` $` ``, `$'` and `$$` are read as
 * backreferences to the match. `esc` escapes `<`, `>` and `&` but has no reason
 * to touch a dollar sign, so a description that ever said "$&" would quietly
 * splice the placeholder comment into the middle of the head. A function skips
 * that parsing entirely.
 */
export function htmlFor(shell, r, seo) {
  return shell
    .replace('<!-- @seo-head -->', () => headFor(r, seo))
    .replace('<!-- @seo-noscript -->', () => noscriptFor(r, seo))
}

/**
 * Refuse to hand back a document that describes itself twice.
 *
 * Every one of these would be a silent failure: the page renders, the card
 * renders, and one of the two titles is simply the wrong one. A build that
 * stops is easier to fix than a preview that is quietly wrong, which is how the
 * `<!-- <title> -->` bug survived long enough to be reported from a phone.
 */
export function assertSingleHead(html, label) {
  const count = (re) => html.match(re)?.length ?? 0

  const titles = count(/<title>/g)
  const descriptions = count(/<meta name="description"/g)
  const canonicals = count(/<link rel="canonical"/g)
  const ogTitles = count(/<meta property="og:title"/g)
  const ogImages = count(/<meta property="og:image" /g)
  const twitterCards = count(/<meta name="twitter:card"/g)

  if (titles !== 1) throw new Error(`${label}: expected one <title>, found ${titles}`)
  if (descriptions !== 1) {
    throw new Error(`${label}: expected one meta description, found ${descriptions}`)
  }
  if (canonicals > 1) throw new Error(`${label}: expected at most one canonical, found ${canonicals}`)
  /* A duplicated pair is read as the first of the pair, so a leftover tag from
     the shell wins over the route's own. Counting them is what turns "the card
     is subtly wrong" into a build that stops. */
  if (ogTitles !== 1) throw new Error(`${label}: expected one og:title, found ${ogTitles}`)
  if (ogImages !== 1) throw new Error(`${label}: expected one og:image, found ${ogImages}`)
  if (twitterCards !== 1) {
    throw new Error(`${label}: expected one twitter:card, found ${twitterCards}`)
  }
  return html
}
