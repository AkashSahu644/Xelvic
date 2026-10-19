import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCheck,
  ChevronRight,
  Heart,
  Images,
  MessageCircle,
  Moon,
  Palette,
  Send,
  Settings,
  Shirt,
  Sparkles,
  Sun,
  Users,
  Zap,
} from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import MagneticButton from '../components/ui/MagneticButton'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import {
  cast,
  coverFor,
  mascotFor,
  pageArtCast,
  poseCount,
  poses,
  sightings,
} from '../data/characters'
import {
  characterThemeCount,
  characterThemes,
  colourThemeCount,
  colourThemes,
  lightCoverCount,
  pageArtCount,
  themeCount,
  themePacks,
  wallpapers,
} from '../data/themes'

type Filter = 'all' | 'character' | 'colour'
type PoseKey = 'typing' | 'wait'

const poseTabs: { key: PoseKey; label: string }[] = [
  { key: 'typing', label: 'Typing' },
  { key: 'wait', label: 'Wait' },
]

/**
 * Themes & Drip — and The Cast, on the same page.
 *
 * The old split made the visitor learn the wardrobe twice: one page for the
 * colours, another for the faces that come with them. They are the same
 * purchase, so they are the same page now. The cast lives under `#cast`; the
 * old `/characters` URL redirects here.
 *
 * The design borrows the grammar of the apps people already post in:
 * Instagram's profile header, story rings and grid; Snapchat's full-bleed
 * story card; WhatsApp's bubbles, ticks and delivered marks. Every count comes
 * from `data/themes` and `data/characters`, both read off the APK asset tree.
 */
