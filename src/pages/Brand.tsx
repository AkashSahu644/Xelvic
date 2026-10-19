import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  Check,
  Copy,
  Download,
  MessageCircle,
  MoreVertical,
  Pin,
  Type as TypeIcon,
  X,
} from 'lucide-react'
import PhoneFrame from '../components/ui/PhoneFrame'
import {
  Bubble,
  Composer,
  DayChip,
  Screen,
  StatusRow,
  Thread,
} from '../components/ui/NewMockups'
import Reveal from '../components/ui/Reveal'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'

/**
 * The brand page is shown through the app rather than beside it. The phone in
 * the hero is drawn from the same chrome the product pages use, and the rules
 * below are demonstrated with the app's own bubbles, swatches and type — a
 * partner should be able to hold a screenshot of the app next to this page and
 * see one system, not a guidelines PDF that happens to match.
 *
 * Everything on the page is free to use. The only thing that needs a message
 * first is the mark on something we have not seen.
 */

/* The download set. Two files, both real: the deep-plum wordmark for light
   surfaces and the reversed one for plum. Nothing here is a placeholder. */
const logos = [
  {
    file: '/media/brand/xelvic.png',
    name: 'Primary',
    where: 'Light and mid-tone surfaces',
    panel: 'light' as const,
    rule: 'This is the default. If you are unsure which file to use, it is this one.',
  },
  {
    file: '/media/brand/xelvic_white.png',
    name: 'Reversed',
    where: 'Plum, photography and anything darker than 40% grey',
    panel: 'plum' as const,
    rule: 'The same wordmark in pure white. It exists so the logo never has to sit on a colour it cannot survive.',
  },
]

const palette = [
  {
    name: 'Xelvic Plum',
    hex: '#3A0A24',
    text: 'text-pure',
    role: 'The ink',
    d: 'Wordmark, headlines, body copy on light. It is the colour the whole interface is written in, and the background for reversed marks.',
  },
  {
    name: 'Xelvic Pink',
    hex: '#EC4899',
    text: 'text-pure',
    role: 'The accent',
    d: 'One accent, used sparingly: the send button, the active state, the rule beside a quote. If pink is everywhere, pink stops meaning anything.',
  },
  {
    name: 'Blush',
    hex: '#FF8FC4',
    text: 'text-plum',
    role: 'The gradient partner',
    d: 'The far end of the gradient and the tint behind a card. Never used for type on a light surface — it is a wash, not an ink.',
  },
  {
    name: 'Pure White',
    hex: '#FFFFFF',
    text: 'text-plum',
    role: 'The page',
    d: 'The literal white, not the plum-tinted off-white the product uses for panels. Reserved for the page itself and for reversed type.',
  },
]

const usage = [
  {
    k: 'Pink is an accent',
    v: 'Roughly one element in ten',
    note: 'A screen with a pink button, a pink rule and a pink heading has no accent left. Pick the one thing you want the eye to land on.',
  },
  {
    k: 'Contrast',
    v: 'Plum on white, or white on plum',
    note: 'Those two pairings are the only ones we use for type. Pink on plum, or blush on white, does not carry enough contrast to be readable.',
  },
  {
    k: 'The gradient',
    v: 'From Xelvic Pink to Blush, at one angle',
    note: 'Left to right, or a hundred and twenty degrees. It is for a button, a badge or a small mark — not for a background behind body copy.',
  },
  {
    k: 'Backgrounds',
    v: 'White, or the off-white panel',
    note: 'The app has no dark mode and no photographic background behind a conversation. Photography is a header, not a surface to read on.',
  },
]

const naming = [
  {
    k: 'Written',
    v: 'Xelvic',
    note: 'One word, capital X, no space, no hyphen, no exclamation mark and no plural. Not “Xelvic app”, not “XELVIC”, not “Xelvic™” outside a legal document.',
  },
  {
    k: 'In a sentence',
    v: '“Send it on Xelvic.”',
    note: 'It is a name, so it takes no article — not “the Xelvic”. The people who use it are “people on Xelvic”, not “Xelvicers”.',
  },
  {
    k: 'Possessive',
    v: '“Xelvic’s brand”',
    note: 'Fine in prose. Avoid it in a headline, where the apostrophe reads as clutter.',
  },
]

