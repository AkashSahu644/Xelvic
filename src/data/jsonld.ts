// Structured-data (schema.org JSON-LD) builders.
// Keeping these in one place means every page emits consistent, valid markup.
//
// Two rules run through all of it. The first is that nothing here may state
// anything the page does not also state in words: markup that contradicts the
// visible copy is what gets a site a manual action, and it is also what makes
// an answer engine distrust everything else on the domain. The second is that
// the same entity always carries the same `@id`, so Organization, WebSite,
// WebPage and the app all resolve to one graph rather than to four strangers
// who happen to share a name.
import { site, absoluteUrl } from './site'

type Json = Record<string, unknown>

/** The site's own origin, used to build stable node identifiers. */
const ORG_ID = `${site.url}/#organization`
const SITE_ID = `${site.url}/#website`
const APP_ID = `${site.url}/#app`

/** A reference to a node defined elsewhere in the graph. */
const ref = (id: string) => ({ '@id': id })

/** Organization — referenced by @id from other nodes. */
export const organizationLd = (): Json => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  alternateName: 'Xelvic App',
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    '@id': `${site.url}/#logo`,
    url: absoluteUrl('/favicon-512x512.png'),
    contentUrl: absoluteUrl('/favicon-512x512.png'),
    width: 512,
    height: 512,
    caption: site.name,
  },
  image: ref(`${site.url}/#logo`),
  description: site.description,
  slogan: site.tagline,
  email: site.email,
  sameAs: Object.values(site.social),
  /* One contact point per job rather than one generic address. An answer
     engine asked "how do I report a security problem" should be able to find
     the security route without reading the Contact page to guess.

     These strings have to stay identical to the ones on /contact, because a
     schema that names a different address than the page is a schema that lies
     — and a wrong address in structured data is worse than no address, since
     it is the version that gets surfaced. */
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.email,
      url: absoluteUrl('/support'),
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'privacy',
      email: 'privacy@xelvic.app',
      url: absoluteUrl('/data'),
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'security',
      email: 'security@xelvic.app',
      url: absoluteUrl('/security'),
      availableLanguage: ['English'],
    },
  ],
})

/** WebSite node with a sitewide search action. */
export const webSiteLd = (): Json => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: site.name,
  alternateName: `${site.name} — ${site.tagline}`,
  url: site.url,
  description: site.description,
  inLanguage: 'en',
  publisher: ref(ORG_ID),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${site.url}/help?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

/** The Xelvic app itself, for the home page. */
export const softwareApplicationLd = (): Json => ({
  '@type': ['SoftwareApplication', 'MobileApplication'],
  '@id': APP_ID,
  name: site.name,
  alternateName: `${site.name} — ${site.tagline}`,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'SocialNetworkingApplication',
  applicationSubCategory: 'Messaging',
  description: site.description,
  url: site.url,
  downloadUrl: absoluteUrl('/download'),
  installUrl: absoluteUrl('/download'),
  softwareHelp: absoluteUrl('/help'),
  screenshot: absoluteUrl(site.ogImage),
  inLanguage: 'en',
  /* Every one of these is a claim the Features page makes in its own words.
     `featureList` is what an answer engine reads when somebody asks what the
     app actually does, so it is worth keeping in step with src/data/features. */
  featureList: [
    'One-to-one and group messaging with channels and voice notes',
    'Encrypted peer-to-peer voice and video calls over WebRTC',
    'Moments that last 24 hours and are then kept in Memories',
    'Live streaming by camera or text, and audio rooms with host controls',
    'Photo Drops and short-video Vibes with feels and private notes',
    'Music streaming with charts, playlists and offline saving',
    '50+ app-wide themes, chat wallpapers and profile Drip',
    'Sparks: a daily streak between two people',
    'Private Vault: an encrypted, code-locked space for conversations',
    'Multi-device sign-in with per-device session control',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl('/download'),
  },
  publisher: ref(ORG_ID),
  /* Deliberately no `aggregateRating`. Xelvic has no public rating count, and
     inventing one is the single fastest way to lose rich results. */
})

