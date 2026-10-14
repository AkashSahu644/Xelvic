import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { artSets, cast, coverFor, mascotFor, poses, sightings } from '../data/characters'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'
import { useSEO } from '../hooks/usePageMeta'

type PoseKey = 'typing' | 'wait'

const poseTabs: { key: PoseKey; label: string }[] = [
  { key: 'typing', label: 'Typing' },
  { key: 'wait', label: 'Wait' },
]

export default function Characters() {
  const [theme, setTheme] = useState(cast[0])
  const [pose, setPose] = useState<PoseKey>('typing')

  useSEO({
    title: 'The Cast — meet the Xelvic characters',
    description:
      'Every Xelvic theme ships its own character. Meet the cast, and see where they turn up while you chat, call and hang out.',
  })

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden pt-[calc(8rem+env(safe-area-inset-top))] pb-16 md:pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24">
        <div className="aurora-bg aurora-bg--drift" />
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 text-center lg:text-left">
            <span className="eyebrow mb-6">
              <span className="h-2 w-2 rounded-full bg-blue glow-dot" />
              The Cast
            </span>

            <h1 className="font-display text-[2.7rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.9rem]">
              One app.
              <br />
              <span className="text-grad-anim">Seventeen characters.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 lg:mx-0">
              Xelvic doesn't have a mascot — it has a cast. Every theme pack ships its own
              character artwork, so the face waiting in your chat changes when you change
              your look.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton to="/features/themes" variant="glow">
                Browse the themes
              </MagneticButton>
              <MagneticButton to="/how-it-works" variant="ghost">
                See how it works
              </MagneticButton>
            </div>
          </div>

          {/* the pose that fronts everything */}
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center">
            <span className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue/25 blur-[90px] sm:h-80 sm:w-80" />
            <div className="animate-sway origin-bottom">
              <motion.img
                src="/media/char/bio.png"
                alt="The Xelvic mascot"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative w-[min(270px,80vw)] drop-shadow-[0_30px_60px_rgba(236,72,153,0.3)] sm:w-[320px] lg:w-[370px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the three poses ---------------- */}
      <section className="section relative">
        <div className="wrap">
          <SectionHeading
            eyebrow="Three poses, three jobs"
            title={
              <>
                Same character, <span className="text-grad">doing different work</span>
              </>
            }
            sub="Before any theme is applied, Xelvic ships three base poses. Each one has a single job in the interface."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {poses.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 bg-pink-50 shadow-[0_18px_44px_-24px_rgba(58,10,36,.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_64px_-26px_rgba(58,10,36,.5)]">
                  {/* artwork sits on the app's own soft gradient */}
                  <div className="relative grid h-64 place-items-center overflow-hidden bg-gradient-to-b from-pure to-pink-100">
                    <span className="pointer-events-none absolute h-40 w-40 rounded-full bg-blue/20 blur-[60px]" />
                    <img
                      src={p.src}
                      alt={`${p.label} pose`}
                      loading="lazy"
                      className="relative h-52 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-plum/10 bg-pure/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-plum/60 backdrop-blur">
                      {p.label}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-plum">{p.role}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-plum/55">{p.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- theme switcher ---------------- */}
      <section className="section relative overflow-hidden bg-pink-50">
        <div className="wrap">
          <SectionHeading
            eyebrow="The cast"
            title={
              <>
                Change the theme, <span className="text-grad">change the character</span>
              </>
            }
            sub="Pick a theme to see the character that comes with it — and flip between the two poses it ships."
          />

          <Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              {/* -------- stage -------- */}
              <div className="relative overflow-hidden rounded-[2rem] border border-plum/10 shadow-[0_24px_60px_-28px_rgba(58,10,36,.5)]">
                <div className="relative grid aspect-[4/3] place-items-center sm:aspect-[16/11]">
                  {/* the theme's own cover, blurred back */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={theme.slug}
                      src={coverFor(theme.slug)}
                      alt=""
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/45 to-plum/20" />
                  <span className="absolute inset-0 bg-pink-500/10" />

                  {/* the character */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${theme.slug}-${pose}`}
                      src={mascotFor(theme.slug, pose)}
                      alt={`${theme.name} mascot, ${pose} pose`}
                      initial={{ opacity: 0, y: 22, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 0.98 }}
                      transition={{ duration: 0.42, ease: [0.2, 0.7, 0.2, 1] }}
                      className="relative max-h-[62%] w-auto max-w-[62%] object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.45)]"
                    />
                  </AnimatePresence>

                  {/* pose toggle */}
                  <div className="absolute right-4 top-4 flex gap-1 rounded-full border border-pure/25 bg-plum/45 p-1 backdrop-blur">
                    {poseTabs.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setPose(t.key)}
                        aria-pressed={pose === t.key}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 ${
                          pose === t.key
                            ? 'bg-brand-grad text-plum'
                            : 'text-pure/70 hover:text-pure'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* caption */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-pure/55">
                        Theme
                      </p>
                      <h3 className="font-display text-2xl font-bold text-pure">
                        {theme.name}
                      </h3>
                      <p className="mt-1 text-sm text-pure/70">{theme.note}</p>
                    </div>
                    <span className="shrink-0 text-3xl" aria-hidden>
                      {theme.emoji}
                    </span>
                  </div>
                </div>
              </div>

              {/* -------- picker -------- */}
              <div className="rounded-[2rem] border border-plum/10 bg-pure p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-pink-500/40" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                    {cast.length} theme characters
                  </h3>
                </div>

                <div className="mt-6 grid max-h-[26rem] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
                  {cast.map((c) => {
                    const active = c.slug === theme.slug
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setTheme(c)}
                        aria-pressed={active}
                        className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-200 ${
                          active
                            ? 'border-transparent bg-brand-grad shadow-glow-sm'
                            : 'border-plum/10 bg-pure hover:-translate-y-0.5 hover:border-pink-500/40'
                        }`}
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          {c.emoji}
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

                <p className="mt-6 text-xs leading-relaxed text-plum/45">
                  Every theme in the app carries its own <code>typing</code> and{' '}
                  <code>wait</code> artwork. The richer packs add a full{' '}
                  <code>page</code> illustration on top.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- where you meet them ---------------- */}
      <section className="section relative">
        <div className="wrap">
          <SectionHeading
            eyebrow="Out in the app"
            title={
              <>
                Where the cast <span className="text-grad">shows up</span>
              </>
            }
            sub="Four everyday moments where a Xelvic character does the talking for you."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {sightings.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="flex h-full items-start gap-5 rounded-3xl border border-plum/10 bg-pure p-6 shadow-[0_14px_34px_-22px_rgba(58,10,36,.4)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-grad text-plum">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-plum">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-plum/55">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/features/themes"
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
              >
                Explore the themes
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- concept art ---------------- */}
      <section className="section relative">
        <div className="wrap">
          <SectionHeading
            eyebrow="Concept art"
            title={
              <>
                From the <span className="text-grad">art desk</span>
              </>
            }
            sub="Extra character artwork from the Xelvic art desk — alternate poses and side characters that live outside the theme system."
          />

          <div className="mt-14 space-y-12">
            {artSets.map((set) => (
              <Reveal key={set.key}>
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold text-plum">{set.name}</h3>
                    <span className="text-sm text-plum/45">{set.note}</span>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-plum/35">
                    {set.pieces.length} pose{set.pieces.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {set.pieces.map((p) => (
                    <div
                      key={p.key}
                      className="group relative overflow-hidden rounded-3xl border border-plum/10 bg-plum shadow-[0_18px_40px_-24px_rgba(58,10,36,.5)]"
                    >
                      <img
                        src={p.src}
                        alt={`${set.name} — ${p.pose}`}
                        loading="lazy"
                        className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-plum to-transparent" />
                      <span className="absolute inset-x-4 bottom-3.5 text-sm font-bold text-pure">
                        {p.pose}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-center text-xs leading-relaxed text-plum/40">
              Concept art — these drawings do not ship inside the app. The {cast.length}{' '}
              theme characters above are the ones you'll actually meet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="section relative">
        <div className="wrap">
          <div className="noise relative overflow-hidden rounded-[2.5rem] border border-plum/10 bg-pink-50 px-6 py-16 text-center md:px-14">
            <div className="pointer-events-none absolute left-1/2 top-[-30%] h-[min(420px,80vw)] w-[min(560px,130vw)] -translate-x-1/2 rounded-full bg-blue/25 blur-[110px]" />
            <img
              src="/media/char/wait.png"
              alt=""
              loading="lazy"
              className="relative mx-auto w-28 origin-bottom animate-sway sm:w-32"
            />
            <h2 className="relative mt-6 font-display text-3xl font-bold md:text-4xl">
              Pick a character. <span className="text-grad">Make it yours.</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-white/60">
              Download Xelvic free and start with any of the {cast.length} theme characters
              waiting inside.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton to="/download" variant="glow">
                Download free ↓
              </MagneticButton>
              <MagneticButton to="/features/themes" variant="ghost">
                See all themes
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
