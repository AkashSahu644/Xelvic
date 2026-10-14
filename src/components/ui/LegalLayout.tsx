import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, LifeBuoy, Mail } from 'lucide-react'
import PageHero from '../layout/PageHero'
import Reveal from './Reveal'

/**
 * One clause of a policy. `body` is prose, `points` is the same thing broken
 * into bullets where a clause is really a list, and `app` is a line lifted
 * word-for-word out of the app itself — the panel that renders it is how a
 * reader can check a claim against the build rather than take our word for it.
 */
export type LegalSection = {
  heading: string
  body: string[]
  points?: string[]
  app?: string
}

type Props = {
  title: string
  updated: string
  intro: string
  /** The whole document in a handful of lines, above the fold of the content column. */
  inShort?: string[]
  /** The four or five numbers that matter, as a strip of cards. */
  glance?: { label: string; value: string }[]
  sections: LegalSection[]
  /** Where to go next — chips at the foot of the column. */
  related?: { label: string; to: string }[]
  /** The address a reader can write to about this document. */
  contact?: { label: string; href: string; note: string }
  /** How long the document takes to read, shown next to the date. */
  minutes?: number
  wall?: string
}

/**
 * The numbered mark beside each heading. Numbering matters here more than it
 * does on a marketing page: a clause can be referred to by number in a support
 * thread, and the table of contents counts the same way.
 */
function Marker({ n }: { n: number }) {
  return (
    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-grad font-display text-xs font-bold text-white shadow-glow-sm">
      {n}
    </span>
  )
}

