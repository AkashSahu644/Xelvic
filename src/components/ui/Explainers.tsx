import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { Steps } from './Editorial'

/**
 * The vocabulary the explainer pages are built from — Security, Safety, the
 * Help Center and Community. It is deliberately icon-free: a long section is
 * opened by a numeral set in the display face rather than by a glyph in a
 * tinted square, so the page reads as a document you can scan rather than as a
 * wall of tiles. The only icons left are the arrow on a link, which is an
 * affordance rather than decoration, and the quote rule, which is a hairline.
 *
 * The rail on the right of a long section is where the app gets to speak for
 * itself: a line lifted word-for-word out of the build, and the path to the
 * screen it lives on, set as a breadcrumb of type.
 */

export function AppQuote({ children, label = 'In the app' }: { children: string; label?: string }) {
  return (
    <figure className="rounded-2xl border border-plum/10 bg-pure px-5 py-4">
      <figcaption className="text-[10px] font-bold uppercase tracking-[0.14em] text-plum/40">
        {label}
      </figcaption>
      <blockquote className="mt-2 border-l-2 border-[#ec4899] pl-3.5 text-[15px] italic leading-relaxed text-plum/80">
        “{children}”
      </blockquote>
    </figure>
  )
}

/* ———————————————————————————————————————— a long section ——— */

export type DeepProps = {
  /** The step number, set large in the display face as the section's marker. */
  n?: number
  title: string
  /** One sentence that does the work of a subheading. */
  lead?: string
  body?: string[]
  /** Bullets, for a clause that is really a list. */
  points?: string[]
  /** Numbered actions, for anything a reader has to actually do. */
  steps?: { t: string; d: string }[]
  /** A line lifted word-for-word out of the app. */
  app?: string
  /** Where to find it in the app, as a typographic breadcrumb. */
  path?: string[]
  /** Cards or anything else to sit under the prose. */
  children?: ReactNode
  className?: string
}

export function DeepSection({
  n,
  title,
  lead,
  body,
  points,
  steps,
  app,
  path,
  children,
  className = '',
}: DeepProps) {
  const rail = app || (path && path.length > 0)

  return (
    <section className={className}>
      {/* The rail only takes its own column once there is room for it. Any
          earlier and it eats the prose — the section is already spending a
          gutter on the numeral, so the two together leave a column too narrow
          to read comfortably. */}
      <div className={rail ? 'grid gap-10 xl:grid-cols-[minmax(0,1fr)_336px]' : ''}>
        <div className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
          {n !== undefined && (
            <span className="font-display text-3xl font-bold leading-none text-plum/15 sm:text-4xl">
              {String(n).padStart(2, '0')}
            </span>
          )}

          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold leading-tight md:text-[30px]">{title}</h2>

            {lead && <p className="mt-4 text-lg leading-relaxed text-plum/70">{lead}</p>}

            {body?.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-white/60">
                {p}
              </p>
            ))}

            {points && points.length > 0 && (
              <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
                {points.map((pt) => (
                  <li key={pt} className="flex gap-4 py-3.5">
                    <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-[#ec4899]" />
                    <span className="leading-relaxed text-white/65">{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {steps && steps.length > 0 && <Steps className="mt-6" items={steps} />}

            {children}
          </div>
        </div>

        {rail && (
          /* Stacked by default; two across when it has the whole width to
             itself below `xl`, and back to one column once it is a side rail. */
          <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 xl:pt-1">
            {app && <AppQuote>{app}</AppQuote>}
            {path && path.length > 0 && (
              <div className="rounded-2xl border border-plum/10 bg-pure px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-plum/40">
                  Where to find it
                </p>
                <p className="mt-2.5 font-display text-sm font-bold leading-relaxed text-plum/75">
                  {path.join('  ›  ')}
                </p>
              </div>
            )}
          </aside>
        )}
      </div>
    </section>
  )
}

/* —————————————————————————————————————————— a link strip ——— */

export function NextLinks({ links }: { links: { label: string; to: string }[] }) {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group inline-flex items-center gap-2 rounded-full border border-plum/12 bg-pure px-5 py-3 text-sm font-semibold text-plum/70 transition-colors hover:border-pink-500/40 hover:text-pink-700"
          >
            {l.label}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </div>
    </Reveal>
  )
}
