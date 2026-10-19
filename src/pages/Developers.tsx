import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Copy, Link2 } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Accordion from '../components/ui/Accordion'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import {
  deepLinks,
  developerFaqs,
  platformFacts,
  roadmap,
  type DeepLinkGroup,
} from '../data/developers'

/**
 * The developer page is a reference, not a sales page. The hero is a small
 * playground — pick a destination and watch the address and the screen it
 * opens change together. Below it, the grid says what the platform is built
 * from and the table is the actual thing someone came for. The roadmap is
 * deliberately honest about what does not exist yet.
 */

type Filter = 'All' | DeepLinkGroup

const filters: Filter[] = ['All', 'People', 'Content', 'Live']

const statusTone: Record<string, string> = {
  'Available now': 'bg-pink-50 text-pink-700',
  'In the works': 'bg-ink-800 text-plum/70',
  Exploring: 'bg-ink-800 text-plum/70',
}

/** What a route opens, for the hero preview. */
function previewFor(path: string) {
  const kind = path.replace('xelvic://', '').split('/')[0]
  switch (kind) {
    case 'u':
      return {
        art: '/media/themes/animeblue/profile.jpg',
        title: 'Maya Brooks',
        sub: '@mayamakes · profile',
      }
    case 'd':
      return {
        art: '/media/themes/animeblue/drops.jpg',
        title: 'A Drop',
        sub: 'Photo drop · 8 pieces',
      }
    case 'v':
      return {
        art: '/media/themes/catgirl/drops.jpg',
        title: 'A Vibe',
        sub: 'Short video · loops',
      }
    case 'live':
      return {
        art: '/media/themes/catgirl/live.jpg',
        title: 'Live · Room 42',
        sub: '128 in the room',
      }
    case 'moments':
      return {
        art: '/media/themes/animeblue/moments.jpg',
        title: 'A Moment',
        sub: '24 hours · music and a poll',
      }
    default:
      return {
        art: '/media/themes/alone/audio.jpg',
        title: 'After Hours',
        sub: 'Audio room · 64 in the room',
      }
  }
}

