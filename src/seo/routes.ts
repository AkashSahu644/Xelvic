/**
 * Every route's SEO, in one place.
 *
 * This module is the single source of truth for what a Xelvic URL says about
 * itself, and it exists because there used to be two answers to that question
 * and they never quite agreed.
 *
 * The first answer was `index.html`: one set of `<title>`/`og:*` tags for the
 * whole site. The site is a client-rendered React app, so a crawler that does
 * not execute JavaScript — WhatsApp, Slack, iMessage, Discord, and most of the
 * AI answer engines — only ever saw that one document no matter which URL was
 * pasted. Every route shared a card, and the card was always the home page's.
 *
 * The second answer was `useSEO` in each page: correct, per-route, and
 * invisible to anything that did not run the bundle.
 *
 * So the tags moved here. `scripts/prerender.mjs` reads this table at build
 * time and bakes one real HTML file per route, and `useSEO` reads the same
 * table at runtime, which means the document a crawler fetches and the
 * document a browser renders cannot drift apart — there is only one of them.
 *
 * Rules this file follows, because breaking either one is worse than having no
 * SEO at all:
 *   1. Nothing here may claim something the page does not also say in words.
 *   2. A description is written for a person deciding whether to tap, not for
 *      a keyword counter. The feature names (chat, calls, Moments, live rooms,
 *      Drops, Vibes, Sparks, the Vault) appear because those are the words
 *      people actually use for them.
 */
import { features } from '../data/features'
import { posts } from '../data/posts'
import { jobs } from '../data/jobs'
import { site } from '../data/site'

export type Breadcrumb = { name: string; path: string }

export type RouteSeo = {
  /** Canonical path, no trailing slash. `'/'` for the home page. */
  path: string
  /** `<title>` and `og:title`. Always carries the brand. */
  title: string
  /** `<meta name="description">` and `og:description`. */
  description: string
  /** Site-relative 1200×630 share card, generated into /public/og. */
  image: string
  imageAlt: string
  type: 'website' | 'article'
  noindex: boolean
  breadcrumbs: Breadcrumb[]
  /**
   * The WebPage node, kept apart from the meta tags on purpose: a page is
   * allowed to name itself more fully in structured data than it can inside a
   * 160-character description.
   */
  ld: { name: string; description: string; type?: string }
  /** Overrides for the generated share card. Anything left out is derived. */
  card?: { kicker?: string; headline?: string; sub?: string }
  /** Sitemap priority. */
  priority: number
  /** Articles only — the one signal worth putting a real `lastmod` behind. */
  lastmod?: string
  published?: string
  author?: string
  section?: string
}

/** `/features/chat` → `/og/features-chat.png`; `/` → `/og/home.png`. */
export const ogImageFor = (path: string): string =>
  `/og/${path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-')}.png`

const HOME: Breadcrumb = { name: 'Home', path: '/' }

/**
 * Alt text for a share card.
 *
 * `ld.name` already carries the brand on some routes — the home page's name
 * *is* the tagged title — so the brand and the tagline are only appended where
 * they are not already present. Without that, the home card's alt text read
 * "Xelvic — Chat, Spark, Vibe & more — Xelvic: Chat, Spark, Vibe & more", which
 * describes the card to somebody who cannot see it by saying the same thing
 * three times.
 */
function imageAltFor(name: string): string {
  const branded = name.includes(site.name) ? name : `${name} — ${site.name}`
  return branded.includes(site.tagline) ? branded : `${branded}: ${site.tagline}`
}

/** Fill in everything a route does not say for itself. */
function route(r: {
  path: string
  title: string
  description: string
  ld?: Partial<RouteSeo['ld']> & { name: string }
  breadcrumbs: Breadcrumb[]
  type?: 'website' | 'article'
  noindex?: boolean
  priority?: number
  lastmod?: string
  published?: string
  author?: string
  section?: string
  card?: RouteSeo['card']
}): RouteSeo {
  const ld = {
    name: r.ld?.name ?? r.title,
    description: r.ld?.description ?? r.description,
    ...(r.ld?.type ? { type: r.ld.type } : {}),
  }
  return {
    path: r.path,
    title: r.title,
    description: r.description,
    image: ogImageFor(r.path),
    imageAlt: imageAltFor(ld.name),
    type: r.type ?? 'website',
    noindex: r.noindex ?? false,
    breadcrumbs: r.breadcrumbs,
    ld,
    card: r.card,
    priority: r.priority ?? 0.5,
    lastmod: r.lastmod,
    published: r.published,
    author: r.author,
    section: r.section,
  }
}

