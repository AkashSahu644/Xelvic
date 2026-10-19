/**
 * Retired page, kept as reference.
 *
 * The cast now lives inside Themes & Drip (`/features/themes#cast`), and
 * `/characters` is a `noindex` redirect in the router. This file is the copy
 * the merged page was written from; nothing imports it, and it must not be
 * added to `App.tsx` again.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Heart,
  Images,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react'
import {
  cast,
  coverFor,
  mascotFor,
  pageArtCast,
  pageArtSlugs,
  poseCount,
  poses,
  sightings,
} from '../data/characters'
import { characterThemeCount } from '../data/themes'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'

type PoseKey = 'typing' | 'wait'

const poseTabs: { key: PoseKey; label: string }[] = [
  { key: 'typing', label: 'Typing' },
  { key: 'wait', label: 'Wait' },
]

/**
 * The Cast — every character that ships in the theme packs, presented like a
 * social profile: a story rail of all of them, an interactive stage, and the
 * twelve full-page illustrations that come with the richer packs.
 *
 * The count is the APK's: 17 characters, 3 shared poses, 12 page illustrations.
 * The concept art on the home page is deliberately not repeated here — it does
 * not ship in the app.
 */
export default function Characters() {
  const [theme, setTheme] = useState(cast[0])
  const [pose, setPose] = useState<PoseKey>('typing')

  useSEO()

  return (
    <>
      {/* ── hero: the cast as a profile ────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-14 pt-[calc(7.5rem+env(safe-area-inset-top))] md:pb-20 md:pt-[calc(9.5rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-[min(460px,70vw)] w-[min(460px,70vw)] rounded-full bg-pink-200/50 blur-[110px]" />
          <div className="absolute -right-20 top-32 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-pink-300/40 blur-[130px]" />
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
                  {characterThemeCount} characters · {poseCount} poses ·{' '}
                  {pageArtCast.length} page illustrations
                </p>
              </div>
              <span className="ml-auto rounded-full bg-brand-grad px-4 py-1.5 text-xs font-bold text-plum">
                The cast
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,8.5vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.4rem,5.8vw,4.5rem)]">
              Every theme comes with <span className="text-grad">a face</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/60">
              Xelvic does not have one mascot. It has a cast: {characterThemeCount}{' '}
              characters, each shipped with its own theme, plus three shared poses
              that do the small jobs in the interface.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton to="/features/themes" variant="glow">
                Browse the themes
              </MagneticButton>
              <MagneticButton to="/download" variant="ghost">
                Get Xelvic
              </MagneticButton>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {['Typing', 'Wait', 'Full-page art'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-plum/65"
                >
                  <Sparkles size={12} className="text-pink-600" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-brand-grad-soft blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border-2 border-pure bg-pure shadow-phone">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={coverFor(theme.slug)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-plum/10" />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${theme.slug}-${pose}`}
                      src={mascotFor(theme.slug, pose)}
                      alt={`${theme.name} character, ${pose} pose`}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      className="absolute inset-x-0 top-[6%] mx-auto h-[70%] w-auto max-w-[80%] object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,.45)]"
                    />
                  </AnimatePresence>

                  <span className="absolute left-4 top-4 rounded-full bg-pure/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-plum/60 backdrop-blur">
                    Wearing this theme
                  </span>

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-bold text-pure">{theme.name}</p>
                      <p className="text-xs text-pure/70">{theme.note}</p>
                    </div>
                    <span className="text-2xl" aria-hidden>
                      {theme.emoji}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 p-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-plum/50">
                    <Heart size={13} className="text-pink-600" />
                    Wearing it
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-plum/50">
                    <MessageCircle size={13} className="text-pink-600" />
                    In every convo
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-plum/50">
                    <Send size={13} className="text-pink-600" />
                    Share
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the story rail: all 17 ─────────────────────────────────────────── */}
      <section className="relative bg-pink-50 py-10">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-plum">The whole cast</h2>
            <span className="text-xs font-semibold text-plum/40">Tap one to see it big</span>
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cast.map((c) => {
              const active = c.slug === theme.slug
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    setTheme(c)
                    setPose('typing')
                  }}
                  aria-pressed={active}
                  className="group flex w-[72px] shrink-0 flex-col items-center gap-2"
                >
                  <span
                    className={`grid place-items-center rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 ${
                      active ? '' : 'opacity-80'
                    }`}
                    style={{
                      background: active
                        ? 'conic-gradient(from 200deg,#ff9ecb,#ec4899,#9d174d,#ff9ecb)'
                        : 'linear-gradient(135deg,#ffd3e5,#ff9ecb)',
                    }}
                  >
                    <span className="grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full bg-pure p-[3px]">
                      <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-pink-50">
                        <img
                          src={mascotFor(c.slug, 'typing')}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-contain p-0.5"
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className={`text-[11px] font-bold leading-tight ${
                      active ? 'text-pink-600' : 'text-plum/60'
                    }`}
                  >
                    {c.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── the three shared poses ─────────────────────────────────────────── */}
      <section className="section relative">
        <div className="wrap">
          <SectionHeading
            title={
              <>
                Three poses, <span className="text-grad">three jobs</span>
              </>
            }
            sub="Before a theme is applied, these are the drawings the app reaches for. Each one appears at a different moment."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {poses.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.07} className="h-full">
                <div className="group flex h-full flex-col items-center rounded-[1.75rem] border border-plum/10 bg-pure p-6 text-center shadow-[0_16px_40px_-26px_rgba(58,10,36,.45)] transition-all duration-300 hover:-translate-y-1">
                  <span
                    className="grid place-items-center rounded-full p-[2.5px]"
                    style={{
                      background:
                        'conic-gradient(from 200deg,#ff9ecb,#ec4899,#9d174d,#ff9ecb)',
                    }}
                  >
                    <span className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-pure p-[3px]">
                      <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-gradient-to-b from-pink-50 to-pink-100">
                        <img
                          src={p.src}
                          alt={`${p.label} pose`}
                          loading="lazy"
                          className="h-[88%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                      </span>
                    </span>
                  </span>
                  <span className="mt-4 rounded-full border border-plum/10 bg-pink-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-plum/55">
                    {p.label}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-plum">{p.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/55">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the stage / switcher ───────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-pink-50">
        <div className="wrap">
          <SectionHeading
            title={
              <>
                Pick a theme, <span className="text-grad">meet its character</span>
              </>
            }
            sub="Every character is drawn twice — typing and waiting. The richer packs add a full-page illustration on top."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-plum/10 shadow-card">
              <div className="relative grid aspect-[4/3] place-items-center sm:aspect-[16/11]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={theme.slug}
                    src={coverFor(theme.slug)}
                    alt=""
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/35 to-plum/10" />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${theme.slug}-${pose}`}
                    src={mascotFor(theme.slug, pose)}
                    alt={`${theme.name} mascot, ${pose} pose`}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    className="relative max-h-[64%] w-auto max-w-[64%] object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,.45)]"
                  />
                </AnimatePresence>

                <div className="absolute right-4 top-4 flex gap-1 rounded-full border border-pure/25 bg-plum/45 p-1 backdrop-blur">
                  {poseTabs.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setPose(t.key)}
                      aria-pressed={pose === t.key}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                        pose === t.key
                          ? 'bg-brand-grad text-plum'
                          : 'text-pure/70 hover:text-pure'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pure/55">
                      Character theme
                    </p>
                    <h3 className="font-display text-2xl font-bold text-pure">{theme.name}</h3>
                    <p className="mt-1 text-sm text-pure/70">{theme.note}</p>
                  </div>
                  <span className="shrink-0 text-3xl" aria-hidden>
                    {theme.emoji}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-plum/10 bg-pure p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-pink-500/40" />
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                  {cast.length} character themes
                </h3>
              </div>

              <div className="mt-5 grid max-h-[25rem] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
                {cast.map((c) => {
                  const active = c.slug === theme.slug
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setTheme(c)}
                      aria-pressed={active}
                      className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all duration-200 ${
                        active
                          ? 'border-transparent bg-brand-grad shadow-glow-sm'
                          : 'border-plum/10 bg-pure hover:-translate-y-0.5 hover:border-pink-500/40'
                      }`}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-pink-50">
                        <img
                          src={mascotFor(c.slug, 'typing')}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-contain p-0.5"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-bold text-plum">
                          {c.name}
                        </span>
                        <span
                          className={`block truncate text-[11px] ${
                            active ? 'text-plum/70' : 'text-plum/45'
                          }`}
                        >
                          {c.note}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-plum/45">
                <Check size={13} className="mt-0.5 shrink-0 text-pink-600" />
                {pageArtSlugs.length} of the {cast.length} packs also ship a full-page
                illustration on top of the typing and wait art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── full-page illustrations ────────────────────────────────────────── */}
      <section className="section relative">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pink-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
                  <Images size={14} />
                  Page art
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {pageArtCast.length} packs go <span className="text-grad">full page</span>
                </h2>
              </Reveal>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-plum/50">
              An illustration that takes the whole screen, not just the little
              figure in the convo. These are the packs that ship one.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {pageArtCast.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 0.04}>
                <Link
                  to={`/features/themes#themes`}
                  className="group block overflow-hidden rounded-2xl border border-plum/10 bg-plum shadow-[0_16px_36px_-24px_rgba(58,10,36,.5)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={`/media/themes/${c.slug}/page.png`}
                      alt={`${c.name} page illustration`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-plum to-transparent" />
                    <span className="absolute inset-x-3 bottom-2.5 flex items-center gap-1 text-xs font-bold text-pure">
                      <span aria-hidden>{c.emoji}</span>
                      {c.name}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── where they show up: chat bubbles ───────────────────────────────── */}
      <section className="section relative overflow-hidden bg-pink-50">
        <div className="wrap">
          <SectionHeading
            title={
              <>
                Where the cast <span className="text-grad">shows up</span>
              </>
            }
            sub="Four everyday moments where a Xelvic character does the talking for you."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {sightings.map((s, i) => {
              const Icon = [Sparkles, MessageCircle, Heart, Send][i % 4]
              return (
                <Reveal key={s.title} delay={(i % 2) * 0.06} className="h-full">
                  <div className="flex h-full items-start gap-4 rounded-[1.5rem] rounded-bl-md border border-plum/10 bg-pure p-5 shadow-[0_14px_34px_-24px_rgba(58,10,36,.45)]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-grad text-plum">
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-plum">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-plum/55">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-10 flex justify-center">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
            >
              Back to the cast
              <ArrowRight size={15} className="-rotate-90" />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