function LinkPlayground() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const link = deepLinks[active]
  const preview = previewFor(link.path)
  const [kind, placeholder] = link.path.replace('xelvic://', '').split('/')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link.example)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* The clipboard can be blocked by the browser. The address is still
         selectable in the bar, so nothing is lost. */
    }
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card">
      <div className="flex items-center gap-2 border-b border-plum/10 bg-ink-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-plum/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-plum/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-plum/15" />
        <img
          src="/media/brand/xelvic-icon.png"
          alt=""
          className="ml-1 h-5 w-5 rounded-[22%]"
        />
        <span className="min-w-0 truncate font-mono text-[11px] text-plum/70">
          xelvic://playground
        </span>
        <span className="ml-auto hidden shrink-0 rounded-full bg-pure px-2.5 py-1 text-[10px] font-bold text-pink-600 sm:inline-block">
          No key needed
        </span>
      </div>

      <div className="grid md:grid-cols-[0.92fr_1.08fr]">
        {/* pick a destination */}
        <div className="flex flex-col border-b border-plum/10 p-4 md:border-b-0 md:border-r sm:p-5">
          <p className="text-[11px] font-bold text-plum/70">Pick a destination</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {deepLinks.map((l, i) => {
              const on = active === i
              return (
                <button
                  key={l.path}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setActive(i)
                    setCopied(false)
                  }}
                  className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors ${
                    on
                      ? 'border-pink-300 bg-pink-50'
                      : 'border-plum/10 hover:bg-ink-800'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                      on ? 'bg-pure text-pink-600' : 'bg-ink-800 text-plum/70'
                    }`}
                  >
                    <Link2 size={12} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[10px] font-semibold text-plum">
                      {l.path}
                    </span>
                    <span className="block truncate text-[9px] text-plum/70">{l.desc}</span>
                  </span>
                  {on && <Check size={12} className="shrink-0 text-pink-600" />}
                </button>
              )
            })}
          </div>

          <div className="mt-auto pt-4">
            <p className="text-[10px] text-plum/70">Every link reads the same way</p>
            <code className="mt-2 block rounded-xl bg-ink-800 px-3 py-2.5 font-mono text-[11px] text-plum/70">
              xelvic://<span className="font-bold text-pink-600">{kind}</span>/{placeholder}
            </code>
          </div>
        </div>

        {/* what the chosen link does */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-plum/10 px-4 py-3 sm:px-5">
            <code className="min-w-0 flex-1 truncate font-mono text-[12px] font-semibold text-plum">
              {link.example}
            </code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-plum/10 px-2.5 py-1 text-[11px] font-bold text-plum/70 transition-colors hover:border-pink-300 hover:text-pink-600"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-pink-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <div className="relative h-40 overflow-hidden rounded-2xl bg-plum sm:h-44">
              <img
                src={preview.art}
                alt=""
                className="h-full w-full object-cover opacity-90"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/25 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-plum/70 px-2.5 py-1 text-[10px] font-semibold text-pure backdrop-blur">
                {link.group}
              </span>
              <div className="absolute inset-x-3 bottom-3">
                <p className="font-display text-base font-bold text-pure">{preview.title}</p>
                <p className="text-[10px] text-pure/70">{preview.sub}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                ['scheme', 'xelvic://'],
                ['auth', 'none'],
                ['install', 'required'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-ink-800 px-2 py-2">
                  <p className="font-mono text-[9px] text-plum/70">{label}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-plum/70">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeepLinkReference() {
  const [filter, setFilter] = useState<Filter>('All')
  const [copied, setCopied] = useState<string | null>(null)

  const shown = filter === 'All' ? deepLinks : deepLinks.filter((l) => l.group === filter)

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied((current) => (current === value ? null : current)), 1600)
    } catch {
      /* The clipboard can be blocked by the browser. The example is still
         selectable in the row, so nothing is lost. */
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                on
                  ? 'bg-plum text-pure'
                  : 'border border-plum/10 bg-pure text-plum/70 hover:text-plum'
              }`}
            >
              {f}
            </button>
          )
        })}
        <span className="ml-auto self-center text-xs font-semibold text-plum/70">
          {shown.length} {shown.length === 1 ? 'route' : 'routes'}
        </span>
      </div>

      <div className="mt-4 divide-y divide-plum/10 overflow-hidden rounded-2xl border border-plum/10 bg-pure shadow-card">
        {shown.map((l) => (
          <div key={l.path} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pink-50 text-pink-600">
                <Link2 size={16} />
              </span>
              <div className="min-w-0">
                <code className="block truncate font-mono text-[13px] font-semibold text-plum">
                  {l.path}
                </code>
                <p className="mt-0.5 text-xs text-plum/70">
                  {l.desc} · <span className="font-mono text-plum/70">{l.example}</span>
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 pl-12 sm:pl-0">
              <span className="rounded-full bg-ink-800 px-2.5 py-1 text-[10px] font-semibold text-plum/70">
                {l.group}
              </span>
              <button
                type="button"
                onClick={() => copy(l.example)}
                className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 px-2.5 py-1 text-[11px] font-bold text-plum/70 transition-colors hover:border-pink-300 hover:text-pink-600"
              >
                {copied === l.example ? (
                  <>
                    <Check size={12} className="text-pink-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Developers() {
  useSEO()

  return (
    <>
      {/* ── the hero, with a route playground under the copy ───────────────── */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/media/walls/studio.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/85 to-ink-900" />
          <div className="absolute left-1/4 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[min(340px,52vw)] w-[min(600px,100vw)] translate-x-1/4 rounded-full bg-pink-400/25 blur-[110px]" />
        </div>

        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.75rem,6.4vw,4.75rem)]">
                The Xelvic <span className="text-grad">platform</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-plum/70 md:text-lg">
                Link straight into the app with the xelvic:// scheme. No key, no
                SDK and no wrapper — just routes that open the right screen, and
                a short, honest list of what is still being built.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#deep-links" className="btn btn-glow">
                  Read the deep links
                  <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="btn btn-ghost">
                  Talk to us
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['xelvic:// scheme', 'Flutter client', 'WebRTC media', 'Android & iOS'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-plum/10 bg-pure px-3 py-1.5 text-xs font-semibold text-plum/70"
                    >
                      {chip}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <LinkPlayground />
          </Reveal>
        </div>
      </section>

      {/* ── what the platform is made of ───────────────────────────────────── */}
      <section className="section pt-4 md:pt-8">
        <div className="wrap">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
              What the app is <span className="text-grad">built on</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-plum/70">
              Six pieces do most of the work. They are listed here because a
              deep link is only as good as the screen it opens, and because a
              developer can usually tell what an app will feel like from what it
              is made of.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformFacts.map((fact, i) => {
              const Icon = fact.icon
              return (
                <Reveal key={fact.title} delay={(i % 3) * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-plum/10 bg-pure p-6 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-pink-50 text-pink-600">
                        <Icon size={20} />
                      </span>
                      <span className="rounded-full bg-ink-800 px-2.5 py-1 text-[10px] font-semibold text-plum/70">
                        {fact.note}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold">{fact.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/70">
                      {fact.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── the reference ──────────────────────────────────────────────────── */}
      <section id="deep-links" className="section scroll-mt-28 bg-ink-800">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Deep link <span className="text-grad">reference</span>
              </h2>
              <p className="mt-4 leading-relaxed text-plum/70">
                Every route the app answers today. Open one from a browser, a QR
                code or another app; the operating system hands the scheme to
                Xelvic and the destination opens.
              </p>

              <div className="mt-6 rounded-2xl border border-plum/10 bg-pure p-4 shadow-card">
                <p className="text-xs font-bold text-plum/70">How a route is shaped</p>
                <div className="mt-3 space-y-2 font-mono text-[11px]">
                  {[
                    ['xelvic://', 'the scheme'],
                    ['u / d / v / live / room / moments', 'what to open'],
                    ['<id> or <username>', 'which one'],
                  ].map(([part, note]) => (
                    <div key={part} className="flex flex-wrap items-baseline justify-between gap-2">
                      <code className="text-plum">{part}</code>
                      <span className="text-plum/70">{note}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 border-t border-plum/10 pt-3 text-[11px] leading-relaxed text-plum/70">
                  These are URI schemes, not website addresses. If the app is not
                  installed, the link cannot open a web page — send the person to{' '}
                  <Link to="/download" className="font-semibold text-pink-600 underline">
                    download
                  </Link>{' '}
                  instead.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <DeepLinkReference />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the tap, the handoff, the screen ───────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                From a tap to <span className="text-grad">the right screen</span>
              </h2>
              <p className="mt-4 leading-relaxed text-plum/70">
                There is no magic in the middle. The operating system owns the
                handoff, and Xelvic owns the destination.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                n: '1',
                t: 'A link is tapped',
                d: 'The xelvic:// address is opened from a browser, a QR code or another app.',
              },
              {
                n: '2',
                t: 'The OS hands it over',
                d: 'Android and iOS both recognise the scheme and pass the whole address to Xelvic.',
              },
              {
                n: '3',
                t: 'The app resolves it',
                d: 'The route is matched to a profile, Drop, Vibe, Moment or room and opens there.',
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-dashed border-plum/20 bg-pure p-6">
                  <span className="step-num">{step.n}</span>
                  <h3 className="mt-4 font-display text-lg font-bold">{step.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/70">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-plum/10 bg-pure px-4 py-3 text-center text-xs leading-relaxed text-plum/70">
              Signed out? The app sends the person through sign-in and then
              continues to the destination, so the link is not lost.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── the honest roadmap ─────────────────────────────────────────────── */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
              What exists, and what <span className="text-grad">does not yet</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-plum/70">
              Deep links and the client are live. A public API is the next real
              milestone, and an SDK comes after that — not before.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roadmap.map((column, i) => (
              <Reveal key={column.status} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-plum/10 bg-pure p-5 shadow-card sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold">{column.status}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusTone[column.status]}`}
                    >
                      {column.items.length} {column.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <ul className="mt-4 divide-y divide-plum/10 border-t border-plum/10">
                    {column.items.map((item) => (
                      <li key={item.t} className="py-3">
                        <p className="flex items-center gap-1.5 text-sm font-bold">
                          {column.status === 'Available now' && (
                            <Check size={13} className="shrink-0 text-pink-500" />
                          )}
                          {item.t}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-plum/70">{item.d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the questions ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Questions developers <span className="text-grad">ask</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-plum/70">
                Straight answers about keys, testing, platforms and what is still
                missing.
              </p>
              <Link
                to="/contact"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
              >
                Ask for early API access
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>

            <Accordion items={developerFaqs} />
          </div>
        </div>
      </section>

      {/* ── on to the rest of the site ─────────────────────────────────────── */}
      <section className="pb-8">
        <div className="wrap flex flex-wrap justify-center gap-3">
          <Link to="/features/live-rooms" className="chip">
            Live &amp; rooms
          </Link>
          <Link to="/how-it-works" className="chip">
            How it works
          </Link>
          <Link to="/creators" className="chip">
            For creators
          </Link>
          <Link
            to="/download"
            className="chip inline-flex items-center gap-1.5 font-bold text-pink-600"
          >
            Download <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