export default function LegalLayout({
  title,
  updated,
  intro,
  inShort,
  glance,
  sections,
  related,
  contact,
  minutes,
  wall,
}: Props) {
  const [active, setActive] = useState(0)

  /* Scroll spy for the table of contents. One observer over every section, and
     the topmost one still on screen wins. */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-legal-section]'))
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (onScreen[0]) setActive(Number((onScreen[0].target as HTMLElement).dataset.legalSection))
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [sections.length])

  return (
    <>
      <PageHero title={title} sub={intro} wall={wall} />

      <section className="pb-24">
        <div className="wrap grid gap-12 lg:grid-cols-[286px_minmax(0,1fr)]">
          {/* ————— the rail ————— */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(7rem+env(safe-area-inset-top))]">
              <div className="rounded-2xl border border-plum/10 bg-pure p-5 shadow-[0_2px_18px_rgba(157,23,77,.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
                  On this page
                </p>
                <nav className="mt-4 space-y-0.5">
                  {sections.map((s, i) => {
                    const on = active === i
                    return (
                      <a
                        key={s.heading}
                        href={`#s${i}`}
                        className={`group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm leading-snug transition-colors ${
                          on
                            ? 'bg-pink-50 font-semibold text-plum'
                            : 'text-plum/55 hover:bg-pink-50/60 hover:text-plum'
                        }`}
                      >
                        <span
                          className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            on ? 'bg-[#ec4899]' : 'bg-plum/20 group-hover:bg-plum/40'
                          }`}
                        />
                        {s.heading}
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="mt-4 space-y-2 px-2">
                <p className="flex items-center gap-2 text-xs text-plum/40">
                  <Clock size={13} />
                  Last updated {updated}
                </p>
                {minutes && (
                  <p className="flex items-center gap-2 text-xs text-plum/40">
                    <span className="h-1 w-1 rounded-full bg-plum/30" />
                    About {minutes} min to read
                  </p>
                )}
              </div>

              {related && related.length > 0 && (
                <div className="mt-6 px-2">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
                    Read with this
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {related.map((r) => (
                      <Link key={r.to} to={r.to} className="chip">
                        {r.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ————— the document ————— */}
          <div className="min-w-0 max-w-3xl">
            <p className="mb-6 flex items-center gap-2 text-sm text-plum/40 lg:hidden">
              <Clock size={14} />
              Last updated {updated}
            </p>

            {/* The rail above is `hidden lg:block`, which on a phone left a
                reader of a twelve-clause policy with nothing to jump by — and
                a phone is where a long document most needs a way through it.
                It is the same list, folded into a native disclosure: no state
                to keep, no script, and open and close already behave the way a
                thumb expects them to. It sits above the summary, so the thing
                the page is actually for is still the first thing on screen. */}
            <details className="group mb-8 rounded-2xl border border-plum/10 bg-pure px-5 py-4 shadow-[0_2px_18px_rgba(157,23,77,.06)] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-plum [&::-webkit-details-marker]:hidden">
                On this page
                <span
                  aria-hidden
                  className="shrink-0 font-display text-lg font-bold leading-none text-plum/35 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <nav className="mt-3 space-y-0.5">
                {sections.map((s, i) => (
                  <a
                    key={s.heading}
                    href={`#s${i}`}
                    className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm leading-snug text-plum/60 active:bg-pink-50"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-plum/20" />
                    {s.heading}
                  </a>
                ))}
              </nav>
            </details>

            {/* the whole thing in a handful of lines */}
            {inShort && inShort.length > 0 && (
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-pink-500/25 bg-pink-50 p-6 sm:p-7">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue/20 blur-3xl" />
                  <p className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-pink-700">
                    In short
                  </p>
                  <ul className="relative mt-4 space-y-3">
                    {inShort.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-grad">
                          <Check size={12} />
                        </span>
                        <span className="text-[15px] leading-relaxed text-plum/75">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* the numbers, as cards */}
            {glance && glance.length > 0 && (
              <Reveal delay={0.05}>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {glance.map((g) => (
                    <div
                      key={g.label}
                      className="rounded-2xl border border-plum/10 bg-pure p-4 shadow-[0_2px_14px_rgba(157,23,77,.05)]"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-plum/40">
                        {g.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg font-bold leading-tight text-plum">
                        {g.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <div className="mt-12 space-y-12">
              {sections.map((s, i) => (
                <Reveal key={s.heading}>
                  <section
                    id={`s${i}`}
                    data-legal-section={i}
                    /* The anchored heading has to land below the fixed bar, and
                       that bar is taller on a phone with a notch. */
                    className="scroll-mt-[calc(7rem+env(safe-area-inset-top))]"
                  >
                    <div className="flex gap-3.5">
                      <Marker n={i + 1} />
                      <h2 className="font-display text-2xl font-bold leading-tight md:text-[28px]">
                        {s.heading}
                      </h2>
                    </div>

                    <div className="mt-5 space-y-4 sm:pl-[42px]">
                      {s.body.map((p, j) => (
                        <p key={j} className="leading-relaxed text-white/65">
                          {p}
                        </p>
                      ))}

                      {s.points && s.points.length > 0 && (
                        <ul className="space-y-2.5 pt-1">
                          {s.points.map((pt) => (
                            <li key={pt} className="flex gap-3">
                              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ec4899]" />
                              <span className="leading-relaxed text-white/65">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* the app's own words — the receipt for the clause above */}
                      {s.app && (
                        <figure className="mt-5 rounded-2xl border border-plum/10 bg-pure px-5 py-4">
                          <figcaption className="text-[10px] font-bold uppercase tracking-[0.14em] text-plum/40">
                            In the app
                          </figcaption>
                          <blockquote className="mt-2 border-l-2 border-[#ec4899] pl-3.5 text-[15px] italic leading-relaxed text-plum/80">
                            “{s.app}”
                          </blockquote>
                        </figure>
                      )}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* ————— the foot ————— */}
            {contact && (
              <Reveal>
                <div className="mt-14 overflow-hidden rounded-3xl border border-plum/10 bg-pure p-6 shadow-[0_2px_18px_rgba(157,23,77,.06)] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="min-w-0">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-grad text-white shadow-glow-sm">
                        <Mail size={18} />
                      </span>
                      <h3 className="mt-4 font-display text-xl font-bold">
                        Ask us about this page
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                        {contact.note}
                      </p>
                    </div>
                    <a
                      href={contact.href}
                      className="inline-flex max-w-full items-center gap-2 rounded-full bg-brand-grad px-5 py-3 text-sm font-bold text-white shadow-glow-sm transition-transform hover:-translate-y-0.5"
                    >
                      {/* The label on every one of these is an email address,
                          which is one unbreakable token. It is allowed to wrap
                          inside the pill rather than push the pill past the
                          edge of the card on a narrow screen. */}
                      <span className="min-w-0 break-words text-center">{contact.label}</span>
                      <ArrowRight size={15} className="shrink-0" />
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-plum/10 pt-5">
                    {related?.map((r) => (
                      <Link key={r.to} to={r.to} className="chip">
                        {r.label}
                      </Link>
                    ))}
                    <Link
                      to="/help"
                      className="chip inline-flex items-center gap-1.5 font-bold text-pink-600"
                    >
                      <LifeBuoy size={14} />
                      Help Center
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