const inAppNames = ['Sparks', 'Shields', 'Drip', 'Vault', 'Circles', 'Moments', 'Drops', 'Vibes']

const dos = [
  'Use the wordmark at its own proportions, scaled evenly.',
  'Place it on one of the four brand colours, or on a photograph that is dark enough for the reversed file.',
  'Keep the clear space clear — a quarter of the width, on every side.',
  'Give it a plain background. A gradient behind the logo is fine; a photograph with people in it usually is not.',
  'Link the mark back to xelvic.com when you use it on a page of your own.',
]

const donts = [
  'Do not stretch, squash, rotate, skew or add a shadow, glow or outline.',
  'Do not recolour it — not pink, not a gradient fill, not a two-tone version.',
  'Do not rebuild the wordmark in another typeface, even a close one.',
  'Do not put it in a badge, a circle, a speech bubble or a phone mock-up frame.',
  'Do not use it as the icon for an app, service or account that is not Xelvic.',
]

/** A section heading with no kicker above it. The rule on this site is that a
 *  heading starts the section; a small uppercase label doing the same job twice
 *  is exactly the thing we removed everywhere else. */
function SectionIntro({ title, sub }: { title: ReactNode; sub?: string }) {
  return (
    <Reveal>
      <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-2xl leading-relaxed text-plum/70">{sub}</p>}
    </Reveal>
  )
}

/** The brand applied to the app: a convo with its own account, the mark on a
 *  pinned card, and the rules said in the app's voice rather than in a caption. */
function BrandPhone() {
  return (
    <div className="relative mx-auto w-fit">
      <PhoneFrame drift tilt size="md" glow="rgba(236,72,153,.32)">
        <Screen>
          <StatusRow />

          <div className="flex shrink-0 items-center gap-2 border-b border-plum/10 bg-pure px-2.5 py-2">
            <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-plum/10">
              <img
                src="/media/brand/xelvic-icon.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-1">
                <span className="truncate text-[12px] font-bold leading-tight">Xelvic</span>
                <BadgeCheck size={12} className="shrink-0 text-pink-600" />
              </span>
              <span className="truncate text-[8px] leading-tight text-plum/70">
                @xelvic · the brand account
              </span>
            </span>
            <MoreVertical size={14} className="shrink-0 text-plum/70" />
          </div>

          <Thread>
            <DayChip>Today</DayChip>

            <div className="max-w-[88%] self-start">
              <div className="overflow-hidden rounded-xl bg-pure shadow-[0_1px_2px_rgba(58,10,36,.10)] ring-1 ring-plum/10">
                <div className="relative overflow-hidden bg-plum px-3 py-4">
                  <span className="absolute -right-5 -top-5 h-14 w-14 rounded-full bg-pink-500/35 blur-xl" />
                  <img
                    src="/media/brand/xelvic_white.png"
                    alt="Xelvic"
                    className="relative h-5 w-auto"
                  />
                  <p className="relative mt-2 text-[8px] font-semibold text-pure/55">
                    Chat, Spark, Vibe &amp; more
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[8px] font-semibold text-plum/70">
                  <Pin size={9} className="text-pink-600" />
                  Pinned · one word, capital X
                </div>
              </div>
            </div>

            <Bubble text="Two logo files. One accent. No third." />
            <Bubble mine text="Send it on Xelvic." />
            <Bubble text="The characters belong to the themes. The mark stays a wordmark." />
          </Thread>

          <Composer />
        </Screen>
      </PhoneFrame>

      <p className="mt-5 text-center text-xs font-semibold text-plum/70">
        The brand, in the app.
      </p>
    </div>
  )
}