/* ── The pages that are always there ──────────────────────────────────────── */

const statics: RouteSeo[] = [
  route({
    path: '/',
    title: 'Xelvic — Chat, Spark, Vibe & more',
    description:
      'Xelvic is a free app for chat, Sparks, Moments, live rooms, Drops & Vibes, short video, music and 33 themes — one place for the people you talk to every day.',
    ld: {
      name: 'Xelvic — Chat, Spark, Vibe & more',
      description:
        'One app for the people you talk to every day: chat and group messaging, Sparks, Moments, live rooms, Drops and Vibes, short video, music, 33 themes and a private, encrypted Vault.',
      type: 'WebPage',
    },
    breadcrumbs: [HOME],
    priority: 1.0,
    card: {
      kicker: 'Free on iOS, Android & the web',
      headline: 'Chat, Spark, Vibe & more',
      sub: 'Chat, Sparks, Moments, live rooms, Drops & Vibes, short video, music and 33 themes — one place for the people you talk to every day.',
    },
  }),
  route({
    path: '/features',
    title: 'Features — Xelvic',
    description:
      'Everything Xelvic can do: chat and group messaging, voice and video calls, Moments, live rooms, Drops and Vibes, short video, music, 33 themes, Sparks and the Vault.',
    ld: {
      name: 'Xelvic features',
      description:
        'The complete tour of Xelvic: chat and group messaging, voice and video calls, Moments and Memories, live rooms, Drops and Vibes, audio and music, themes, Sparks and the Private Vault.',
    },
    breadcrumbs: [HOME, { name: 'Features', path: '/features' }],
    priority: 0.9,
    card: { kicker: 'Features', headline: 'Everything Xelvic can do' },
  }),
  route({
    path: '/how-it-works',
    title: 'How it works — Xelvic',
    description:
      'From your first hello to going live: the five steps to set up Xelvic — create an account, find your people, start a chat or a call, post a Drop, and make it yours.',
    ld: {
      name: 'How Xelvic works',
      description:
        'Five steps from installing Xelvic to going live with your friends — create an account, find your people, start talking, share your day, and make the app yours.',
    },
    breadcrumbs: [HOME, { name: 'How it works', path: '/how-it-works' }],
    priority: 0.8,
  }),
  route({
    path: '/whats-new',
    title: "What's New — Xelvic",
    description:
      'The Spark that counts the days two people talk, feeling and noting a Vibe, a Drop or a track without leaving the chat — everything new in Xelvic, explained in full.',
    ld: {
      name: "What's new in Xelvic",
      description:
        'The spark that counts the days two people talk, feeling and noting a Vibe, a Drop or a track without leaving the chat — everything new in Xelvic, explained in full.',
    },
    breadcrumbs: [HOME, { name: "What's New", path: '/whats-new' }],
    priority: 0.8,
  }),
  route({
    path: '/explore',
    title: 'Explore — Xelvic',
    description:
      'See what people are doing on Xelvic right now — live rooms, Moments, Drops, Vibes and trending audio, with interactive previews of the app itself.',
    ld: {
      name: 'Explore Xelvic',
      description:
        'Live rooms, fresh Moments, trending audio and endless Drops and Vibes — a taste of what people are doing on Xelvic, with live interactive previews of the app.',
    },
    breadcrumbs: [HOME, { name: 'Explore', path: '/explore' }],
    priority: 0.7,
  }),
  route({
    path: '/overview',
    title: 'Overview — Xelvic',
    description:
      'The big picture: what Xelvic is and everything it brings together — chat, calls, Moments, live rooms, Drops and Vibes, music, Sparks and creators.',
    ld: {
      name: 'Xelvic at a glance',
      description:
        'Xelvic brings chat, calling, Moments, live audio, Drops and Vibes, a social feed, music and a creator economy into a single home.',
    },
    breadcrumbs: [HOME, { name: 'Overview', path: '/overview' }],
    priority: 0.6,
  }),
  route({
    path: '/download',
    title: 'Download — Xelvic',
    description:
      'Download Xelvic free for Android 8+ and iOS 15+ — what is included, what it needs to run, how to install it in four taps, and how to sign in on the web instead.',
    ld: {
      name: 'Download Xelvic',
      description:
        'Download Xelvic free on Android 8+ and iOS 15+. What is included, what it needs to run, how to install it in four taps, and how to sign in on the web without installing anything.',
    },
    breadcrumbs: [HOME, { name: 'Download', path: '/download' }],
    priority: 0.9,
    card: { kicker: 'Free download', headline: 'Get Xelvic', sub: 'Android 8+ and iOS 15+, or right here in your browser — no install needed.' },
  }),
  route({
    path: '/creators',
    title: 'For Creators — Xelvic',
    description:
      'Grow your audience, collaborate with brands and get paid on Xelvic — professional profiles, Insights, verification and approval-gated brand deals, in the open.',
    ld: { name: 'For Creators — Xelvic' },
    breadcrumbs: [HOME, { name: 'Creators', path: '/creators' }],
    priority: 0.7,
  }),
  route({
    path: '/developers',
    title: 'Developers — Xelvic',
    description:
      'Deep links, the xelvic:// scheme, the Flutter codebase and the WebRTC call stack — how Xelvic is built and how to link into it from your own product.',
    ld: {
      name: 'The Xelvic platform',
      description:
        'Deep links, platform details and how to integrate with Xelvic — the xelvic:// scheme, the Flutter codebase and WebRTC calls.',
    },
    breadcrumbs: [HOME, { name: 'Developers', path: '/developers' }],
    priority: 0.7,
  }),
  route({
    /* The cast is part of Themes & Drip now. This URL stays so old links and
       bookmarks still resolve; the app redirects it to the cast section, and
       the noindex keeps a redirect page out of the sitemap. */
    path: '/characters',
    title: 'The Cast — Xelvic',
    description:
      'The Xelvic cast now lives with Themes & Drip. Every theme ships its own character — meet all 17, plus the three global poses behind the typing indicator and the loading screens.',
    ld: {
      name: 'The Xelvic cast',
      description:
        'Every Xelvic theme ships its own character. The mascot is not one fixed character — it is a cast, and it changes when you change your look.',
    },
    breadcrumbs: [HOME, { name: 'Themes & Drip', path: '/features/themes' }],
    noindex: true,
    priority: 0.1,
  }),
  route({
    path: '/about',
    title: 'About — Xelvic',
    description:
      'Who builds Xelvic, what we decided before we wrote a line of code, how the team works, and the limits we would rather you heard from us.',
    ld: { name: 'About Xelvic' },
    breadcrumbs: [HOME, { name: 'About', path: '/about' }],
    priority: 0.6,
  }),
  route({
    path: '/careers',
    title: 'Careers — Xelvic',
    description:
      'Open roles at Xelvic, the surfaces you would own, how the hiring process actually works, and what the job is like in practice.',
    ld: { name: 'Careers at Xelvic' },
    breadcrumbs: [HOME, { name: 'Careers', path: '/careers' }],
    priority: 0.6,
  }),
  route({
    path: '/blog',
    title: 'Blog — Xelvic',
    description:
      'Stories, updates and behind-the-scenes from the Xelvic team — product news, design deep-dives and the engineering behind chat, calls, Drops and Vibes.',
    ld: {
      name: 'The Xelvic blog',
      description:
        'Product news, design deep-dives and the thinking behind Xelvic, written by the team that builds it.',
    },
    breadcrumbs: [HOME, { name: 'Blog', path: '/blog' }],
    priority: 0.7,
  }),
  route({
    path: '/press',
    title: 'Press — Xelvic',
    description:
      'Company facts, figures from the build, how to describe Xelvic correctly, the release history and how to reach the communications team.',
    ld: { name: 'Xelvic press room' },
    breadcrumbs: [HOME, { name: 'Press', path: '/press' }],
    priority: 0.5,
  }),
  route({
    path: '/brand',
    title: 'Brand Center — Xelvic',
    description:
      'The Xelvic logo files, the colour system and when to use which, the typefaces, how to write the name, and the things we would rather you did not do with the mark.',
    ld: { name: 'Xelvic Brand Center' },
    breadcrumbs: [HOME, { name: 'Brand Center', path: '/brand' }],
    priority: 0.4,
  }),
  route({
    path: '/privacy',
    title: 'Privacy Policy — Xelvic',
    description:
      'What Xelvic collects, how it is used, who can see it, and the control you have — written against the app as it ships.',
    ld: { name: 'Xelvic Privacy Policy' },
    breadcrumbs: [HOME, { name: 'Privacy Policy', path: '/privacy' }],
    priority: 0.4,
  }),
  route({
    path: '/data',
    title: 'Your Data — Xelvic',
    description:
      'What Xelvic does with your data, where it is used, how it is used, and what you and Xelvic can each do with it — in the app’s own words.',
    ld: { name: 'Your data on Xelvic' },
    breadcrumbs: [HOME, { name: 'Your Data', path: '/data' }],
    priority: 0.5,
  }),
  route({
    path: '/terms',
    title: 'Terms of Service — Xelvic',
    description:
      'The agreement between you and Xelvic: your account, your content, acceptable use, takedowns, creator deals, Sparks, and how to leave.',
    ld: { name: 'Xelvic Terms of Service' },
    breadcrumbs: [HOME, { name: 'Terms of Service', path: '/terms' }],
    priority: 0.4,
  }),
  route({
    path: '/security',
    title: 'Security — Xelvic',
    description:
      'How Xelvic protects your conversations, calls and account — encryption, the Vault, password and device rules, and the limits we will not pretend away.',
    ld: { name: 'Security at Xelvic' },
    breadcrumbs: [HOME, { name: 'Security', path: '/security' }],
    priority: 0.5,
  }),
  route({
    path: '/safety',
    title: 'Safety — Xelvic',
    description:
      'Blocking, reporting, the Vault and the controls that keep you in charge — what each one actually does, step by step, including the limits.',
    ld: { name: 'Staying safe on Xelvic' },
    breadcrumbs: [HOME, { name: 'Safety', path: '/safety' }],
    priority: 0.6,
  }),
  /* The two pages the app stores are handed, and they are here rather than only
     in the router for a reason that is not SEO: `prerender.mjs` writes a real
     HTML file per route from this table, so a policy page left out of it is a
     policy page that a crawler and a reviewer both fetch as a blank shell. */
  route({
    path: '/child-safety',
    title: 'Child Safety Standards — Xelvic',
    description:
      'Child sexual abuse material, grooming and any sexual content involving a minor are banned on Xelvic. How to report it, who reads it, and the address that reaches a person the same day.',
    ld: { name: 'Child safety standards at Xelvic' },
    breadcrumbs: [HOME, { name: 'Child safety', path: '/child-safety' }],
    priority: 0.6,
    card: { kicker: 'Child safety' },
  }),
  route({
    path: '/delete-account',
    title: 'Delete your account — Xelvic',
    description:
      'How to delete a Xelvic account from inside the app or by asking us from here — hidden immediately, kept 30 days so you can change your mind, then erased for good.',
    ld: {
      name: 'Deleting your Xelvic account',
      description:
        'The whole of account deletion on Xelvic: the in-app route, the route for when the app is gone, exactly what is removed, the 30-day window, and what to do instead if you want less than a deletion.',
    },
    breadcrumbs: [HOME, { name: 'Delete your account', path: '/delete-account' }],
    priority: 0.6,
    card: { kicker: 'Account' },
  }),
  route({
    path: '/help',
    title: 'Help Center — Xelvic',
    description:
      'Answers and how-tos for getting the most out of Xelvic — sign-up, chat and calls, Moments, Sparks, the Vault, reporting, and how to leave.',
    ld: {
      name: 'Xelvic Help Center',
      description:
        'Answers to the questions people actually ask about Xelvic — sign-up, chat and calls, Moments and Live, Sparks and themes, privacy and safety, and accounts and devices.',
    },
    breadcrumbs: [HOME, { name: 'Help Center', path: '/help' }],
    priority: 0.6,
  }),
  route({
    path: '/settings',
    title: 'Settings — Xelvic',
    description:
      'Every switch in Xelvic Settings: privacy, notifications, appearance, the Vault and every phone on your account — and why each one is there.',
    ld: { name: 'Xelvic Settings, explained' },
    breadcrumbs: [HOME, { name: 'Settings', path: '/settings' }],
    priority: 0.5,
  }),
  route({
    path: '/community',
    title: 'Community — Xelvic',
    description:
      'Circles, Sparks, rooms and creators — how the people on Xelvic find each other, keep a run going, hold a stage and keep the place worth being in.',
    ld: { name: 'The Xelvic community' },
    breadcrumbs: [HOME, { name: 'Community', path: '/community' }],
    priority: 0.6,
  }),
  route({
    path: '/support',
    title: 'Support — Xelvic',
    description:
      'Get help from the Xelvic team — what to try first for the six most common problems, how to reach a person, and where each kind of request should go.',
    ld: { name: 'Xelvic Support' },
    breadcrumbs: [HOME, { name: 'Support', path: '/support' }],
    priority: 0.5,
  }),
  route({
    path: '/contact',
    title: 'Contact — Xelvic',
    description:
      'Every way to reach the Xelvic team, what each address is for, how quickly each one is answered, and what to include so you get a useful reply the first time.',
    ld: { name: 'Contact Xelvic' },
    breadcrumbs: [HOME, { name: 'Contact', path: '/contact' }],
    priority: 0.6,
  }),
]

