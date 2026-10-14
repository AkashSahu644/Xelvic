import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { artHighlights, artWall, cast, coverFor, mascotFor, poses } from '../../data/characters'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

/* A spread across the roster rather than the first six, so no two tiles sit
   next to each other in the same colour family. */
const featured = ['animeblue', 'teddy', 'kitsune', 'mecha', 'catgirl', 'toon']

/* The drawings arrive on their own opaque backgrounds — black, in this set — so
   the rail lays each one out at full bleed and layers nothing behind it. A tint
   or a glow would only ever be covered up. */

export default function CharacterCast() {
  const tiles = featured
    .map((slug) => cast.find((c) => c.slug === slug))
    .filter((c): c is (typeof cast)[number] => Boolean(c))

  const rail = useRef<HTMLDivElement>(null)
  const nudge = (dir: number) => {
    const el = rail.current
    if (el) el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.75), behavior: 'smooth' })
  }

  return (
    <section className="section relative">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            center={false}
            title={
              <>
                Not one mascot — <span className="text-grad">a whole cast</span>
              </>
            }
            sub={`Every theme pack ships its own character, so the face waiting in your chat changes when you change your look. ${cast.length} of them, one per theme.`}
          />
          <Reveal delay={0.15} className="shrink-0">
            <MagneticButton to="/characters" variant="ghost">
              Meet the cast
            </MagneticButton>
          </Reveal>
        </div>

        {/* six of the roster, each on its own theme tint */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 6) * 0.06} className="h-full">
              <Link
                to="/characters"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 shadow-[0_16px_36px_-22px_rgba(58,10,36,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_56px_-24px_rgba(58,10,36,.55)]"
              >
                <div className="relative grid aspect-[3/4] place-items-center overflow-hidden">
                  <img
                    src={coverFor(c.slug)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/35 to-plum/10" />

                  <img
                    src={mascotFor(c.slug, 'typing')}
                    alt={`${c.name} character`}
                    loading="lazy"
                    className="relative h-[72%] w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-[13px] font-bold leading-tight text-pure">{c.name}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-pure/60">{c.note}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* the three base poses, kept quiet underneath */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-6 rounded-[2rem] border border-plum/[0.08] bg-pink-50 px-6 py-7 sm:flex-row sm:justify-between md:px-9">
            <div className="flex items-center gap-5">
              <div className="flex -space-x-4">
                {poses.map((p) => (
                  <span
                    key={p.key}
                    className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border-2 border-pure bg-pure shadow-[0_8px_18px_-8px_rgba(58,10,36,.4)]"
                  >
                    <img
                      src={p.src}
                      alt={`${p.label} pose`}
                      loading="lazy"
                      className="h-11 w-auto object-contain"
                    />
                  </span>
                ))}
              </div>
              <div>
                <h3 className="font-display font-bold text-plum">
                  Three poses underneath it all
                </h3>
                <p className="mt-1 text-sm text-plum/55">
                  Bio, typing and wait — the base set every theme builds on.
                </p>
              </div>
            </div>

            <Link
              to="/characters"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
            >
              Meet all {cast.length}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        {/* concept art — a browseable rail; the full wall lives on /characters */}
        <Reveal delay={0.15}>
          <div className="mt-6 rounded-[2.5rem] border border-plum/[0.08] bg-pure p-6 shadow-card md:p-9">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-pink-500/40" />
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                    Concept art
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-plum md:text-3xl">
                  Drawn along the way
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-plum/55">
                  Alternate poses and side characters that live outside the theme packs —
                  these don't ship inside the app. Nine of the eighteen drawings.
                </p>
              </div>

              {/* rail controls — desktop only, phones just swipe */}
              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  aria-label="Previous drawings"
                  className="grid h-10 w-10 place-items-center rounded-full border border-plum/15 text-plum/55 transition-colors hover:border-pink-500/50 hover:bg-pink-50 hover:text-plum"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  aria-label="More drawings"
                  className="grid h-10 w-10 place-items-center rounded-full border border-plum/15 text-plum/55 transition-colors hover:border-pink-500/50 hover:bg-pink-50 hover:text-plum"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* the rail */}
            <div className="relative mt-8">
              {/* negative margins let the rail run to the card edges while the
                  padding keeps the first and last drawing clear of them */}
              <div
                ref={rail}
                className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:-mx-9 md:px-9"
              >
                {artHighlights.map((p) => (
                  <Link
                    key={p.key}
                    to="/characters"
                    className="group relative w-[172px] shrink-0 snap-start overflow-hidden rounded-3xl bg-plum shadow-[0_18px_40px_-24px_rgba(58,10,36,.7)] ring-1 ring-plum/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(236,72,153,.55)] hover:ring-pink-500/40 sm:w-[198px]"
                  >
                    <img
                      src={p.src}
                      alt={`${p.name} — ${p.pose}`}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-4 pb-4 pt-14">
                      <span className="block text-sm font-bold leading-tight text-pure">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-tight text-pure/60">
                        {p.pose}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* right-edge fade — the cue that the rail keeps going */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -right-6 w-16 bg-gradient-to-l from-pure to-transparent md:-right-9"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-plum/40">
                {artHighlights.length} characters · {artWall.length} drawings in all
              </p>
              <Link
                to="/characters"
                className="group inline-flex items-center gap-2 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
              >
                See all {artWall.length} drawings
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
