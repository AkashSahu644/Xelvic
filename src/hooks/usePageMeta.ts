import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site, absoluteUrl } from '../data/site'

type SEOOptions = {
  title: string
  description?: string
  /** Social share image, site-relative or absolute. Falls back to the default OG image. */
  image?: string
  /** Alt text for the share image, for anybody who meets the card through a screen reader. */
  imageAlt?: string
  /** Override the canonical path. Defaults to the current route. */
  path?: string
  /** 'website' for most pages, 'article' for blog posts. */
  type?: 'website' | 'article'
  /** Hide from search engines (e.g. 404). */
  noindex?: boolean
  /** Article fields. Only read when `type` is 'article'. */
  published?: string
  modified?: string
  author?: string
  section?: string
  /** Optional JSON-LD structured data object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/* Every tag this route creates is stamped with `data-seo="route"`, and the
   cleanup takes back exactly those.

   Without the stamp the cleanup has a choice between two wrong answers.
   Leaving tags behind means a blog post's `article:published_time` survives
   the navigation to the home page, and the home page then advertises a
   publication date. Removing every tag the effect touched would be worse: the
   Open Graph tags also live in index.html, so the first navigation would
   delete the site's own defaults and the next route would have to rebuild
   them from nothing. The stamp is what tells the two apart. */
function setMeta(attr: 'name' | 'property', key: string, content: string, created: Element[]) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    tag.setAttribute('data-seo', 'route')
    document.head.appendChild(tag)
    created.push(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel: string, href: string, created: Element[]) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    tag.setAttribute('data-seo', 'route')
    document.head.appendChild(tag)
    created.push(tag)
  }
  tag.setAttribute('href', href)
}

/** A tag that belongs to one route only, so it is created and torn down per navigation. */
function appendMeta(attr: 'name' | 'property', key: string, content: string, created: Element[]) {
  const tag = document.createElement('meta')
  tag.setAttribute(attr, key)
  tag.setAttribute('content', content)
  tag.setAttribute('data-seo', 'route')
  document.head.appendChild(tag)
  created.push(tag)
}

/**
 * `/about/`, `/about` and `/about?utm_source=x` are one page, and a canonical
 * that spells them three ways is how a site ends up competing with itself.
 */
function canonicalPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export function useSEO({
  title,
  description = site.description,
  image,
  imageAlt,
  path,
  type = 'website',
  noindex = false,
  published,
  modified,
  author,
  section,
  jsonLd,
}: SEOOptions) {
  const location = useLocation()
  const canonical = absoluteUrl(canonicalPath(path ?? location.pathname))
  const ogImage = absoluteUrl(image ?? site.ogImage)
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`
  const alt = imageAlt ?? `${site.name} — ${site.tagline}`
  // Serialize so an inline object literal doesn't retrigger the effect every render.
  const ldJson = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const created: Element[] = []
    document.title = fullTitle

    setMeta('name', 'description', description, created)
    /* `max-image-preview:large` is what lets a search result carry a full-width
       image, and `max-snippet:-1` removes the length cap on the snippet an
       answer engine may quote. Both are opt-ins — leaving them out caps the
       snippet at the default and gives a smaller thumbnail. */
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      created,
    )
    setLink('canonical', canonical, created)

    // Open Graph
    setMeta('property', 'og:site_name', site.name, created)
    setMeta('property', 'og:title', fullTitle, created)
    setMeta('property', 'og:description', description, created)
    setMeta('property', 'og:type', type, created)
    setMeta('property', 'og:url', canonical, created)
    setMeta('property', 'og:image', ogImage, created)
    setMeta('property', 'og:image:alt', alt, created)
    setMeta('property', 'og:image:width', '1200', created)
    setMeta('property', 'og:image:height', '630', created)
    setMeta('property', 'og:locale', site.locale, created)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image', created)
    setMeta('name', 'twitter:site', site.twitter, created)
    setMeta('name', 'twitter:creator', site.twitter, created)
    setMeta('name', 'twitter:title', fullTitle, created)
    setMeta('name', 'twitter:description', description, created)
    setMeta('name', 'twitter:image', ogImage, created)
    setMeta('name', 'twitter:image:alt', alt, created)

    /* Article tags. These are appended rather than reused because their names
       change per route, and a stale `article:published_time` on a page that is
       not an article is worse than no tag at all. */
    if (type === 'article') {
      if (published) appendMeta('property', 'article:published_time', published, created)
      if (modified) appendMeta('property', 'article:modified_time', modified, created)
      if (author) appendMeta('property', 'article:author', author, created)
      if (section) appendMeta('property', 'article:section', section, created)
    }

    // Structured data
    let ldScript: HTMLScriptElement | null = null
    if (ldJson) {
      ldScript = document.createElement('script')
      ldScript.type = 'application/ld+json'
      ldScript.textContent = ldJson
      ldScript.dataset.seo = 'route'
      document.head.appendChild(ldScript)
    }

    return () => {
      created.forEach((tag) => tag.remove())
      ldScript?.remove()
    }
  }, [fullTitle, description, canonical, ogImage, alt, type, noindex, ldJson, published, modified, author, section])
}