/* ── The pages that come from data ────────────────────────────────────────── */

const featureRoutes: RouteSeo[] = features.map((f) =>
  route({
    path: `/features/${f.slug}`,
    title: `${f.name} — Xelvic`,
    description: f.blurb,
    ld: { name: `${f.name} — ${f.tagline}`, description: f.blurb },
    breadcrumbs: [
      HOME,
      { name: 'Features', path: '/features' },
      { name: f.name, path: `/features/${f.slug}` },
    ],
    priority: 0.6,
    card: { kicker: 'Features', headline: f.name, sub: f.blurb },
  }),
)

const postRoutes: RouteSeo[] = posts.map((p) =>
  route({
    path: `/blog/${p.slug}`,
    title: `${p.title} — Xelvic Blog`,
    description: p.excerpt,
    ld: { name: p.title, description: p.excerpt },
    breadcrumbs: [
      HOME,
      { name: 'Blog', path: '/blog' },
      { name: p.title, path: `/blog/${p.slug}` },
    ],
    type: 'article',
    priority: 0.5,
    lastmod: p.date,
    published: p.date,
    author: p.author,
    section: p.category,
    card: { kicker: 'Xelvic Blog', headline: p.title, sub: p.excerpt },
  }),
)

const jobRoutes: RouteSeo[] = jobs.map((j) =>
  route({
    path: `/careers/${j.id}`,
    title: `${j.title} — Xelvic Careers`,
    description: j.summary,
    ld: { name: `${j.title} — Xelvic Careers`, description: j.summary },
    breadcrumbs: [
      HOME,
      { name: 'Careers', path: '/careers' },
      { name: j.title, path: `/careers/${j.id}` },
    ],
    priority: 0.4,
    card: { kicker: `${j.team} · ${j.location}`, headline: j.title, sub: j.summary },
  }),
)

