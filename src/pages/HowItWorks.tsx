import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCheck,
  ChevronRight,
  MapPin,
  Sparkles,
} from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo from '../components/ui/PhoneDemo'
import MagneticButton from '../components/ui/MagneticButton'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { features, getGuide, socialFeatures } from '../data/features'
import { gettingStarted as steps } from '../data/gettingStarted'

/**
 * How it works — the five-step walkthrough, presented the way WhatsApp tells a
 * conversation: the demo phone stays on one side of the walkthrough, and every
 * step is a chat bubble that opens into its own taps.
 *
 * The hero does not repeat that phone. It is a five-stop trail from "hello" to
 * "live", so the top of the page says how little there is to do before the
 * steps below spell out exactly where to tap.
 *
 * The steps come from `data/gettingStarted`, which is also what the route's
 * HowTo structured data is built from — one array, two readers.
 */
export default function HowItWorks() {
  useSEO()
  const [active, setActive] = useState(0)
  const step = steps[active]

  // The feature directory below is a little route map: pick a destination and
  // the board draws the taps that get you there, straight from the guides.
  const [dest, setDest] = useState(features[0].slug)
  const destIndex = features.findIndex((f) => f.slug === dest)
  const destFeature = features[destIndex]
  const destGuide = getGuide(destFeature.slug)
  const destStops = destGuide?.path ?? ['Open Xelvic', destFeature.name]
  const destSteps = destGuide?.steps ?? []
  const destTips = destGuide?.tips ?? []
  const DestIcon = destFeature.icon

  return (
    <>
      {/* ── hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-14 pt-[calc(7.5rem+env(safe-area-inset-top))] md:pb-20 md:pt-[calc(9.5rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-[min(460px,70vw)] w-[min(460px,70vw)] rounded-full bg-pink-200/50 blur-[110px]" />
          <div className="absolute -right-24 top-40 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-pink-300/40 blur-[130px]" />
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
                  {steps.length} steps · under a minute to sign up
                </p>
              </div>
              <span className="ml-auto rounded-full bg-brand-grad px-4 py-1.5 text-xs font-bold text-plum">
                Start here
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,8.5vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.4rem,5.8vw,4.5rem)]">
              From hello to live <span className="text-grad">in five steps</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/60">
              Five steps between downloading the app and your first
              conversation. Tap any step on the trail and the walkthrough below
              opens with exactly where to press.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton to="/download" variant="glow">
                Get Xelvic
              </MagneticButton>
              <a
                href="#steps"
                className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 bg-pure px-5 py-2.5 text-sm font-bold text-plum transition-colors hover:border-pink-500/40"
              >
                Walk me through it
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex justify-center">
            <div className="relative w-full max-w-[440px]">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-pink-300/30 blur-3xl"
              />

              {/* The trail: one glance at the whole setup, and a shortcut into
                  the step-by-step below. No phone — the walkthrough is what
                  happens next, not the hero. */}
              <div className="overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card">
                <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-pink-100 via-pink-50 to-pure px-5 py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-pink-600">
                      The first five minutes
                    </p>
                    <p className="mt-1 font-display text-xl font-bold tracking-tight text-plum">
                      Hello <span className="text-grad">→ live</span>
                    </p>
                  </div>
                  <span className="rounded-full bg-pure px-3 py-1 text-[10px] font-bold text-plum/60 shadow-sm ring-1 ring-plum/10">
                    {steps.length} steps
                  </span>
                </div>

                {/* story-style progress, one segment per step */}
                <div className="flex gap-1 px-5 pt-4">
                  {steps.map((s, i) => (
                    <span
                      key={s.n}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= active ? 'bg-brand-grad' : 'bg-plum/10'
                      }`}
                    />
                  ))}
                </div>

                <ol className="mx-5 mb-3 mt-2 space-y-0.5 border-l border-dashed border-plum/15 pl-5">
                  {steps.map((s, i) => {
                    const open = i === active
                    return (
                      <li key={s.n} className="relative">
                        <span
                          className={`absolute -left-[2rem] top-2.5 grid h-6 w-6 place-items-center rounded-full text-[9px] font-bold transition-colors ${
                            open
                              ? 'bg-brand-grad text-plum shadow-glow-sm'
                              : 'bg-pink-100 text-pink-600'
                          }`}
                        >
                          {s.n}
                        </span>
                        <a
                          href="#steps"
                          onClick={() => setActive(i)}
                          aria-current={open ? 'step' : undefined}
                          className={`flex items-center gap-2 rounded-xl px-2 py-2 transition-colors ${
                            open ? 'bg-pink-50' : 'hover:bg-pink-50/60'
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-[13px] font-bold leading-tight ${
                                open ? 'text-plum' : 'text-plum/65'
                              }`}
                            >
                              {s.title}
                            </span>
                            <span className="mt-0.5 block truncate text-[10px] text-plum/40">
                              {s.taps[0]}
                            </span>
                          </span>
                          <ChevronRight
                            size={14}
                            className={`shrink-0 transition-transform ${
                              open
                                ? 'translate-x-0.5 text-pink-600'
                                : 'text-plum/25'
                            }`}
                          />
                        </a>
                      </li>
                    )
                  })}
                </ol>

                <div className="flex items-center gap-3 border-t border-plum/10 bg-gradient-to-r from-pink-50 to-pure px-5 py-3.5">
                  <img
                    src="/media/char/bio.png"
                    alt=""
                    className="h-10 w-auto object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-plum">
                      That is the whole setup.
                    </p>
                    <p className="text-[10px] text-plum/45">
                      No forms after this — you are live.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e7f5ec] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#1d7a46]">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the walkthrough as a conversation ──────────────────────────────── */}
      <section id="steps" className="section relative scroll-mt-28 overflow-hidden bg-pink-50">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* the phone stays with the current step on wide screens */}
          <Reveal className="hidden justify-center lg:sticky lg:top-28 lg:flex">
            <PhoneFrame tilt glow="rgba(236,72,153,.3)">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.demo + active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full"
                >
                  <PhoneDemo kind={step.demo} />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </Reveal>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-pink-500/40" />
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                The walkthrough
              </h2>
            </div>

            <div className="space-y-3">
              {steps.map((s, i) => {
                const open = i === active
                return (
                  <Reveal key={s.n} delay={i * 0.04}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={open}
                      className={`w-full rounded-[1.5rem] border p-5 text-left transition-all duration-300 ${
                        open
                          ? 'rounded-bl-md border-transparent bg-brand-grad shadow-[0_18px_38px_-20px_rgba(236,72,153,.55)]'
                          : 'rounded-bl-md border-plum/10 bg-pure hover:border-pink-500/30 hover:shadow-[0_14px_30px_-24px_rgba(58,10,36,.4)]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${
                            open ? 'bg-plum text-pure' : 'bg-pink-100 text-pink-600'
                          }`}
                        >
                          {s.n}
                        </span>
                        <h3 className="flex-1 font-display text-lg font-bold leading-tight text-plum md:text-xl">
                          {s.title}
                        </h3>
                        <ChevronRight
                          size={17}
                          className={`shrink-0 text-plum/40 transition-transform duration-300 ${
                            open ? 'rotate-90 text-plum/60' : ''
                          }`}
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 pl-14 text-sm leading-relaxed text-plum/70">
                              {s.body}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-2 pl-14">
                              {s.taps.map((t, j) => (
                                <span key={t} className="flex items-center gap-2">
                                  <span className="rounded-full bg-pure/65 px-3 py-1 text-xs font-bold text-plum/80">
                                    {t}
                                  </span>
                                  {j < s.taps.length - 1 && (
                                    <ChevronRight size={12} className="text-plum/35" />
                                  )}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 flex items-center justify-end gap-1 text-[10px] font-semibold text-plum/45">
                              Delivered
                              <CheckCheck size={12} className="text-pink-700" />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── feature directory ──────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="wrap">
          <SectionHeading
            title={
              <>
                How to reach <span className="text-grad">every feature</span>
              </>
            }
            sub="Not sure where something lives? Pick a destination and the board shows the exact route, every tap in order, and what is worth knowing before you go."
          />

          {/* A little route map instead of a card grid: every feature is a
              destination down the left rail, and the board draws the taps
              that get you there — the same paths the feature pages use. */}
          <Reveal>
            <div className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-plum/10 bg-pure shadow-card sm:rounded-[2.25rem]">
              {/* map paper */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(58,10,36,.10) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pink-200/50 blur-3xl"
              />

              <div className="relative grid lg:grid-cols-[300px_1fr]">
                {/* the destinations rail */}
                <div className="border-b border-plum/10 bg-gradient-to-b from-pink-50/90 to-pure/80 p-3 sm:p-4 lg:border-b-0 lg:border-r">
                  <div className="flex items-center justify-between gap-2 px-1.5 pb-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-pink-600">
                      Pick a destination
                    </p>
                    <span className="shrink-0 rounded-full bg-pure px-2 py-0.5 text-[9px] font-bold text-plum/45 ring-1 ring-plum/10">
                      {features.length} places
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:pb-0">
                    {features.map((f) => {
                      const Icon = f.icon
                      const on = f.slug === dest
                      return (
                        <button
                          key={f.slug}
                          type="button"
                          onClick={() => setDest(f.slug)}
                          aria-pressed={on}
                          className={`flex w-[192px] shrink-0 items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-all duration-300 lg:w-auto ${
                            on
                              ? 'border-transparent bg-brand-grad shadow-[0_10px_24px_-16px_rgba(236,72,153,.7)]'
                              : 'border-transparent hover:border-plum/10 hover:bg-pure'
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                              on
                                ? 'bg-pure/70 text-pink-600'
                                : 'bg-pink-100 text-pink-600'
                            }`}
                          >
                            <Icon size={15} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate text-[12px] font-bold leading-tight ${
                                on ? 'text-plum' : 'text-plum/70'
                              }`}
                            >
                              {f.name}
                            </span>
                            <span
                              className={`mt-0.5 block truncate text-[9px] leading-tight ${
                                on ? 'text-plum/55' : 'text-plum/40'
                              }`}
                            >
                              {f.tagline}
                            </span>
                          </span>
                          <ChevronRight
                            size={13}
                            className={`shrink-0 ${
                              on ? 'text-plum/60' : 'text-plum/20'
                            }`}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* the board, drawing the route to the selected feature */}
                <div className="p-4 sm:p-6 md:p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={destFeature.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-pink-600">
                            Route {String(destIndex + 1).padStart(2, '0')} ·{' '}
                            {destStops.length} stops
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-plum md:text-3xl">
                            {destFeature.name}
                          </h3>
                          <p className="mt-0.5 text-sm text-plum/50">
                            {destFeature.tagline}
                          </p>
                        </div>
                        <span
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-pure shadow-glow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${destFeature.color}, #ff8fc4)`,
                          }}
                        >
                          <DestIcon size={22} />
                        </span>
                      </div>

                      {/* the dashed path down the board */}
                      <div className="relative mt-6 pl-1">
                        <span
                          aria-hidden
                          className="absolute bottom-4 left-[15px] top-4 border-l-2 border-dashed border-pink-300"
                        />
                        <ol className="space-y-3">
                          {destStops.map((stop, i) => {
                            const last = i === destStops.length - 1
                            return (
                              <motion.li
                                key={`${destFeature.slug}-${stop}`}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.07 * i,
                                  duration: 0.3,
                                }}
                                className="relative flex items-center gap-3"
                              >
                                <span
                                  className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ring-4 ring-pure ${
                                    last
                                      ? 'bg-brand-grad text-plum shadow-glow-sm'
                                      : 'bg-pink-100 text-pink-600'
                                  }`}
                                >
                                  {last ? (
                                    <DestIcon size={14} />
                                  ) : (
                                    String(i + 1).padStart(2, '0')
                                  )}
                                </span>
                                <span
                                  className={`min-w-0 rounded-full px-3 py-1.5 text-[12px] font-bold ${
                                    last
                                      ? 'bg-pink-50 text-plum'
                                      : 'bg-pink-50/60 text-plum/65'
                                  }`}
                                >
                                  {stop}
                                </span>
                                {i === 0 && (
                                  <span className="hidden shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-plum/30 sm:block">
                                    You are here
                                  </span>
                                )}
                              </motion.li>
                            )
                          })}
                        </ol>
                      </div>

                      {/* the full guide, tap by tap — the same steps the
                          feature page walks, never a summary of them */}
                      <div className="mt-6 grid gap-5 border-t border-plum/10 pt-5 sm:grid-cols-[1.25fr_1fr]">
                        <div>
                          <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-plum/40">
                            <MapPin size={11} className="text-pink-600" />
                            Tap by tap
                          </p>
                          <ol className="mt-3 space-y-3">
                            {destSteps.map((t, i) => (
                              <motion.li
                                key={`${destFeature.slug}-step-${t.tap}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.16 + 0.05 * i,
                                  duration: 0.3,
                                }}
                                className="flex gap-2.5"
                              >
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pink-100 text-[9px] font-bold text-pink-600">
                                  {i + 1}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[12px] font-bold leading-tight text-plum">
                                    {t.tap}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] leading-relaxed text-plum/50">
                                    {t.detail}
                                  </span>
                                </span>
                              </motion.li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-plum/40">
                            <Sparkles size={11} className="text-pink-600" />
                            Good to know
                          </p>
                          <ul className="mt-3 space-y-2">
                            {destTips.map((tip) => (
                              <li
                                key={tip}
                                className="flex gap-2 rounded-xl border border-plum/10 bg-pink-50/60 p-2.5 text-[11px] leading-relaxed text-plum/60"
                              >
                                <Check
                                  size={12}
                                  className="mt-0.5 shrink-0 text-pink-600"
                                />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 border-t border-plum/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-md border-l-2 border-pink-300 pl-2.5 text-[11px] italic leading-relaxed text-plum/45">
                          {destFeature.quote ?? destFeature.tagline}
                        </p>
                        <Link
                          to={`/features/${destFeature.slug}`}
                          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-grad px-4 py-2 text-xs font-bold text-plum transition-transform hover:-translate-y-0.5"
                        >
                          See how it works
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Everything else the app does. They do not need a route of their
              own, but they belong on the page so "every feature" really is
              every feature. */}
          <Reveal delay={0.08}>
            <div className="mt-4 rounded-[1.5rem] border border-plum/10 bg-pure/80 p-4 sm:rounded-[1.75rem] sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-pink-600">
                  Also inside the app
                </p>
                <p className="text-[11px] text-plum/40">
                  {socialFeatures.length} more things that ship with Xelvic.
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {socialFeatures.map((s) => {
                  const Icon = s.icon
                  return (
                    <div
                      key={s.name}
                      className="flex items-start gap-2.5 rounded-xl border border-plum/10 bg-pink-50/40 p-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-pink-100 text-pink-600">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] font-bold leading-tight text-plum">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-plum/50">
                          {s.body}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
