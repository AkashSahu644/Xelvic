import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import Accordion from '../components/ui/Accordion'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { faqCategories } from '../data/faq'
import { Stats, SectionHead, Note } from '../components/ui/Editorial'
import { useSEO } from '../hooks/usePageMeta'

/* The searches people actually type, rather than a decorative tag cloud. Each
   one drops straight into the box above. */
const POPULAR = ['vault', 'delete account', 'voice note', 'sparks', 'block', 'verification']

/* Three doors for somebody who has just arrived, in the order that helps. */
const first = [
  {
    t: 'Find your people',
    d: 'Allow contacts and everyone already on Xelvic appears — each number kept only as a one-way hash, with the name you saved it under. Or search for somebody by handle instead.',
    to: '/how-it-works',
    cta: 'How it works',
  },
  {
    t: 'Start a spark',
    d: 'A day two people talk on is one spark, and it does not matter who sent first. Both of you have to say something to keep it alive.',
    to: '/whats-new',
    cta: 'What’s new',
  },
  {
    t: 'Lock down what matters',
    d: 'Set a password you would not guess, move the convos you care about into the Vault, and glance at sessions now and then.',
    to: '/security',
    cta: 'Security',
  },
]

export default function Help() {
  /* No arguments. The WebPage and the FAQPage come from the route entry, built
     from the same `faqCategories` this page renders. Google only shows FAQ
     rich results for answers that are visible to the reader, which these are —
     and they are the same strings the accordion prints, because there is only
     one copy of them, in src/data/faq.ts. */
  useSEO()

  const [active, setActive] = useState(faqCategories[0].slug)
  const [query, setQuery] = useState('')

  const searching = query.trim().length > 0

  /* Counted rather than written down, so the "N answers" lines cannot drift
     away from the number of articles that actually exist. */
  const total = faqCategories.reduce((n, c) => n + c.faqs.length, 0)

  /* Every article carries its category, so a search result still says which
     corner of the app it came from. */
  const results = useMemo(() => {
    if (!searching) return []
    const q = query.trim().toLowerCase()
    return faqCategories.flatMap((c) =>
      c.faqs
        .filter((f) => (f.q + f.a).toLowerCase().includes(q))
        .map((f) => ({ ...f, tag: c.title })),
    )
  }, [query, searching])

  const current = faqCategories.find((c) => c.slug === active) ?? faqCategories[0]

  return (
    <>
      <PageHero
        title={
          <>
            How can we <span className="text-grad">help?</span>
          </>
        }
        sub="Search for an answer, or browse by topic below. Everything here describes the app as it actually behaves — including the parts with no undo."
        wall="/media/walls/safar.jpg"
      />

      {/* ————— search ————— */}
      <section className="pb-14">
        <div className="wrap max-w-2xl">
          <Reveal>
            <div className="flex items-end justify-between gap-4 border-b-2 border-plum/15 transition-colors focus-within:border-pink-500">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the Help Center"
                aria-label="Search help articles"
                className="w-full bg-transparent py-4 font-display text-lg font-bold text-plum outline-none placeholder:font-sans placeholder:text-lg placeholder:font-normal placeholder:text-plum/35 md:text-xl"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="shrink-0 cursor-pointer pb-5 text-xs font-bold uppercase tracking-[0.14em] text-plum/40 transition-colors hover:text-pink-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-[0.14em] text-plum/35">
                Try
              </span>
              {POPULAR.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQuery(p)}
                  className="cursor-pointer rounded-full border border-plum/12 bg-pure px-3.5 py-1.5 text-xs font-semibold text-plum/60 transition-colors hover:border-pink-500/40 hover:text-pink-700"
                >
                  {p}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— the numbers ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: String(total), label: 'Answers written', note: 'Across every corner of the app, and still growing.' },
              { value: String(faqCategories.length), label: 'Topics', note: 'Sign-up through to deleting an account, in the order you meet them.' },
              { value: '2 days', label: 'To reach a person', note: 'When a page is not enough, support answers within two working days.' },
              { value: '13+', label: 'And nothing under', note: 'The age gate is in front of sign-up, and it is enforced.' },
            ]}
          />
        </div>
      </section>

      {/* ————— new here ————— */}
      {!searching && (
        <section className="section bg-ink-800">
          <div className="wrap max-w-4xl">
            <SectionHead
              kicker="New here"
              title={
                <>
                  Three things to do <span className="text-grad">in your first hour</span>
                </>
              }
              sub={`The other ${total - 3} answers can wait until you need them. These three are the ones that make the app make sense.`}
            />

            <Reveal>
              <ol className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
                {first.map((s, i) => (
                  <li key={s.t}>
                    <Link
                      to={s.to}
                      className="group grid gap-1.5 py-6 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6"
                    >
                      <span className="font-display text-sm font-bold tracking-[0.14em] text-pink-600 sm:pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-lg font-bold leading-snug text-plum transition-colors group-hover:text-pink-700">
                          {s.t}
                        </span>
                        <span className="mt-1.5 block leading-relaxed text-plum/60">{s.d}</span>
                        <span className="mt-2.5 block text-sm font-semibold text-pink-600 group-hover:underline">
                          {s.cta}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {/* ————— browse by topic ————— */}
      <section className="section">
        <div className="wrap">
          {!searching && (
            <>
              <SectionHead
                kicker="Browse"
                title="Every answer, by topic"
                sub="Pick the corner of the app you are stuck in. The number is how many articles are in it."
              />

              <Reveal>
                <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 sm:grid-cols-2 lg:grid-cols-4">
                  {faqCategories.map((c) => {
                    const on = c.slug === active
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setActive(c.slug)}
                        aria-pressed={on}
                        className={`flex cursor-pointer flex-col p-6 text-left transition-colors ${
                          on ? 'bg-pink-50' : 'bg-pure hover:bg-ink-800'
                        }`}
                      >
                        <span
                          className={`font-display text-3xl font-bold leading-none ${
                            on ? 'text-pink-600' : 'text-plum/20'
                          }`}
                        >
                          {String(c.faqs.length).padStart(2, '0')}
                        </span>
                        <span
                          className={`mt-3.5 font-display text-base font-bold leading-snug ${
                            on ? 'text-pink-700' : 'text-plum'
                          }`}
                        >
                          {c.title}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-plum/55">{c.blurb}</span>
                      </button>
                    )
                  })}
                </div>
              </Reveal>
            </>
          )}

          {/* ————— the articles ————— */}
          <div className="mx-auto mt-12 max-w-3xl">
            {searching ? (
              <>
                <p className="mb-6 font-display text-lg font-bold text-plum">
                  {results.length === 0
                    ? `Nothing for “${query}”.`
                    : `${results.length} ${results.length === 1 ? 'answer' : 'answers'} for “${query}”.`}
                </p>
                {results.length > 0 ? (
                  <Accordion items={results} />
                ) : (
                  <Note title="We have not written that one yet">
                    Try another word, or pick a topic above. If it is something the app does that
                    nobody has asked about before, that is worth telling us — a question nobody has
                    asked is usually the one an answer is missing for.
                    <div className="mt-6">
                      <NextLinks
                        links={[
                          { label: 'Contact support', to: '/support' },
                          { label: 'Other ways to reach us', to: '/contact' },
                        ]}
                      />
                    </div>
                  </Note>
                )}
              </>
            ) : (
              <>
                {/* the current topic, stated rather than implied */}
                <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-plum/10 pb-4">
                  <span className="font-display text-lg font-bold text-plum">{current.title}</span>
                  <span className="text-sm text-plum/45">
                    {current.faqs.length} {current.faqs.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <Accordion items={current.faqs} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ————— still stuck ————— */}
      <section className="pb-20 md:pb-28">
        <div className="wrap max-w-3xl">
          <Note title="Still stuck?">
            Tell us what you were doing and what happened instead. If it is a bug we would rather
            hear about it than have you work around it, and if it is a question, a person answers
            support rather than a bot — usually within two working days.
            <div className="mt-6">
              <NextLinks
                links={[
                  { label: 'Get support', to: '/support' },
                  { label: 'Email us', to: '/contact' },
                  { label: 'Safety', to: '/safety' },
                  { label: 'Your Data', to: '/data' },
                ]}
              />
            </div>
          </Note>

          <div className="mt-10">
            <Link
              to="/contact"
              className="text-sm font-semibold text-plum/60 underline transition-colors hover:text-pink-700"
            >
              See every way to reach a person →
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
