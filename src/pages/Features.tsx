import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  Navigation,
  Send,
  Sparkles,
} from 'lucide-react'
import { features, getGuide } from '../data/features'
import { characterThemeCount, themeCount } from '../data/themes'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo from '../components/ui/PhoneDemo'
import ThemeMarketplaceMockup from '../components/ui/ThemeMarketplaceMockup'
import MagneticButton from '../components/ui/MagneticButton'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * All features — the whole app in one scroll, styled like a social app's own
 * marketing page: a profile header and story rail at the top, then one large
 * card per feature, alternating sides.
 *
 * The cards are the same seven entries the route table and the SEO ItemList are
 * built from, so the list never drifts from the app's feature set.
 */
export default function Features() {
  useSEO()

  const reduced = useReducedMotion()

  return (
    <>
      {/* ── hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-14 pt-[calc(7.5rem+env(safe-area-inset-top))] md:pb-20 md:pt-[calc(9.5rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-28 top-4 h-[min(480px,72vw)] w-[min(480px,72vw)] rounded-full bg-pink-200/50 blur-[120px]" />
          <div className="absolute -right-24 top-32 h-[min(540px,84vw)] w-[min(540px,84vw)] rounded-full bg-pink-300/40 blur-[130px]" />
        </div>

        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                className="grid place-items-center rounded-full p-[3px]"
                style={{
                  background:
                    'conic-gradient(from 200deg,#ff9ecb,#ec4899,#9d174d,#ff9ecb)',
                }}
              >
                <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-pure p-[3px]">
                  <img
                    src="/media/brand/xelvic.png"
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-plum">
                  xelvic
                  <BadgeCheck size={17} className="text-pink-600" />
                </p>
                <p className="text-xs font-semibold text-plum/45">
                  {features.length} features · 5 tabs · {themeCount} themes
                </p>
              </div>
              <span className="ml-auto rounded-full bg-brand-grad px-4 py-1.5 text-xs font-bold text-plum">
                Keep
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,8.5vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.4rem,5.8vw,4.5rem)]">
              One app. <span className="text-grad">Every way to be close.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/60">
              Chat and calls, live rooms, Moments, Drops and Vibes, music — and a
              theme to make the whole thing yours. Here is every part of Xelvic,
              with the screen it lives on.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton to="/download" variant="glow">
                Get Xelvic
              </MagneticButton>
              <a
                href="#tour"
                className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 bg-pure px-5 py-2.5 text-sm font-bold text-plum transition-colors hover:border-pink-500/40"
              >
                Take the tour
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex justify-center">
            <div className="relative w-full max-w-[680px] shrink-0 lg:w-[calc(100%+8rem)]">
              {/* The clip is laid into the page rather than placed on it: it
                  fills the column, and multiply + a soft mask dissolve its
                  light studio ground into the pink so no rectangle shows. */}
              <video
                src="/media/video/home-chat.mp4"
                aria-label="Xelvic chat in action"
                className="aspect-[16/10] w-full object-cover"
                poster="/media/themes/covers/pink_light.png"
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
                  maskImage:
                    'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
                  WebkitMaskComposite: 'source-in',
                  maskComposite: 'intersect',
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Instagram-style story rail: one ring per feature */}
        <div className="wrap mt-12">
          <Reveal delay={0.1}>
            <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <Link
                    key={f.slug}
                    to={`/features/${f.slug}`}
                    className="group flex w-[74px] shrink-0 flex-col items-center gap-2 text-center"
                  >
                    <span
                      className="grid place-items-center rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background:
                          'conic-gradient(from 200deg,#ff9ecb,#ec4899,#9d174d,#ff9ecb)',
                      }}
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-pure p-[3px]">
                        <span
                          className="grid h-full w-full place-items-center rounded-full text-pure"
                          style={{
                            background: `linear-gradient(135deg, ${f.color}, #ff8fc4)`,
                          }}
                        >
                          <Icon size={20} />
                        </span>
                      </span>
                    </span>
                    <span className="text-[11px] font-bold leading-tight text-plum/70 group-hover:text-pink-600">
                      {f.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the tour ───────────────────────────────────────────────────────── */}
      <section id="tour" className="section relative scroll-mt-28 overflow-hidden bg-pink-50 pt-0">
        <div className="wrap space-y-8 pt-16 md:space-y-12">
          {features.map((f, i) => {
            const Icon = f.icon
            const guide = getGuide(f.slug)
            const flip = i % 2 === 1
            return (
              <Reveal key={f.slug} delay={0.04}>
                <article className="overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-[0_20px_50px_-30px_rgba(58,10,36,.45)] sm:rounded-[2.5rem]">
                  <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                    <div className={flip ? 'lg:order-2' : ''}>
                      <div
                        className="relative overflow-hidden rounded-[1.75rem] p-[2px]"
                        style={{
                          background:
                            'conic-gradient(from 200deg,#ffd3e5,#ec4899,#ff9ecb,#ffd3e5)',
                        }}
                      >
                        <div className="flex justify-center rounded-[1.7rem] bg-gradient-to-b from-pink-100 to-pink-50 px-4 py-8 sm:px-8">
                          <PhoneFrame tilt glow={`${f.color}55`}>
                            {f.slug === 'themes' ? (
                              <ThemeMarketplaceMockup />
                            ) : guide ? (
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

                        <span className="absolute left-4 top-4 rounded-full bg-pure/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-plum/60 backdrop-blur">
                          {String(i + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <div className={flip ? 'lg:order-1' : ''}>
                      <div className="flex items-center gap-3">
                        <span
                          className="grid h-12 w-12 place-items-center rounded-2xl text-pure shadow-glow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${f.color}, #ff8fc4)`,
                          }}
                        >
                          <Icon size={22} />
                        </span>
                        <div>
                          <h2 className="font-display text-2xl font-bold leading-tight text-plum md:text-3xl">
                            {f.name}
                          </h2>
                          <p className="text-sm font-semibold text-pink-600">{f.tagline}</p>
                        </div>
                      </div>

                      <p className="mt-5 max-w-md leading-relaxed text-plum/60">{f.blurb}</p>

                      {guide && (
                        <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border border-plum/10 bg-pink-50 px-3 py-2">
                          <Navigation size={14} className="text-pink-600" />
                          {guide.path.map((p, j) => (
                            <span key={p} className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-plum/70">{p}</span>
                              {j < guide.path.length - 1 && (
                                <ChevronRight size={12} className="text-plum/25" />
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {f.points.map((p) => (
                          <li
                            key={p.title}
                            className="rounded-2xl border border-plum/10 bg-pink-50/70 p-3.5"
                          >
                            <h3 className="flex items-center gap-1.5 text-sm font-bold text-plum">
                              <Check size={13} className="shrink-0 text-pink-600" />
                              {p.title}
                            </h3>
                            <p className="mt-1 pl-5 text-xs leading-relaxed text-plum/50">
                              {p.body}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-center justify-between border-t border-plum/10 pt-4">
                        <div className="flex items-center gap-4 text-plum/35">
                          <Heart size={16} />
                          <MessageCircle size={16} />
                          <Send size={16} />
                        </div>
                        <Link
                          to={`/features/${f.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
                        >
                          More on {f.name}
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="wrap mt-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs font-semibold text-plum/40">
              <span className="rounded-full border border-plum/10 bg-pure px-3 py-1.5">
                {themeCount} themes
              </span>
              <span className="rounded-full border border-plum/10 bg-pure px-3 py-1.5">
                {characterThemeCount} characters
              </span>
              <span className="rounded-full border border-plum/10 bg-pure px-3 py-1.5">
                Everything in the app, nothing invented
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
