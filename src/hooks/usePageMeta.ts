import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site, absoluteUrl } from '../data/site'

type SEOOptions = {
  title: string
  description?: string
  /** Social share image, site-relative or absolute. Falls back to the default OG image. */
  image?: string
  /** Override the canonical path. Defaults to the current route. */
  path?: string
  /** 'website' for most pages, 'article' for blog posts. */
  type?: 'website' | 'article'
  /** Hide from search engines (e.g. 404). */
  noindex?: boolean
  /** Optional JSON-LD structured data object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Create or update a <meta> tag, tracking it so we can clean up on unmount. */
function setMeta(attr: 'name' | 'property', key: string, content: string, registry: Element[]) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
  registry.push(tag)
}

function setLink(rel: string, href: string, registry: Element[]) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  registry.push(tag)
}

export function useSEO({
  title,
  description = site.description,
  image,
  path,
  type = 'website',
  noindex = false,
  jsonLd,
}: SEOOptions) {
  const location = useLocation()
  const canonical = absoluteUrl(path ?? location.pathname)
  const ogImage = absoluteUrl(image ?? site.ogImage)
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`
  // Serialize so an inline object literal doesn't retrigger the effect every render.
  const ldJson = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const touched: Element[] = []
    document.title = fullTitle

    setMeta('name', 'description', description, touched)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow', touched)
    setLink('canonical', canonical, touched)

    // Open Graph
    setMeta('property', 'og:site_name', site.name, touched)
    setMeta('property', 'og:title', fullTitle, touched)
    setMeta('property', 'og:description', description, touched)
    setMeta('property', 'og:type', type, touched)
    setMeta('property', 'og:url', canonical, touched)
    setMeta('property', 'og:image', ogImage, touched)
    setMeta('property', 'og:locale', site.locale, touched)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image', touched)
    setMeta('name', 'twitter:site', site.twitter, touched)
    setMeta('name', 'twitter:title', fullTitle, touched)
    setMeta('name', 'twitter:description', description, touched)
    setMeta('name', 'twitter:image', ogImage, touched)

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
      ldScript?.remove()
    }
  }, [fullTitle, description, canonical, ogImage, type, noindex, ldJson])
}

/**
 * Backwards-compatible shim: existing pages call usePageMeta(title, description).
 * New pages should prefer useSEO for full control.
 */
export function usePageMeta(title: string, description?: string) {
  useSEO({ title, description })
}
