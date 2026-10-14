import Hero from '../components/sections/Hero'
import FeatureGrid from '../components/sections/FeatureGrid'
import WhatsNew from '../components/sections/WhatsNew'
import ThemesShowcase from '../components/sections/ThemesShowcase'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, organizationLd, webSiteLd, softwareApplicationLd, webPageLd } from '../data/jsonld'

export default function Home() {
  /* The home page carries the four nodes the rest of the site hangs off:
     the company, the site, the app, and this page. Every other page's graph
     points back at one of them by `@id`, so a crawler that lands anywhere
     still resolves the same organisation rather than a page-local one. */
  useSEO({
    title: 'Xelvic — Chat. Call. Vibe.',
    description:
      'Xelvic is a free app for messaging, voice and video calls, moments, live rooms, short video and music — with 50+ themes, a private vault and a daily Spark streak.',
    jsonLd: graph(
      organizationLd(),
      webSiteLd(),
      softwareApplicationLd(),
      webPageLd({
        name: 'Xelvic — Chat. Call. Vibe.',
        description:
          'One app for the people you talk to every day: messaging, voice and video calls, moments, live rooms, drops, short video and music, in 50+ themes.',
        path: '/',
        type: 'WebPage',
      }),
    ),
  })
  return (
    <>
      <Hero />
      <FeatureGrid />
      <WhatsNew />
      <ThemesShowcase />
      <CTABand />
    </>
  )
}