/** The palette, with the hex copied rather than read off a screenshot. */
function Palette() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      window.setTimeout(() => setCopied((current) => (current === hex ? null : current)), 1600)
    } catch {
      /* The clipboard can be blocked by the browser. The hex is printed on the
         swatch, so nothing is lost. */
    }
  }

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {palette.map((c) => (
        <div
          key={c.name}
          className="overflow-hidden rounded-[1.5rem] border border-plum/10 bg-pure shadow-card"
        >
          <div
            className={`relative grid h-32 place-items-end p-5 ${c.text}`}
            style={{ background: c.hex }}
          >
            <span className="font-mono text-sm font-bold tracking-wide">{c.hex}</span>
            <button
              type="button"
              onClick={() => copy(c.hex)}
              aria-label={
                copied === c.hex ? `${c.name} hex copied` : `Copy ${c.name} hex ${c.hex}`
              }
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-pure/90 px-2.5 py-1 text-[10px] font-bold text-plum backdrop-blur transition-colors hover:bg-pure"
            >
              {copied === c.hex ? (
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
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-plum">{c.name}</h3>
              <span className="text-xs font-semibold text-plum/70">{c.role}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-plum/70">{c.d}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/** A small, drawn example of each colour rule — a strip of ten elements with
 *  one accent, two bubbles, the gradient, two grounds. The rule is easier to
 *  check when it has been built once in the size it is meant to be read at. */
function UsageDemo({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-4 flex items-center gap-1.5 border-t border-plum/10 pt-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-full ${i === 9 ? 'bg-pink-500' : 'bg-plum/10'}`}
          />
        ))}
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="mt-4 space-y-1.5 border-t border-plum/10 pt-4">
        <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-ink-800 px-2.5 py-1.5 text-[11px] text-plum">
          Plum on white
        </p>
        <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-plum px-2.5 py-1.5 text-[11px] text-pure">
          White on plum
        </p>
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className="mt-4 border-t border-plum/10 pt-4">
        <div className="h-3 rounded-full bg-brand-grad" />
        <div className="mt-1.5 flex justify-between font-mono text-[9px] text-plum/70">
          <span>#EC4899</span>
          <span>#FF8FC4</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 flex gap-1.5 border-t border-plum/10 pt-4">
      <span className="h-10 flex-1 rounded-lg border border-plum/10 bg-pure" />
      <span className="h-10 flex-1 rounded-lg bg-[#f4edf1]" />
    </div>
  )
}

export default function Brand() {
  useSEO()

  return (
    <>
      {/* ── the brand, shown inside the app ────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/media/walls/xelvic.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/85 to-ink-900" />
          <div className="absolute left-1/4 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[min(340px,52vw)] w-[min(600px,100vw)] translate-x-1/4 rounded-full bg-pink-400/25 blur-[110px]" />
        </div>

        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-[clamp(3.75rem,6.4vw,4.75rem)]">
                The Xelvic <span className="text-grad">brand</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-plum/70 md:text-lg lg:mx-0">
                The wordmark, the pink and the two typefaces the app is built
                with — written down once, so anything you make can sit beside it
                without looking like a different product.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a href="#mark" className="btn btn-glow">
                  Get the logo files
                  <Download size={16} />
                </a>
                <a href="#colour" className="btn btn-ghost">
                  See the system
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {['Free to use', 'Wordmark + reversed', 'Open-source type'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-plum/10 bg-pure px-3 py-1.5 text-xs font-semibold text-plum/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <BrandPhone />
          </Reveal>
        </div>
      </section>

      {/* ————— the mark ————— */}
      <section id="mark" className="scroll-mt-28 pt-4 pb-16 sm:pb-20 md:pt-8 md:pb-28">
        <div className="wrap">
          <SectionIntro
            title={
              <>
                Two files, and <span className="text-grad">no third one</span>
              </>
            }
            sub="The wordmark for light surfaces, and the same wordmark reversed for plum. Both are PNG with transparency — pick the one that survives the background it is going on."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {logos.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-[1.75rem] border border-plum/10 bg-pure shadow-card">
                  <div
                    className={`relative grid min-h-[210px] place-items-center p-10 ${
                      l.panel === 'plum' ? 'bg-plum' : 'bg-ink-800'
                    }`}
                  >
                    {/* The mark sits alone in the panel: no second logo, no
                        type, no rule, and no edge of a card inside its space. */}
                    <img
                      src={l.file}
                      alt={`Xelvic ${l.name.toLowerCase()} logo`}
                      className="h-9 w-auto"
                    />
                    <span
                      className={`absolute bottom-4 right-4 font-mono text-[9px] ${
                        l.panel === 'plum' ? 'text-pure/40' : 'text-plum/70'
                      }`}
                    >
                      PNG · transparent
                    </span>
                  </div>
                  <div className="border-t border-plum/10 p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-plum">{l.name}</h3>
                        <p className="mt-1 text-xs text-plum/70">{l.where}</p>
                      </div>
                      <a
                        href={l.file}
                        download
                        className="rounded-full bg-plum px-4 py-2 text-xs font-bold text-pure transition-transform hover:-translate-y-0.5"
                      >
                        Download PNG
                      </a>
                    </div>
                    <p className="mt-3.5 text-sm leading-relaxed text-plum/70">{l.rule}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-plum/10 bg-pure p-6 shadow-card sm:p-7">
                <h3 className="font-display text-xl font-bold text-plum">
                  Clear space and minimum size
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/70">
                  Leave a margin around the wordmark equal to a quarter of its width — on all
                  four sides, including against a colour change. Nothing enters that space: no
                  type, no rule, no edge of a card, no second logo. There is no icon-only lockup
                  to fall back on, so if the space is too small for the wordmark, use nothing
                  rather than shrinking the mark.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="chip">96px on screen</span>
                  <span className="chip">24mm in print</span>
                  <span className="chip">Quarter-width margin</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid h-full min-h-[220px] place-items-center rounded-[1.75rem] border border-dashed border-pink-300/70 bg-ink-800 p-8">
                <div className="border border-dashed border-pink-400/60 p-8">
                  <img
                    src="/media/brand/xelvic.png"
                    alt="The Xelvic wordmark with its clear space marked"
                    className="h-7 w-auto"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— handling ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionIntro
            title={
              <>
                Using the <span className="text-grad">mark</span>
              </>
            }
            sub="Five things that keep it recognisable, and five that do not."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.75rem] border border-plum/10 bg-pure p-6 shadow-card sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-pink-50 text-pink-600">
                    <Check size={16} />
                  </span>
                  <h3 className="font-display text-lg font-bold text-plum">Do this</h3>
                </div>
                <ul className="mt-5 divide-y divide-plum/10">
                  {dos.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2.5 py-3 text-sm leading-relaxed text-plum/65"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-pink-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-[1.75rem] bg-plum p-6 text-pure shadow-card-dark sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-pure/10 text-pink-300">
                    <X size={16} />
                  </span>
                  <h3 className="font-display text-lg font-bold text-pure">Not this</h3>
                </div>
                <ul className="mt-5 divide-y divide-pure/10">
                  {donts.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2.5 py-3 text-sm leading-relaxed text-pure/65"
                    >
                      <X size={14} className="mt-0.5 shrink-0 text-pink-300" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— colour ————— */}
      <section id="colour" className="section scroll-mt-28">
        <div className="wrap">
          <SectionIntro
            title={
              <>
                Four colours, and what each one <span className="text-grad">is for</span>
              </>
            }
            sub="These are the values the product uses. If you are matching us on screen, use the hex rather than a colour picker on a screenshot."
          />

          <Palette />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {usage.map((u, i) => (
              <Reveal key={u.k} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-[1.5rem] border border-plum/10 bg-pure p-5 shadow-card sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-plum">{u.k}</h3>
                    <span className="text-xs font-semibold text-plum/70">{u.v}</span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/70">{u.note}</p>
                  <UsageDemo index={i} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— type ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionIntro
            title={
              <>
                Two typefaces, <span className="text-grad">both free</span>
              </>
            }
            sub="Both are open-source and available from Google Fonts, so a partner can match us without licensing anything."
          />

          <Reveal>
            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-plum/10 bg-pure shadow-card">
              <div className="grid md:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
                    <TypeIcon size={14} />
                    Display · Space Grotesk
                  </div>
                  <p className="mt-6 font-display text-[clamp(2rem,5vw,2.75rem)] font-bold leading-[1.02] text-plum">
                    Chat, Spark,
                    <br />
                    Vibe &amp; more
                  </p>
                  <p className="mt-6 font-display text-base font-bold text-plum/70">
                    Aa Bb Cc Dd Ee 0123456789
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-plum/70">
                    Headlines, the wordmark’s neighbours, big numbers and anything that has to
                    carry a screen on its own. Bold and medium only — the light weights are not
                    part of the system.
                  </p>
                </div>

                <div className="border-t border-plum/10 bg-ink-800/60 p-6 sm:p-8 md:border-l md:border-t-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
                    <MessageCircle size={14} />
                    Text · Plus Jakarta Sans
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-pure px-3 py-2 text-sm leading-snug text-plum shadow-sm">
                      A convo that stays between the two of you.
                    </p>
                    <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#f7bcd6] px-3 py-2 text-sm leading-snug text-plum">
                      Send it on Xelvic.
                    </p>
                  </div>
                  <p className="mt-6 text-base text-plum/70">Aa Bb Cc Dd Ee 0123456789</p>
                  <p className="mt-2 text-sm leading-relaxed text-plum/70">
                    Body copy, labels, buttons and everything read at length. Regular for
                    paragraphs, semibold for emphasis — and italics only where the app itself is
                    being quoted.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-plum/70">
              The pairing is the whole typographic system. There is no third face, no script, no
              condensed cut and no all-caps display variant; if a piece of communication feels
              like it needs another typeface, it needs less in it instead.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— naming ————— */}
      <section className="section">
        <div className="wrap">
          <SectionIntro
            title={
              <>
                How to write <span className="text-grad">Xelvic</span>
              </>
            }
            sub="Three rules about the name, and one about the things inside the app."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {naming.map((n, i) => (
              <Reveal key={n.k} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-[1.5rem] border border-plum/10 bg-pure p-5 shadow-card sm:p-6">
                  <p className="text-xs font-semibold text-plum/70">{n.k}</p>
                  <p className="mt-3 self-start rounded-2xl rounded-bl-sm bg-ink-800 px-3.5 py-2.5 font-display text-base font-bold leading-snug text-plum sm:text-lg">
                    {n.v}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/70">{n.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-5 rounded-[1.5rem] border border-plum/10 bg-pure p-5 shadow-card sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-plum">The names inside the app</h3>
                <span className="text-xs font-semibold text-plum/70">Capitalised, never translated</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {inAppNames.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-plum/10 bg-ink-800 px-3 py-1.5 text-xs font-semibold text-plum/70"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-plum/70">
                They are names rather than common nouns — do not swap in a synonym and do not
                lowercase them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— partners ————— */}
      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <Reveal>
            <div className="rounded-[1.75rem] border border-pink-500/25 bg-pink-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-plum">
                Partners and integrations
              </h2>
              <p className="mt-3 leading-relaxed text-plum/70">
                If you are building on Xelvic, using our name on a page of your own, or putting
                the mark on packaging we have not seen, write to{' '}
                <a
                  href="mailto:partners@xelvic.app"
                  className="font-semibold text-pink-700 underline"
                >
                  partners@xelvic.app
                </a>{' '}
                before you publish. Approval is usually quick, and it is much quicker than a
                recall. Journalists do not need approval for anything on this page — the{' '}
                <Link to="/press" className="font-semibold text-pink-700 underline">
                  Press page
                </Link>{' '}
                covers that separately.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <NextLinks
              links={[
                { label: 'Press', to: '/press' },
                { label: 'About us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'How it works', to: '/how-it-works' },
              ]}
            />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
