import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { features, socialFeatures } from '../data/features'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

export default function Overview() {
  useSEO({
    title: 'Overview — Xelvic',
    description:
      'The big picture: what Xelvic is, and everything it brings together in one app — messaging, calls, moments, live rooms, a social feed, music and creators.',
    image: '/media/walls/studio.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'Xelvic at a glance',
        description:
          'Xelvic brings messaging, calling, stories, live audio, a social feed, music and a creator economy into a single home.',
        path: '/overview',
        image: '/media/walls/studio.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Overview', path: '/overview' },
        ],
      }),
    ),
  })
  return (
    <>
      <PageHero
        title={<>Six apps' worth of fun, <span className="text-grad">in one</span></>}
        sub="Xelvic brings messaging, calling, stories, live audio, a social feed, music and a creator economy into a single, playful home."
        wall="/media/walls/studio.jpg"
      />

      <section className="pb-10">
        <div className="wrap grid gap-5 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.slug} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl text-plum" style={{ background: `linear-gradient(135deg, ${f.color}, #ff8fc4)` }}>
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.name}</h3>
                  <p className="mt-2 text-sm text-white/55">{f.blurb}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal><h2 className="font-display text-3xl font-bold md:text-4xl">Plus the social fun</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {socialFeatures.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.name} delay={(i % 3) * 0.06}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl glass-soft text-blue-glow"><Icon size={20} /></span>
                    <div>
                      <h4 className="font-bold">{s.name}</h4>
                      <p className="mt-1 text-sm text-white/50">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
