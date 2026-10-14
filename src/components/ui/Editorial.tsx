import type { ReactNode } from 'react'
import Reveal from './Reveal'

/**
 * The editorial vocabulary for the company pages — About, Careers, Press, Brand
 * and Contact. It is deliberately icon-free. Those pages are made of type,
 * hairlines and numbers, so the eye lands on the sentence rather than on a grid
 * of glyphs; where the app's own words are worth showing, they are shown as a
 * quote with a pink rule beside it, which reads as evidence rather than as
 * another tile.
 *
 * Everything here is a server-rendered presentational block. There is no state,
 * and nothing depends on a client API.
 */

/* ————————————————————————————————————— the opening ——— */

/** The first paragraph of a page: larger than body copy, narrower than the page. */
export function Lede({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal>
      <p
        className={`max-w-3xl text-xl leading-[1.6] text-plum/75 md:text-[26px] md:leading-[1.5] ${className}`}
      >
        {children}
      </p>
    </Reveal>
  )
}

/* ————————————————————————————————————— the numbers ——— */

/**
 * A strip of figures. Hairlines come from a one-pixel gap over a tinted
 * background rather than from borders, so the cells share edges exactly and
 * nothing doubles up at a breakpoint.
 */
export function Stats({
  items,
  className = '',
}: {
  items: { value: string; label: string; note?: string }[]
  className?: string
}) {
  return (
    <Reveal>
      <dl
        className={`grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      >
        {items.map((s) => (
          <div key={s.label} className="bg-pure px-6 py-7">
            <dd className="font-display text-3xl font-bold leading-none text-plum md:text-4xl">
              {s.value}
            </dd>
            <dt className="mt-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
              {s.label}
            </dt>
            {s.note && (
              <p className="mt-2 text-sm leading-relaxed text-plum/55">{s.note}</p>
            )}
          </div>
        ))}
      </dl>
    </Reveal>
  )
}

/* —————————————————————————————————————— the rows ——— */

/**
 * A label-and-value table for facts that would otherwise become a card each.
 * On a phone the label stacks above the value; on a wide screen it holds a
 * column so the values line up down the page.
 */
export function Rows({
  items,
  className = '',
}: {
  items: { k: string; v: string; note?: string }[]
  className?: string
}) {
  return (
    <Reveal>
      <dl className={`divide-y divide-plum/10 border-y border-plum/10 ${className}`}>
        {items.map((r) => (
          <div key={r.k} className="grid gap-1.5 py-5 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-8">
            <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40 sm:pt-1.5">
              {r.k}
            </dt>
            <dd className="min-w-0">
              <span className="block text-[17px] font-semibold leading-snug text-plum">{r.v}</span>
              {r.note && (
                <span className="mt-2 block text-sm leading-relaxed text-plum/55">{r.note}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}

/* ———————————————————————————————————— the long form ——— */

/** A numbered list with real weight in the numeral — for principles and steps. */
export function Numbered({
  items,
  className = '',
}: {
  items: { t: string; d?: string; app?: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 0.04}>
          <div className="grid gap-3 border-t border-plum/10 py-8 sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-8">
            <span className="font-display text-3xl font-bold leading-none text-plum/15 sm:text-4xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-snug md:text-2xl">{it.t}</h3>
              {it.d && <p className="mt-3 leading-relaxed text-white/60">{it.d}</p>}
              {it.app && (
                <p className="mt-4 max-w-xl border-l-2 border-[#ec4899] pl-4 text-[15px] italic leading-relaxed text-plum/65">
                  “{it.app}”
                </p>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** A dated sequence, read down a page the way a changelog is. */
export function Timeline({
  items,
  className = '',
}: {
  items: { k: string; t: string; d: string }[]
  className?: string
}) {
  return (
    <ol className={className}>
      {items.map((t, i) => (
        <Reveal key={t.k + t.t} delay={i * 0.05}>
          <li className="grid gap-3 border-t border-plum/10 py-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-pink-600 sm:pt-2">
              {t.k}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl font-bold leading-snug md:text-2xl">
                {t.t}
              </span>
              <span className="mt-3 block leading-relaxed text-white/60">{t.d}</span>
            </span>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}

/* ————————————————————————————————————— the voice ——— */

/** A sentence worth stopping on, set large against a thick pink rule. */
export function Pull({
  children,
  by,
  className = '',
}: {
  children: ReactNode
  by?: string
  className?: string
}) {
  return (
    <Reveal>
      <figure className={`border-l-4 border-[#ec4899] pl-6 sm:pl-8 ${className}`}>
        <blockquote className="font-display text-2xl font-bold leading-[1.35] text-plum md:text-[34px] md:leading-[1.28]">
          {children}
        </blockquote>
        {by && (
          <figcaption className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
            {by}
          </figcaption>
        )}
      </figure>
    </Reveal>
  )
}

/* ————————————————————————————————————— the frame ——— */

/** A section heading with an optional kicker above it and a line of context below. */
export function SectionHead({
  kicker,
  title,
  sub,
  className = '',
}: {
  kicker?: string
  title: ReactNode
  sub?: string
  className?: string
}) {
  return (
    <Reveal>
      <div className={className}>
        {kicker && (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-600">
            {kicker}
          </p>
        )}
        <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{sub}</p>}
      </div>
    </Reveal>
  )
}

/** Body copy at a readable measure, as a stack of paragraphs. */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal>
      <div className={`max-w-2xl space-y-4 leading-relaxed text-white/60 ${className}`}>
        {children}
      </div>
    </Reveal>
  )
}

