import { Link } from 'react-router-dom'
import { features, getGuide } from '../data/features'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo from '../components/ui/PhoneDemo'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { ArrowUpRight, ChevronRight, Navigation } from 'lucide-react'

export default function Features() {
  /* No arguments. The title, the share card, the WebPage and the ItemList of
     every feature are the route entry's — built from the same `features` array
     this page maps over, so the list a crawler reads and the list a reader sees
     cannot drift. */
  useSEO()
  return (
    <>
      <PageHero
        title={<>Everything Xelvic <span className="text-grad">can do</span></>}
        sub="Seven ways to stay close, plus the social fun that keeps it interesting. Tap any feature for a deeper look."
        wall="/media/walls/xelvic.jpg"
      />

      <section className="pb-10">
        <div className="wrap space-y-24">
          {features.map((f, i) => {
            const Icon = f.icon
            const flip = i % 2 === 1
            const guide = getGuide(f.slug)
            return (
              <div key={f.slug} className="grid items-center gap-10 lg:grid-cols-2">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <div className="flex justify-center">
                    <PhoneFrame tilt drift glow={`${f.color}44`}>
                      {guide ? (
                        <PhoneDemo kind={guide.demo} />
                      ) : (
                        <img
                          src={f.screen || '/media/themes/animeblue/convo.jpg'}
                          alt={f.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </PhoneFrame>
                  </div>
                </Reveal>
                <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow-sm"
                    style={{ background: `linear-gradient(135deg, ${f.color}, #ff8fc4)` }}
                  >
                    <Icon size={26} />
                  </span>
                  <h2 className="mt-5 font-display text-3xl font-bold md:text-4xl">{f.name}</h2>
                  <p className="mt-2 text-lg text-blue-glow">{f.tagline}</p>
                  <p className="mt-4 max-w-md text-white/60">{f.blurb}</p>
                  {guide && (
                    <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                      <Navigation size={14} className="text-blue-glow" />
                      {guide.path.map((p, j) => (
                        <span key={p} className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white/75">{p}</span>
                          {j < guide.path.length - 1 && (
                            <ChevronRight size={12} className="text-white/30" />
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {f.points.map((p) => (
                      <li key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <h4 className="text-sm font-bold">{p.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-white/50">{p.body}</p>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/features/${f.slug}`} className="mt-6 inline-flex items-center gap-1 font-semibold text-blue-glow">
                    More on {f.name} <ArrowUpRight size={16} />
                  </Link>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      <CTABand />
    </>
  )
}