export default function Themes() {
  useSEO()

  const [filter, setFilter] = useState<Filter>('all')
  const [light, setLight] = useState(false)
  const [theme, setTheme] = useState(cast[0])
  const [pose, setPose] = useState<PoseKey>('typing')

  const packs =
    filter === 'all'
      ? themePacks
      : filter === 'character'
        ? characterThemes
        : colourThemes

  const pickTheme = (next: (typeof cast)[number]) => {
    setTheme(next)
    setPose('typing')
  }

  return (
    <>
      {/* ── hero: the app as a profile, the cast as a story ────────────────── */}
      <section className="relative overflow-hidden pb-12 pt-[calc(7.5rem+env(safe-area-inset-top))] md:pb-16 md:pt-[calc(9.5rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-[min(460px,70vw)] w-[min(460px,70vw)] rounded-full bg-pink-200/50 blur-[110px]" />
          <div className="absolute -right-24 top-40 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-pink-300/40 blur-[130px]" />
        </div>

        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <Reveal>
              {/* Instagram-style profile header, using the real asset counts */}
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
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-plum">
                    xelvic
                    <BadgeCheck size={17} className="text-pink-600" />
                  </p>
                  <p className="text-xs font-semibold text-plum/45">
                    {themeCount} themes · {characterThemeCount} characters ·{' '}
                    {pageArtCount} page illustrations
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-brand-grad px-4 py-1.5 text-xs font-bold text-plum">
                  Wearing it
                </span>
              </div>

              <h1 className="mt-8 font-display text-[clamp(2.5rem,8.5vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.4rem,5.8vw,4.5rem)]">
                One wardrobe. <span className="text-grad">A whole cast.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/60">
                Themes, Drip and the cast, all on one page. Pick one of {themeCount}{' '}
                looks and it changes the colour of the app and the face waiting in
                your chats — then wear it on your profile.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton to="/download" variant="glow">
                  Get Xelvic
                </MagneticButton>
                <a
                  href="#themes"
                  className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 bg-pure px-5 py-2.5 text-sm font-bold text-plum transition-colors hover:border-pink-500/40"
                >
                  Browse all {themeCount}
                  <ArrowRight size={15} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['Character art', 'Light & dark covers', 'Drip wearables'].map((t) => (
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
          </div>

          {/* the phone, dressed in whichever face is selected */}
          <Reveal delay={0.12} className="relative flex justify-center">
            <div className="relative">
              <PhoneFrame drift tilt size="lg" glow="rgba(236,72,153,.35)">
                <div className="relative h-full w-full overflow-hidden bg-plum">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={theme.slug}
                      src={coverFor(theme.slug)}
                      alt=""
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/30 to-plum/5" />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={theme.slug}
                      src={mascotFor(theme.slug, 'typing')}
                      alt={`${theme.name} character`}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      className="absolute left-1/2 top-[15%] h-[46%] w-auto max-w-[78%] -translate-x-1/2 object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,.45)]"
                    />
                  </AnimatePresence>

                  {/* snap-style story progress */}
                  <div className="absolute inset-x-4 top-9 z-10 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-0.5 flex-1 rounded-full ${
                          i === 0 ? 'bg-pure' : 'bg-pure/30'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-x-4 top-12 z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-plum/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-pure backdrop-blur">
                      <Zap size={11} className="text-pink-300" />
                      New story
                    </span>
                    <Camera size={17} className="text-pure/80" />
                  </div>

                  <div className="absolute inset-x-4 bottom-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pure/60">
                      Wearing this theme
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-display text-xl font-bold text-pure">
                      {theme.name}
                      <span aria-hidden>{theme.emoji}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-pure/70">{theme.note}</p>
                  </div>
                </div>
              </PhoneFrame>

              {/* pinned cover cards — the app's own covers */}
              <div className="pointer-events-none absolute -left-7 top-16 hidden w-24 rotate-[-7deg] overflow-hidden rounded-2xl border-2 border-pure shadow-card-dark sm:block">
                <img src="/media/themes/covers/sakura.png" alt="" className="aspect-[3/4] w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-plum/70 px-2 py-1 text-[10px] font-bold text-pure">
                  Sakura
                </span>
              </div>
              <div className="pointer-events-none absolute -right-6 bottom-20 hidden w-24 rotate-[6deg] overflow-hidden rounded-2xl border-2 border-pure shadow-card-dark sm:block">
                <img src="/media/themes/covers/aurora.png" alt="" className="aspect-[3/4] w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-plum/70 px-2 py-1 text-[10px] font-bold text-pure">
                  Aurora
                </span>
              </div>

              <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-plum/10 bg-pure px-4 py-2 text-xs font-bold text-plum shadow-card">
                <Heart size={13} className="fill-pink-500 text-pink-500" />
                This is the one you are wearing
              </span>
            </div>
          </Reveal>
        </div>

        {/* story rail — all seventeen faces, the way a social app would show them */}
        <div className="wrap mt-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-plum">The whole cast</h2>
            <span className="text-xs font-semibold text-plum/40">
              Tap a face to load its look
            </span>
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cast.map((c) => {
              const active = c.slug === theme.slug
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => pickTheme(c)}
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

      {/* ── the cast: story stage + picker ─────────────────────────────────── */}
      <section id="cast" className="section relative scroll-mt-28 overflow-hidden bg-pink-50">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pure px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
                <Users size={14} />
                The cast
              </span>
              <h2 className="mt-5 font-display text-[clamp(2rem,7vw,2.5rem)] font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
                Every theme comes with <span className="text-grad">a face</span>.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-plum/60">
                Xelvic does not have one mascot. It has a cast: {characterThemeCount}{' '}
                characters, each shipped with its own theme, plus {poseCount} shared
                poses that do the small jobs in the interface.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* the story card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-plum/10 bg-plum shadow-card">
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

                {/* story chrome */}
                <div className="absolute inset-x-4 top-4 flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-0.5 flex-1 rounded-full ${
                        i === 0 ? 'bg-pure' : 'bg-pure/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="absolute left-4 top-8 inline-flex items-center gap-1.5 rounded-full bg-plum/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-pure backdrop-blur">
                  <Camera size={11} className="text-pink-300" />
                  Story · {cast.length} faces
                </span>

                <div className="absolute right-4 top-8 flex gap-1 rounded-full border border-pure/25 bg-plum/45 p-1 backdrop-blur">
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
                    <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-pure/45">
                      Sent from Xelvic
                      <CheckCheck size={11} />
                    </p>
                  </div>
                  <span className="shrink-0 text-3xl" aria-hidden>
                    {theme.emoji}
                  </span>
                </div>
              </div>
            </div>

            {/* the picker */}
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
                <CheckCheck size={13} className="mt-0.5 shrink-0 text-pink-600" />
                {pageArtCast.length} of the {cast.length} packs also ship a full-page
                illustration on top of the typing and wait art.
              </p>
            </div>
          </div>

          {/* the three shared poses, told as a conversation */}
          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pure px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
                <MessageCircle size={14} />
                Underneath it all
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-plum md:text-3xl">
                Three poses, <span className="text-grad">three jobs</span>
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-plum/55">
                Before a theme is applied, these are the drawings the app reaches
                for. Each one appears at a different moment.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[1.75rem] border border-plum/10 bg-pure shadow-card">
                <div className="flex items-center gap-3 border-b border-plum/10 bg-pink-50 px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-pure p-0.5">
                    <img
                      src={mascotFor(theme.slug, 'typing')}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-plum">Xelvic</p>
                    <p className="text-[11px] font-semibold text-pink-600">online</p>
                  </div>
                  <span className="ml-auto flex items-center gap-3 text-plum/40">
                    <Camera size={16} />
                    <Send size={15} />
                  </span>
                </div>

                <div className="space-y-3 bg-[#fdf2f8] px-4 py-5 sm:px-5">
                  {poses.map((p, i) => {
                    const outgoing = i % 2 === 1
                    return (
                      <div
                        key={p.key}
                        className={`flex ${outgoing ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-[0_8px_20px_-16px_rgba(58,10,36,.5)] ${
                            outgoing
                              ? 'rounded-br-md bg-brand-grad text-plum'
                              : 'rounded-bl-md bg-pure text-plum'
                          }`}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-60">
                            {p.label} · {p.role}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed">{p.detail}</p>
                        </div>
                      </div>
                    )
                  })}

                  {/* The app's typing indicator is the character itself, drawn
                      at the foot of the thread — not a bubble with three dots. */}
                  <div className="flex justify-center pt-1">
                    <img
                      src={mascotFor(theme.slug, 'typing')}
                      alt={`${theme.name} typing`}
                      className="h-14 w-auto animate-sway object-contain"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── full-page illustrations, as an Instagram grid ──────────────────── */}
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
                <a
                  href="#themes"
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
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── where the cast shows up: chat bubbles ──────────────────────────── */}
      <section className="section relative overflow-hidden pt-0">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,7vw,2.5rem)] font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
                Where the cast <span className="text-grad">shows up</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-plum/60">
                Four everyday moments where a Xelvic character does the talking
                for you.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
        </div>
      </section>

      {/* ── the wall ───────────────────────────────────────────────────────── */}
      <section id="themes" className="section relative scroll-mt-28 overflow-hidden bg-pink-50">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pure px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
                <Palette size={14} />
                The theme wall
              </span>
              <h2 className="mt-5 font-display text-[clamp(2rem,7vw,2.5rem)] font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
                {themeCount} looks. <span className="text-grad">One app.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-plum/60">
                {characterThemeCount} of them bring a character along. The other{' '}
                {colourThemeCount} change the colour of everything — every screen,
                every bubble, every button.
              </p>
            </Reveal>
          </div>

          {/* filters + the light/dark flip */}
          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-2">
                {(
                  [
                    ['all', `All ${themeCount}`],
                    ['character', `Character ${characterThemeCount}`],
                    ['colour', `Colour ${colourThemeCount}`],
                  ] as [Filter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={filter === key}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                      filter === key
                        ? 'bg-plum text-pure shadow-card'
                        : 'border border-plum/12 bg-pure text-plum/65 hover:border-pink-500/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-plum/12 bg-pure p-1">
                <button
                  type="button"
                  onClick={() => setLight(false)}
                  aria-pressed={!light}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    !light ? 'bg-plum text-pure' : 'text-plum/55'
                  }`}
                >
                  <Moon size={13} />
                  Night
                </button>
                <button
                  type="button"
                  onClick={() => setLight(true)}
                  aria-pressed={light}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    light ? 'bg-brand-grad text-plum' : 'text-plum/55'
                  }`}
                >
                  <Sun size={13} />
                  Light
                </button>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {packs.map((t, i) => {
              const src = light && t.coverLight ? t.coverLight : t.cover
              return (
                <Reveal key={t.slug} delay={(i % 4) * 0.03}>
                  <article className="group overflow-hidden rounded-[1.4rem] border border-plum/10 bg-pure shadow-[0_14px_34px_-24px_rgba(58,10,36,.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="relative aspect-[3/4] overflow-hidden bg-pink-100">
                      <img
                        src={src}
                        alt={`${t.name} theme cover`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/10 to-transparent" />

                      {t.character && (
                        <img
                          src={`/media/themes/${t.slug}/typing.png`}
                          alt=""
                          loading="lazy"
                          className="absolute left-1/2 top-[8%] h-[52%] w-auto max-w-[72%] -translate-x-1/2 object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,.45)] transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      )}

                      <span className="absolute left-2.5 top-2.5 rounded-full bg-pure/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-plum/70 backdrop-blur">
                        {t.character ? 'Character' : 'Colour'}
                      </span>

                      <div className="absolute inset-x-3 bottom-3">
                        <p className="flex items-center gap-1 font-display text-sm font-bold text-pure">
                          <span aria-hidden>{t.emoji}</span>
                          {t.name}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-pure/65">
                          {t.note}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-plum/45">
                        <Palette size={11} className="text-pink-600" />
                        {t.hasLight ? 'Night + light' : 'Night only'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-600">
                        Wear it
                        <ChevronRight size={11} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 text-center text-xs font-semibold text-plum/40">
            {light
              ? `${lightCoverCount} of ${themeCount} themes ship a light cover. Alone, Anime Blue, Catgirl and Teddy are night-only.`
              : 'Every cover on this wall is taken from the app build.'}
          </p>
        </div>
      </section>

      {/* ── Drip ───────────────────────────────────────────────────────────── */}
      <section id="drip" className="section relative scroll-mt-28 overflow-hidden">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pink-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
              <Shirt size={14} />
              Drip
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,7vw,2.5rem)] font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
              Wear the whole look, <span className="text-grad">not just the background</span>.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-plum/60">
              A theme is not a coat of paint. It decides the character in your
              convos and the colour of the app, and Drip is how you wear it on
              your profile.
            </p>

            <div className="mt-8 space-y-3">
              {[
                {
                  icon: Shirt,
                  title: 'Wear the theme',
                  body: 'Apply Theme flips every screen to the look you picked — no restart, no downloading a skin.',
                },
                {
                  icon: Images,
                  title: 'Pick the picture',
                  body: 'Which picture to wear with this theme is your call: the pack cover or one of your own.',
                },
                {
                  icon: Settings,
                  title: 'Change it anytime',
                  body: 'You can change or remove the theme anytime from Settings. Nothing is one-way.',
                },
              ].map((d) => {
                const Icon = d.icon
                return (
                  <div
                    key={d.title}
                    className="flex items-start gap-4 rounded-2xl border border-plum/10 bg-pure p-4 shadow-[0_12px_28px_-22px_rgba(58,10,36,.4)]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-grad text-plum">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-plum">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-plum/55">{d.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#cast"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
              >
                Meet the {characterThemeCount} characters
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          {/* a profile card, the way the app shows it */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-grad-soft blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src="/media/themes/covers/sakura.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-pure via-transparent to-transparent" />
                </div>

                <div className="relative px-6 pb-6">
                  <div className="-mt-12 flex items-end justify-between">
                    <span
                      className="grid place-items-center rounded-full p-[3px]"
                      style={{
                        background:
                          'conic-gradient(from 200deg,#ff9ecb,#ec4899,#9d174d,#ff9ecb)',
                      }}
                    >
                      <span className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-pure p-1.5">
                        <img
                          src="/media/themes/kitsune/typing.png"
                          alt="A theme character"
                          className="h-full w-full object-contain"
                        />
                      </span>
                    </span>
                    <span className="rounded-full bg-brand-grad px-3 py-1 text-[11px] font-bold text-plum">
                      Wearing this theme
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-plum">Your profile</h3>
                  <p className="text-sm font-semibold text-plum/45">@you · Drip on</p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      '/media/themes/alone/profile.jpg',
                      '/media/themes/kitsune/page.png',
                      '/media/themes/catgirl/convo.jpg',
                    ].map((src) => (
                      <span key={src} className="overflow-hidden rounded-xl border border-plum/10">
                        <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4 border-t border-plum/10 pt-4 text-xs font-semibold text-plum/55">
                    <span className="inline-flex items-center gap-1.5">
                      <Heart size={13} className="text-pink-600" />
                      Wearing it
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle size={13} className="text-pink-600" />
                      Shared look
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5">
                      <Send size={13} className="text-pink-600" />
                      Send
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── how to put one on, as a WhatsApp thread ────────────────────────── */}
      <section className="section relative overflow-hidden bg-pink-50">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pure px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
              <Zap size={14} />
              Three taps
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,7vw,2.5rem)] font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
              On in <span className="text-grad">three taps</span>.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-plum/60">
              Your profile → Settings → Appearance → Themes. Preview it live,
              then apply it and close the app — it is already everywhere.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-plum/40">
              <CheckCheck size={14} className="text-pink-600" />
              Delivered · no restart, no download
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[1.75rem] border border-plum/10 bg-pure shadow-card">
              <div className="flex items-center gap-3 border-b border-plum/10 bg-pink-50 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-brand-grad p-0.5">
                  <img
                    src="/media/brand/xelvic.png"
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-plum">Settings · Appearance</p>
                  <p className="text-[11px] font-semibold text-pink-600">Themes</p>
                </div>
                <span className="ml-auto flex items-center gap-3 text-plum/40">
                  <Settings size={15} />
                  <Palette size={15} />
                </span>
              </div>

              <div className="relative px-4 py-5 sm:px-5">
                <img
                  src={wallpapers[0].src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-15"
                />
                <span className="absolute inset-0 bg-[#fdf2f8]/80" />

                <div className="relative space-y-3">
                  {[
                    {
                      n: '01',
                      title: 'Open Settings',
                      body: 'Under your profile. Appearance is the row you want.',
                      outgoing: false,
                    },
                    {
                      n: '02',
                      title: 'Pick a theme',
                      body: `Preview any of the ${themeCount} looks live — cover, character and all.`,
                      outgoing: true,
                    },
                    {
                      n: '03',
                      title: 'Apply Theme',
                      body: 'The colour and the character land on every screen at once.',
                      outgoing: false,
                    },
                  ].map((s) => (
                    <div
                      key={s.n}
                      className={`flex ${s.outgoing ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-[0_8px_20px_-16px_rgba(58,10,36,.5)] ${
                          s.outgoing
                            ? 'rounded-br-md bg-brand-grad text-plum'
                            : 'rounded-bl-md bg-pure text-plum'
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-60">
                          {s.n} · {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-4 flex items-center gap-2 rounded-full bg-pure px-4 py-2.5 text-xs text-plum/35 shadow-[0_8px_20px_-18px_rgba(58,10,36,.5)]">
                  <span className="flex-1">Message</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-grad text-plum">
                    <Send size={13} />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── wallpapers ─────────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-pink-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-pink-600">
                  <Images size={14} />
                  Chat wallpapers
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  The walls behind <span className="text-grad">your people</span>
                </h2>
              </Reveal>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-plum/50">
              Separate from the theme, so a convo can keep its own view even when
              the rest of the app changes.
            </p>
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {wallpapers.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.04} className="shrink-0">
                <div className="relative aspect-[9/16] w-36 overflow-hidden rounded-2xl border border-plum/10 shadow-card sm:w-44">
                  <img
                    src={w.src}
                    alt={w.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/80 to-transparent px-3 py-2 text-xs font-bold text-pure">
                    {w.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
