import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import LiveDemos from '../components/sections/LiveDemos'
import HowItWorksPreview from '../components/sections/HowItWorksPreview'
import { wallpapers } from '../data/themes'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

const tiles = [
  { title: 'Live rooms right now', tag: 'Audio', screen: '/media/themes/catgirl/audio.jpg', span: 'md:col-span-2 md:row-span-2' },
  { title: 'Moments from today', tag: 'Moments', screen: '/media/themes/animeblue/moments.jpg', span: '' },
  { title: 'Fresh Drops', tag: 'Drops', screen: '/media/themes/alone/drops.jpg', span: '' },
  { title: 'Trending audio', tag: 'Music', screen: '/media/themes/alone/audio.jpg', span: '' },
  { title: 'Go Live', tag: 'Live', screen: '/media/themes/catgirl/live.jpg', span: '' },
]

export default function Explore() {
  useSEO({
    title: 'Explore — Xelvic',
    description:
      'See what people are doing on Xelvic right now — live rooms, moments, drops and trending audio, with interactive previews of the app itself.',
    image: '/media/walls/sheher.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'Explore Xelvic',
        description:
          'Live rooms, fresh moments, trending audio and endless drops — a taste of what people are doing on Xelvic, with live interactive previews of the app.',
        path: '/explore',
        image: '/media/walls/sheher.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Explore', path: '/explore' },
        ],
      }),
    ),
  })
  return (
    <>
      <PageHero
        title={<>See what's <span className="text-grad">happening</span></>}
        sub="Live rooms, fresh moments, trending audio and endless drops. Here's a taste of the energy on Xelvic."
        wall="/media/walls/sheher.jpg"
      />

      <section>
        <div className="wrap">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            {tiles.map((t, i) => (
              <Reveal key={t.title} delay={(i % 4) * 0.08} className={t.span}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10">
                  <img src={t.screen} alt={t.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="mb-2 inline-flex items-center rounded-full border border-pure/25 bg-pure/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pure backdrop-blur">
                      {t.tag}
                    </span>
                    <h3 className="text-lg font-bold text-pure">{t.title}</h3>
                  </div>
                  <span className="absolute right-4 top-4 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-blue" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-glow" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live, interactive previews of the real app — moved here from Home so
          Explore is the one place you go to see the thing running. */}
      <LiveDemos />
      <HowItWorksPreview />

      {/* wallpapers */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Chat wallpapers to set the scene</h2>
            <p className="mt-3 max-w-xl text-white/55">Hand-painted backdrops like Mehfil, Raat, Safar and Sheher — drop one behind any conversation.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {wallpapers.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 6) * 0.06}>
                <Link to="/features/themes" className="group block overflow-hidden rounded-2xl border border-white/10">
                  <div className="relative aspect-[9/16]">
                    <img src={w.src} alt={w.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-sm font-bold text-pure">{w.name}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