/** A generic WebPage node, so every page is addressable in the graph. */
export const webPageLd = (p: {
  name: string
  description: string
  path: string
  /** 'WebPage' by default; pages can pass a more specific schema.org type. */
  type?: string
  datePublished?: string
  dateModified?: string
  image?: string
  /** Trailing breadcrumb trail for this page, home first. */
  breadcrumbs?: { name: string; path: string }[]
}): Json => ({
  '@type': p.type ?? 'WebPage',
  '@id': `${absoluteUrl(p.path)}#webpage`,
  url: absoluteUrl(p.path),
  name: p.name,
  description: p.description,
  isPartOf: ref(SITE_ID),
  about: ref(APP_ID),
  inLanguage: 'en',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: absoluteUrl(p.image ?? site.ogImage),
  },
  datePublished: p.datePublished,
  dateModified: p.dateModified ?? p.datePublished,
  ...(p.breadcrumbs ? { breadcrumb: breadcrumbLd(p.breadcrumbs) } : {}),
  // The lede paragraph — the sentence an assistant should read aloud first.
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '[data-speakable]'],
  },
  publisher: ref(ORG_ID),
})

/** Breadcrumb trail. Pass [{ name, path }] from home down to the current page. */
export const breadcrumbLd = (items: { name: string; path: string }[]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
})

/** Blog post / article. */
export const articleLd = (a: {
  title: string
  description: string
  path: string
  image?: string
  datePublished: string
  dateModified?: string
  author: string
  section?: string
  wordCount?: number
}): Json => ({
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(a.path)}#article`,
  headline: a.title,
  description: a.description,
  image: absoluteUrl(a.image ?? site.ogImage),
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  author: { '@type': 'Organization', name: a.author },
  publisher: ref(ORG_ID),
  articleSection: a.section,
  wordCount: a.wordCount,
  inLanguage: 'en',
  isPartOf: ref(SITE_ID),
  mainEntityOfPage: { '@id': `${absoluteUrl(a.path)}#webpage` },
})

/** Job posting. */
export const jobPostingLd = (j: {
  title: string
  description: string
  employmentType: string
  location: string
  datePosted?: string
  team?: string
}): Json => ({
  '@type': 'JobPosting',
  title: j.title,
  description: j.description,
  employmentType: j.employmentType.toUpperCase().replace(/[\s-]/g, '_'),
  datePosted: j.datePosted ?? new Date().toISOString().slice(0, 10),
  hiringOrganization: ref(ORG_ID),
  industry: 'Consumer Software',
  occupationalCategory: j.team,
  jobLocationType: 'TELECOMMUTE',
  applicantLocationRequirements: { '@type': 'Country', name: j.location },
  /* Remote-first, and the application is an email rather than a form, so the
     posting says so instead of leaving a crawler to infer it from prose. */
  directApply: false,
  url: absoluteUrl(`/careers`),
})

/** FAQ page from question/answer pairs. */
export const faqLd = (faqs: { q: string; a: string }[]): Json => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

/**
 * HowTo — a tap-by-tap walkthrough.
 *
 * This is the schema that answers "how do I do X in Xelvic" in a voice
 * assistant or an AI answer box, and it is the reason the guides in
 * src/data/features.ts are written as literal taps rather than as prose.
 */
export const howToLd = (h: {
  name: string
  description: string
  path: string
  steps: { name: string; text: string }[]
  totalTime?: string
  tools?: string[]
}): Json => ({
  '@type': 'HowTo',
  '@id': `${absoluteUrl(h.path)}#howto`,
  name: h.name,
  description: h.description,
  totalTime: h.totalTime,
  tool: h.tools?.map((t) => ({ '@type': 'HowToTool', name: t })),
  step: h.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
    url: `${absoluteUrl(h.path)}#step-${i + 1}`,
  })),
})

/** A list of things — feature tours, the cast, theme packs. */
export const itemListLd = (l: {
  name: string
  path: string
  items: { name: string; path?: string; description?: string }[]
}): Json => ({
  '@type': 'ItemList',
  '@id': `${absoluteUrl(l.path)}#list`,
  name: l.name,
  numberOfItems: l.items.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: l.items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    description: it.description,
    ...(it.path ? { url: absoluteUrl(it.path) } : {}),
  })),
})

/** Contact page, with each department as its own node. */
export const contactPageLd = (c: {
  path: string
  departments: { name: string; email: string; note?: string }[]
}): Json => ({
  '@type': 'ContactPage',
  '@id': `${absoluteUrl(c.path)}#webpage`,
  url: absoluteUrl(c.path),
  name: `Contact ${site.name}`,
  isPartOf: ref(SITE_ID),
  about: ref(ORG_ID),
  inLanguage: 'en',
  mainEntity: {
    '@type': 'Organization',
    '@id': ORG_ID,
    contactPoint: c.departments.map((d) => ({
      '@type': 'ContactPoint',
      contactType: d.name,
      email: d.email,
      description: d.note,
      availableLanguage: ['English'],
    })),
  },
})

/** Wrap one or more nodes into a single @graph document. */
export const graph = (...nodes: Json[]): Json => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})