/** A tinted aside — for the one thing on a section a reader must not miss. */
export function Note({
  title,
  children,
  className = '',
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <Reveal>
      <div
        className={`rounded-3xl border border-pink-500/25 bg-pink-50 p-6 sm:p-7 ${className}`}
      >
        {title && (
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-700">
            {title}
          </p>
        )}
        <div className={`leading-relaxed text-plum/75 ${title ? 'mt-3' : ''}`}>{children}</div>
      </div>
    </Reveal>
  )
}

/** Two columns of rules. The headings carry the meaning, so no ticks or crosses. */
export function DoDont({
  dos,
  donts,
  doLabel = 'Do',
  dontLabel = 'Don’t',
}: {
  dos: string[]
  donts: string[]
  doLabel?: string
  dontLabel?: string
}) {
  return (
    <Reveal>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 md:grid-cols-2">
        <div className="bg-pure p-6 sm:p-7">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-600">
            {doLabel}
          </h3>
          <ul className="mt-5">
            {dos.map((d) => (
              <li
                key={d}
                className="border-t border-plum/10 py-3.5 leading-relaxed text-plum/70 first:border-0 first:pt-0"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-pure p-6 sm:p-7">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
            {dontLabel}
          </h3>
          <ul className="mt-5">
            {donts.map((d) => (
              <li
                key={d}
                className="border-t border-plum/10 py-3.5 leading-relaxed text-plum/55 first:border-0 first:pt-0"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

/* ————————————————————————————————————— the tally ——— */

/**
 * A grid of titled items — the icon-free stand-in for a row of icon cards.
 * Where a card grid would put a glyph in a tinted square, this puts a small
 * ordinal and lets the title carry the meaning. Hairlines come from the same
 * one-pixel gap trick as `Stats`, so the cells share edges exactly.
 *
 * `app` prints the line the build itself uses, which is what makes the item
 * checkable rather than decorative.
 */
export function Blocks({
  items,
  cols = 2,
  className = '',
}: {
  items: { t: string; d: string; app?: string }[]
  cols?: 2 | 3 | 4
  className?: string
}) {
  const grid =
    cols === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : cols === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2'

  return (
    <Reveal>
      <div
        className={`grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 ${grid} ${className}`}
      >
        {items.map((it, i) => (
          <div key={it.t} className="flex flex-col bg-pure p-6 sm:p-7">
            <span className="font-display text-[11px] font-bold tracking-[0.18em] text-plum/25">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-plum">{it.t}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-plum/60">{it.d}</p>
            {it.app && (
              <p className="mt-5 border-t border-plum/10 pt-4 text-[13px] italic leading-relaxed text-plum/50">
                “{it.app}”
              </p>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  )
}

/* ————————————————————————————————————— the actions ——— */

/**
 * A numbered sequence of things a reader has to actually do. The numeral is a
 * small piece of type rather than a badge, so the eye reads down the titles
 * instead of across a column of circles.
 */
export function Steps({
  items,
  className = '',
}: {
  items: { t: string; d: string }[]
  className?: string
}) {
  return (
    <Reveal>
      <ol className={`divide-y divide-plum/10 border-y border-plum/10 ${className}`}>
        {items.map((s, i) => (
          <li key={s.t} className="grid gap-1.5 py-5 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6">
            <span className="font-display text-sm font-bold tracking-[0.14em] text-pink-600 sm:pt-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold leading-snug text-plum">
                {s.t}
              </span>
              <span className="mt-1.5 block leading-relaxed text-plum/60">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
