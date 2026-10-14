import Hero from '../components/sections/Hero'
import FeatureGrid from '../components/sections/FeatureGrid'
import WhatsNew from '../components/sections/WhatsNew'
import ThemesShowcase from '../components/sections/ThemesShowcase'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'

export default function Home() {
  /* No arguments. The home page's title, description, share card and the four
     nodes the rest of the site hangs off — the company, the site, the app and
     this page — are all in src/seo/routes.ts, which is also what the
     prerenderer writes into index.html. Passing any of them again here would
     be a second answer to a question that already has one. */
  useSEO()
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
