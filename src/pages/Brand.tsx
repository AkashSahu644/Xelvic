import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { Lede, Rows, SectionHead, Prose, Note, DoDont } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd } from '../data/jsonld'

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
  {
    k: 'Features',
    v: 'Capitalised, and never translated',
    note: 'Sparks, Shields, Drip, the Vault, Circles, Moments, Drops, Vibes. They are names rather than common nouns — do not swap in a synonym and do not lowercase them.',
  },
]

export default function Brand() {
  useSEO({
    title: 'Brand Center — Xelvic',
    description:
      'The Xelvic logo files, the colour system and when to use which, the typefaces, how to write the name, and the things we would rather you did not do with the mark.',
    image: '/media/walls/xelvic.jpg',
    jsonLd: graph(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Brand Center', path: '/brand' },
      ]),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            The Xelvic <span className="text-grad">brand</span>
          </>
        }
        sub="Two logo files, four colours and the rules that keep them looking like us. Everything on this page is free to use without asking, as long as the rules below hold."
        wall="/media/walls/xelvic.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            The brand is a wordmark, one accent colour and a lot of white space. It is deliberately
            narrow: there is nothing here that needs a mood board, and no mascot that has to travel
            with the logo — the characters people meet in the app belong to the theme packs, not to
            the brand. What follows is the whole system.
          </Lede>
        </div>
      </section>

      {/* ————— the mark ————— */}
      <section className="pb-20">
        <div className="wrap">
          <SectionHead
            kicker="The mark"
            title="Two files, and no third one"
            sub="The wordmark for light surfaces, and the same wordmark reversed for plum. Both are PNG with transparency — pick the one that survives the background it is going on."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {logos.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-3xl border border-plum/10">
                  <div
                    className={`grid min-h-[190px] place-items-center p-10 ${
                      l.panel === 'plum' ? 'bg-plum' : 'bg-pure'
                    }`}
                  >
                    {/* clear space: the mark never sits closer to an edge than
                        a quarter of its own width, shown here as real padding */}
                    <img
                      src={l.file}
                      alt={`Xelvic ${l.name.toLowerCase()} logo`}
                      className="h-9 w-auto"
                    />
                  </div>
                  <div className="border-t border-plum/10 bg-pure px-6 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-bold text-plum">{l.name}</p>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-plum/40">
                          {l.where}
                        </p>
                      </div>
                      <a
                        href={l.file}
                        download
                        className="rounded-full bg-plum px-4 py-2 text-xs font-bold text-pure transition-transform hover:-translate-y-0.5"
                      >
                        Download PNG
                      </a>
                    </div>
                    <p className="mt-3.5 text-sm leading-relaxed text-plum/55">{l.rule}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Note className="mt-8" title="Clear space and minimum size">
            Leave a margin around the wordmark equal to a quarter of its width — on all four sides,
            including against a colour change. Nothing enters that space: no type, no rule, no edge
            of a card, no second logo. The smallest it may be set is <strong>96px wide on screen</strong>{' '}
            and <strong>24mm wide in print</strong>; below that the counters close up. There is no
            icon-only lockup to fall back on, so if the space is too small for the wordmark, use
            nothing rather than shrinking the mark.
          </Note>
        </div>
      </section>

      {/* ————— misuse ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Handling"
            title="Using the mark"
            sub="Five things that keep it recognisable, and five that do not."
          />
          <div className="mt-10">
            <DoDont
              dos={[
                'Use the wordmark at its own proportions, scaled evenly.',
                'Place it on one of the four brand colours, or on a photograph that is dark enough for the reversed file.',
                'Keep the clear space clear — a quarter of the width, on every side.',
                'Give it a plain background. A gradient behind the logo is fine; a photograph with people in it usually is not.',
                'Link the mark back to xelvic.app when you use it on a page of your own.',
              ]}
              donts={[
                'Do not stretch, squash, rotate, skew or add a shadow, glow or outline.',
                'Do not recolour it — not pink, not a gradient fill, not a two-tone version.',
                'Do not rebuild the wordmark in another typeface, even a close one.',
                'Do not put it in a badge, a circle, a speech bubble or a phone mock-up frame.',
                'Do not use it as the icon for an app, service or account that is not Xelvic.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ————— colour ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Colour"
            title="Four colours, and what each one is for"
            sub="These are the values the product uses. If you are matching us on screen, use the hex rather than a colour picker on a screenshot."
          />

          <Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 sm:grid-cols-2">
              {palette.map((c) => (
                <div key={c.name} className="bg-pure">
                  <div
                    className={`grid h-28 place-items-end p-5 ${c.text}`}
                    style={{ background: c.hex }}
                  >
                    <span className="font-display text-sm font-bold tracking-wide">{c.hex}</span>
                  </div>
                  <div className="border-t border-plum/10 px-6 py-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display font-bold text-plum">{c.name}</p>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
                        {c.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-plum/55">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Rows className="mt-14" items={usage} />
        </div>
      </section>

      {/* ————— type ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Type"
            title="Two typefaces, both free"
            sub="Both are open-source and available from Google Fonts, so a partner can match us without licensing anything."
          />

          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 md:grid-cols-2">
            <Reveal>
              <div className="h-full bg-pure p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-600">
                  Display · Space Grotesk
                </p>
                <p className="mt-6 font-display text-4xl font-bold leading-none text-plum">
                  Chat. Call. Vibe.
                </p>
                <p className="mt-6 font-display text-lg font-bold text-plum/70">
                  Aa Bb Cc Dd Ee 0123456789
                </p>
                <p className="mt-5 text-sm leading-relaxed text-plum/55">
                  Headlines, the wordmark’s neighbours, big numbers and anything that has to carry a
                  screen on its own. Bold and medium only — the light weights are not part of the
                  system.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full bg-pure p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-600">
                  Text · Plus Jakarta Sans
                </p>
                <p className="mt-6 text-2xl font-semibold leading-snug text-plum">
                  A convo that stays between the two of you.
                </p>
                <p className="mt-6 text-lg text-plum/70">Aa Bb Cc Dd Ee 0123456789</p>
                <p className="mt-5 text-sm leading-relaxed text-plum/55">
                  Body copy, labels, buttons and everything read at length. Regular for paragraphs,
                  semibold for emphasis — and italics only where the app itself is being quoted.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <Prose>
              <p>
                The pairing is the whole typographic system. There is no third face, no script, no
                condensed cut and no all-caps display variant; if a piece of communication feels like
                it needs another typeface, it needs less in it instead.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* ————— naming ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Naming"
            title="How to write Xelvic"
            sub="Four rules, mostly about not adding anything."
          />
          <Rows className="mt-10" items={naming} />

          <Note className="mt-12" title="Partners and integrations">
            If you are building on Xelvic, using our name on a page of your own, or putting the mark
            on packaging we have not seen, write to{' '}
            <a href="mailto:partners@xelvic.app" className="font-semibold text-pink-700 underline">
              partners@xelvic.app
            </a>{' '}
            before you publish. Approval is usually quick, and it is much quicker than a recall.
            Journalists do not need approval for anything on this page — the{' '}
            <Link to="/press" className="font-semibold text-pink-700 underline">
              Press page
            </Link>{' '}
            covers that separately.
          </Note>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Press', to: '/press' },
              { label: 'About us', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'How it works', to: '/how-it-works' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
