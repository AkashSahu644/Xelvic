/**
 * The structured-data side of the route table.
 *
 * Kept in its own module so `src/seo/routes.ts` stays pure data. Both sides of
 * the build read this: the pages render these nodes at runtime, and
 * `scripts/prerender.mjs` bakes the identical nodes into each route's static
 * HTML. A page that has something extra to say — an FAQ, a list of the cast, a
 * contact page's departments — has it added in `routeExtras` below, from the
 * data module the page itself renders, rather than writing a second WebPage by
 * hand and hoping the two agree on an `@id`.
 *
 * Every graph carries `baseNodes` as well, so a page is complete on its own.
 * That matters because the prerendered HTML is parsed by bots that never run
 * the bundle: whatever is in that one document is the whole story they get.
 */
import {
  articleLd,
  contactPageLd,
  faqLd,
  graph,
  howToLd,
  itemListLd,
  jobPostingLd,
  organizationLd,
  softwareApplicationLd,
  webPageLd,
  webSiteLd,
} from '../data/jsonld'
import { features, featureGuides } from '../data/features'
import { posts } from '../data/posts'
import { jobs } from '../data/jobs'
import { cast } from '../data/characters'
import { faqCategories } from '../data/faq'
import { downloadFaqs } from '../data/downloadFaq'
import { doors } from '../data/contact'
import { deepLinks, developerFaqs } from '../data/developers'
import { creatorTools, creatorFaqs, dealSteps } from '../data/creators'
import { gettingStarted } from '../data/gettingStarted'
import { routeSeo, type RouteSeo } from './routes'

type Json = Record<string, unknown>

/** The WebPage node for a route, with its breadcrumb trail attached. */
export const pageNode = (r: RouteSeo) =>
  webPageLd({
    name: r.ld.name,
    description: r.ld.description,
    path: r.path,
    type: r.ld.type,
    image: r.image,
    ...(r.published ? { datePublished: r.published } : {}),
    dateModified: r.lastmod,
    breadcrumbs: r.breadcrumbs,
  })

/** Company, site and app — the three nodes every page hangs off. */
export const baseNodes = (): Json[] => [
  organizationLd(),
  webSiteLd(),
  softwareApplicationLd(),
]

/**
 * The nodes only some pages have: the feature tour, the deep-link table, the
 * two lists on the Creator page, the cast, the three sets of questions, the
 * nine inboxes and the getting-started walkthrough.
 *
 * These were once built inside the pages, which meant they were in the head a
 * browser rendered and missing from the HTML a crawler fetched — the same split
 * that made every route share one link preview. They live here instead, sourced
 * from `src/data`, so `useSEO` and `scripts/prerender.mjs` emit the identical
 * node from the identical array.
 */
export function routeExtras(r: RouteSeo): Json[] {
  switch (r.path) {
    case '/features':
      return [
        itemListLd({
          name: 'Xelvic features',
          path: '/features',
          items: features.map((f) => ({
            name: f.name,
            path: `/features/${f.slug}`,
            description: f.blurb,
          })),
        }),
      ]

    case '/developers':
      /* `path` is deliberately not passed on these items: the values are URI
         schemes, not site paths, and itemListLd would resolve them against the
         marketing origin. They travel as names instead. */
      return [
        itemListLd({
          name: 'Xelvic deep link reference',
          path: '/developers',
          items: deepLinks.map((l) => ({ name: l.path, description: l.desc })),
        }),
        faqLd(developerFaqs),
      ]

    case '/creators':
      return [
        itemListLd({
          name: 'Creator tools in Xelvic',
          path: '/creators',
          items: creatorTools.map((t) => ({ name: t.title, description: t.body })),
        }),
        howToLd({
          name: 'How a Xelvic brand deal works',
          description:
            'From the invitation to the payout: the four steps of a paid collaboration on Xelvic, where payment is released only after the brand approves the deliverable.',
          path: '/creators',
          steps: dealSteps.map((s) => ({ name: `${s.n}. ${s.t}`, text: s.d })),
        }),
        faqLd(creatorFaqs),
      ]

    case '/features/themes':
      /* Themes & Drip and The Cast are one page, so the cast list ships with
         the theme route rather than an extra /characters document. */
      return [
        itemListLd({
          name: 'The Xelvic cast',
          path: '/features/themes',
          items: cast.map((c) => ({ name: c.name, description: c.note })),
        }),
      ]

    case '/contact':
      return [
        contactPageLd({
          path: '/contact',
          departments: doors.map((d) => ({ name: d.k, email: d.address, note: d.d })),
        }),
      ]

    case '/help':
      return [faqLd(faqCategories.flatMap((c) => c.faqs))]

    case '/download':
      return [faqLd(downloadFaqs)]

    case '/how-it-works':
      return [
        howToLd({
          name: 'How to get started on Xelvic',
          description:
            'Five steps from downloading Xelvic to going live with your friends, with the exact taps at each one.',
          path: '/how-it-works',
          totalTime: 'PT5M',
          tools: ['Xelvic for Android and iOS'],
          steps: gettingStarted.map((s) => ({
            name: s.title,
            text: `${s.body} In the app: ${s.taps.join(' → ')}.`,
          })),
        }),
      ]

    default:
      return []
  }
}