/** Every indexable route, home first. */
export const routes: RouteSeo[] = [...statics, ...featureRoutes, ...postRoutes, ...jobRoutes]

const byPath = new Map(routes.map((r) => [r.path, r]))

/** `/about/` and `/about` are the same page; so are `/about` and here. */
const clean = (path: string): string => {
  const trimmed = path.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export const routeSeo = (path: string): RouteSeo | undefined => byPath.get(clean(path))

/** The routes a crawler should be told about, in sitemap order. */
export const sitemapRoutes = (): RouteSeo[] =>
  [...routes].sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path))

/**
 * Where a share card's own copy comes from when the route did not spell it
 * out: the headline is the title with the brand taken off, the kicker is the
 * section it sits under, and the sub-line is the description.
 */
export function cardFor(r: RouteSeo): { kicker: string; headline: string; sub: string } {
  const parent = r.breadcrumbs.length > 1 ? r.breadcrumbs[r.breadcrumbs.length - 2].name : site.name
  return {
    kicker: r.card?.kicker ?? parent,
    headline: r.card?.headline ?? stripBrand(r.title),
    sub: r.card?.sub ?? r.description,
  }
}

/** `'Features — Xelvic'` → `'Features'`. */
export function stripBrand(title: string): string {
  return title
    .replace(new RegExp(`\\s*[—·|]\\s*${site.name}(\\s+(Blog|Careers))?\\s*$`), '')
    .trim()
}
