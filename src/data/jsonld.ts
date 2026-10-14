// Structured-data (schema.org JSON-LD) builders.
// Keeping these in one place means every page emits consistent, valid markup.
import { site, absoluteUrl } from './site'

type Json = Record<string, unknown>

/** Organization — referenced by @id from other nodes. */
export const organizationLd = (): Json => ({
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl('/favicon-512x512.png'),
  description: site.description,
  sameAs: Object.values(site.social),
})

/** WebSite node with a sitewide search action. */
export const webSiteLd = (): Json => ({
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
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
  '@type': 'SoftwareApplication',
  name: site.name,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'SocialNetworkingApplication',
  description: site.description,
  url: site.url,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
  author: string
}): Json => ({
  '@type': 'BlogPosting',
  headline: a.title,
  description: a.description,
  image: absoluteUrl(a.image ?? site.ogImage),
  datePublished: a.datePublished,
  dateModified: a.datePublished,
  author: { '@type': 'Organization', name: a.author },
  publisher: { '@id': `${site.url}/#organization` },
  mainEntityOfPage: absoluteUrl(a.path),
})

/** Job posting. */
export const jobPostingLd = (j: {
  title: string
  description: string
  employmentType: string
  location: string
  datePosted?: string
}): Json => ({
  '@type': 'JobPosting',
  title: j.title,
  description: j.description,
  employmentType: j.employmentType.toUpperCase().replace(/[\s-]/g, '_'),
  datePosted: j.datePosted ?? new Date().toISOString().slice(0, 10),
  hiringOrganization: { '@id': `${site.url}/#organization` },
  jobLocationType: 'TELECOMMUTE',
  applicantLocationRequirements: { '@type': 'Country', name: j.location },
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

/** Wrap one or more nodes into a single @graph document. */
export const graph = (...nodes: Json[]): Json => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})
