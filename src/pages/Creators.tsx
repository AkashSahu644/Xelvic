import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { creatorTools, dealSteps } from '../data/creators'

export default function Creators() {
  /* No arguments. The WebPage, the ItemList of creator tools and the HowTo for
     a brand deal are the route entry's — both built from the arrays in
     src/data/creators that this page renders. */
  useSEO()
  return (
    <>
      <PageHero
        title={<>Grow, collab and <span className="text-grad">get paid</span></>}
        sub="Xelvic is built for creators from day one — professional profiles, insights, verification and brand deals with approval-gated payouts."
        wall="/media/themes/animeblue/drops.jpg"
      />

      <section className="pb-6">
        <div className="wrap grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {creatorTools.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-grad text-white"><Icon size={22} /></span>
                  <h3 className="mt-4 text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{t.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <PhoneFrame drift tilt glow="rgba(236,72,153,.35)">
              <img
                src="/media/themes/alone/profile.jpg"
                alt="Creator profile"
                className="h-full w-full object-cover"
              />
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold md:text-4xl">How a paid deal works</h2>
            <p className="mt-3 text-white/60">Collaborations happen in the open, so creators and brands always know where things stand.</p>
            <div className="mt-8 space-y-5">
              {dealSteps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-grad font-bold">{s.n}</span>
                  <div>
                    <h4 className="font-bold">{s.t}</h4>
                    <p className="text-sm text-white/55">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
