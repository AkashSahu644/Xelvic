/**
 * The one module the build scripts import.
 *
 * `scripts/lib/seo-bundle.mjs` bundles this file with esbuild and hands the
 * result to `gen-og.mjs`, `gen-sitemap.mjs` and `prerender.mjs`. Keeping the
 * surface in one place means adding a data module here is all it takes for
 * every generator to see it.
 *
 * This file is never imported by the app itself — it exists so that the
 * scripts and the app read the same data instead of two copies of it.
 */
export {
  routes,
  routeSeo,
  sitemapRoutes,
  cardFor,
  stripBrand,
  ogImageFor,
} from './routes'
export type { RouteSeo, Breadcrumb } from './routes'

export { pageNode, pageGraph, routeNodes, routeExtras, routeGraph, fullNodes, baseNodes } from './graph'
export { site } from '../data/site'
export { features, featureGuides } from '../data/features'
export { posts } from '../data/posts'
export { jobs } from '../data/jobs'
export { cast, poses } from '../data/characters'
export { faqCategories } from '../data/faq'
export { downloadFaqs } from '../data/downloadFaq'
export { doors } from '../data/contact'
export { deepLinks } from '../data/developers'
export { creatorTools, dealSteps } from '../data/creators'
export { gettingStarted } from '../data/gettingStarted'
export { newInXelvic } from '../data/whatsNew'
