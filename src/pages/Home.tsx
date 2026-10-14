import Hero from '../components/sections/Hero'
import FeatureGrid from '../components/sections/FeatureGrid'
import WhatsNew from '../components/sections/WhatsNew'
import ThemesShowcase from '../components/sections/ThemesShowcase'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, organizationLd, webSiteLd, softwareApplicationLd } from '../data/jsonld'

export default function Home() {
  useSEO({
    title: 'Xelvic — Chat. Call. Vibe.',
    description: 'One app for messaging, voice & video calls, moments, live rooms, music and more.',
    jsonLd: graph(organizationLd(), webSiteLd(), softwareApplicationLd()),
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