/** The article, job posting or HowTo a route's own data already spells out. */
function derivedNodes(r: RouteSeo): Json[] {
  const nodes: Json[] = []
  const slug = r.path.split('/').pop() ?? ''

  if (r.type === 'article') {
    const post = posts.find((p) => p.slug === slug)
    if (post) {
      nodes.push(
        articleLd({
          title: post.title,
          description: post.excerpt,
          path: r.path,
          image: r.image,
          datePublished: post.date,
          author: post.author,
          section: post.category,
          wordCount: [post.body, ...(post.sections ?? []).map((s) => s.body)]
            .flat()
            .join(' ')
            .split(/\s+/).length,
        }),
      )
    }
  }

  if (r.path.startsWith('/careers/')) {
    const job = jobs.find((j) => j.id === slug)
    if (job) {
      nodes.push(
        jobPostingLd({
          path: r.path,
          title: job.title,
          description: `${job.summary} Responsibilities: ${job.responsibilities.join(' ')} Requirements: ${job.requirements.join(' ')}`,
          employmentType: job.type,
          location: job.location,
          datePosted: job.datePosted,
          team: job.team,
        }),
      )
    }
  }

  if (r.path.startsWith('/features/')) {
    const feature = features.find((f) => f.slug === slug)
    const guide = featureGuides[slug]
    /* Every feature page gets a HowTo built from its own guide. "How do I send
       a voice note" and "how do I start a group call" are the questions people
       actually type, and the answer is already written on the page as a list
       of taps — this just says so in a shape an answer engine can read without
       parsing the layout. Only added when a guide exists, so a feature without
       one emits no empty steps. */
    if (feature && guide) {
      nodes.push(
        howToLd({
          name: `How to use ${feature.name} in Xelvic`,
          description: `${feature.tagline} — where to tap, step by step.`,
          path: r.path,
          totalTime: 'PT2M',
          tools: ['Xelvic for Android and iOS'],
          steps: guide.steps.map((s) => ({ name: s.tap, text: s.detail })),
        }),
      )
    }
  }

  return nodes
}

/**
 * Everything a route can be described by without reading the page body: its
 * WebPage, whatever only this page has to add, and the article, job posting or
 * HowTo that its data already spells out in full.
 */
export function routeNodes(r: RouteSeo): Json[] {
  return [pageNode(r), ...routeExtras(r), ...derivedNodes(r)]
}

/** Everything a route says about itself: the shared nodes, then its own. */
export const fullNodes = (r: RouteSeo): Json[] => [...baseNodes(), ...routeNodes(r)]

/** The graph a route gets when it has nothing extra to say. */
export function routeGraph(r: RouteSeo): Json {
  return graph(...fullNodes(r))
}

/** Same, looked up by path. Undefined for a path that is not a real route. */
export function pageGraph(path: string): Json | undefined {
  const r = routeSeo(path)
  return r ? routeGraph(r) : undefined
}
