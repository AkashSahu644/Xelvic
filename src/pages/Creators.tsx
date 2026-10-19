import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check, Flame, Search, Users } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Accordion from '../components/ui/Accordion'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import {
  creatorFacts,
  creatorFaqs,
  creatorTools,
  dealSteps,
  directoryCreators,
} from '../data/creators'

/**
 * The creator page is a product tour with the paperwork left in. The studio
 * card at the top is the same account a person already messages; the deal
 * walkthrough further down shows the four states a collaboration passes
 * through; the directory shows what a brand sees. Nothing here is a separate
 * "creator mode" — it is all the account, seen from the other side.
 */

function CreatorStudio() {
  return (
    <div className="mx-auto mt-12 w-full max-w-4xl rounded-[2rem] border border-plum/10 bg-pure p-4 shadow-card sm:p-5">
      <div className="grid gap-3 md:grid-cols-[0.82fr_1.18fr]">
        {/* the person and the two marks that are not numbers */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-ink-800 p-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 rounded-full bg-brand-grad p-[2px]">
                <span className="block rounded-full bg-pure p-[2px]">
                  <img
                    src="/media/char/fairy.png"
                    alt=""
                    className="h-12 w-12 rounded-full bg-pink-50 object-contain p-1"
                  />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 font-display text-base font-bold">
                  Maya Brooks
                  <BadgeCheck size={14} className="text-pink-500" aria-hidden="true" />
                </p>
                <p className="truncate text-[11px] text-plum/50">@mayamakes</p>
              </div>
              <span className="hidden shrink-0 rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[10px] font-semibold text-plum/50 sm:inline-block">
                Creator profile
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-plum/55">
              Small songs, long walks, and the occasional 2am live room.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Music & Moments', 'Live rooms'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pure px-2.5 py-1 text-[10px] font-semibold text-plum/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ink-800 p-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-pure text-pink-600">
                <BadgeCheck size={16} />
              </span>
              <p className="mt-2 text-xs font-bold">Verified</p>
              <p className="text-[10px] leading-relaxed text-plum/45">
                Proof it is really them.
              </p>
            </div>
            <div className="rounded-2xl bg-pink-50 p-3">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Flame
                    key={i}
                    size={12}
                    className={i < 6 ? 'text-pink-500' : 'text-pink-200'}
                  />
                ))}
              </span>
              <p className="mt-2 text-xs font-bold">6-day spark</p>
              <p className="text-[10px] leading-relaxed text-plum/45">
                With the people who return.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-ink-800 px-3 py-2.5">
            <Check size={13} className="shrink-0 text-pink-500" />
            <span className="text-[10px] font-semibold text-plum/55">
              Eligible for the Creator Directory
            </span>
            <span className="ml-auto text-[10px] font-bold text-pink-600">12.8k</span>
          </div>
        </div>

        {/* the numbers a creator actually opens the app for */}
        <div className="flex h-full flex-col rounded-2xl bg-plum p-4 text-pure sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-pure/45">Reach this week</p>
              <p className="mt-1 font-display text-3xl font-bold leading-none">18,420</p>
            </div>
            <span className="rounded-full bg-pure/10 px-2.5 py-1 text-[10px] font-bold text-pink-300">
              +38% this week
            </span>
          </div>

          <div className="mt-6 flex h-32 items-end gap-2" aria-hidden="true">
            {[34, 52, 44, 66, 58, 80, 96].map((height, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-md ${
                  i === 6 ? 'bg-brand-grad' : 'bg-pure/15'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-semibold text-pure/35">
            <span>Mon</span>
            <span>Sun</span>
          </div>

          <div className="mt-auto grid grid-cols-3 divide-x divide-pure/10 border-t border-pure/10 pt-3 text-center">
            <div>
              <p className="font-display text-sm font-bold">12.8k</p>
              <p className="text-[9px] text-pure/40">keeps</p>
            </div>
            <div>
              <p className="font-display text-sm font-bold">214</p>
              <p className="text-[9px] text-pure/40">drops</p>
            </div>
            <div>
              <p className="font-display text-sm font-bold">8.2k</p>
              <p className="text-[9px] text-pure/40">profile views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Creators() {
  /* No arguments. The WebPage, the ItemList of creator tools and the HowTo for
     a brand deal are the route entry's — both built from the arrays in
     src/data/creators that this page renders. */
  useSEO()

  return (
    <>
      {/* ── the hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/media/walls/mehfil.jpg"
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
                Built for the work <span className="text-grad">you make</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-plum/55 md:text-lg">
                A professional profile, Insights and verification — sitting on
                the same account your people already message. The tools are
                built around your work, not in a separate app.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#tools" className="btn btn-glow">
                  See the creator tools
                  <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="btn btn-ghost">
                  Apply for verification
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Professional profile', 'Insights from day one', 'Verification on request'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-plum/10 bg-pure px-3 py-1.5 text-xs font-semibold text-plum/55"
                    >
                      {chip}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <CreatorStudio />
          </Reveal>
        </div>
      </section>

      {/* ── the honest facts ───────────────────────────────────────────────── */}
      <section className="pb-4">
        <div className="wrap">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/10 sm:grid-cols-2 lg:grid-cols-4">
              {creatorFacts.map((fact) => (
                <div key={fact.label} className="bg-pure px-5 py-6">
                  <p className="font-display text-3xl font-bold leading-none text-plum">
                    {fact.value}
                  </p>
                  <p className="mt-2.5 text-sm font-bold text-plum">{fact.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-plum/50">{fact.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the tools ──────────────────────────────────────────────────────── */}
      <section id="tools" className="section scroll-mt-28">
        <div className="wrap">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
              Everything a creator needs, <span className="text-grad">in one account</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-plum/55">
              The same profile your people already message is the one a brand
              reads before a deal. These are the tools that sit around it, and
              none of them live in a separate app.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {creatorTools.map((tool, i) => {
              const Icon = tool.icon
              const featured = i === 0
              return (
                <Reveal key={tool.title} delay={(i % 3) * 0.06} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-3xl border p-6 ${
                      featured
                        ? 'border-plum bg-plum text-pure shadow-card-dark'
                        : 'border-plum/10 bg-pure shadow-card'
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl ${
                        featured ? 'bg-brand-grad text-plum' : 'bg-pink-50 text-pink-600'
                      }`}
                    >
                      <Icon size={20} />
                    </span>

                    <h3
                      className={`mt-4 font-display text-xl font-bold ${
                        featured ? 'text-pure' : ''
                      }`}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        featured ? 'text-pure/65' : 'text-plum/55'
                      }`}
                    >
                      {tool.body}
                    </p>

                    <ul
                      className={`mt-5 space-y-2 border-t pt-4 text-sm ${
                        featured ? 'border-pure/15' : 'border-plum/10'
                      }`}
                    >
                      {tool.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <Check
                            size={14}
                            className={`mt-0.5 shrink-0 ${
                              featured ? 'text-pink-300' : 'text-pink-500'
                            }`}
                          />
                          <span className={featured ? 'text-pure/65' : 'text-plum/60'}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── the deal, step by step ─────────────────────────────────────────── */}
      <section id="deals" className="section scroll-mt-28 bg-ink-800">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                  From invitation to payout, <span className="text-grad">in the open</span>
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-plum/55">
                  A collaboration is four states, and both sides see the same
                  ones. The interesting part is not the contract — it is that
                  the creator and the brand are never guessing where the work
                  is.
                </p>
              </Reveal>

              <ol className="mt-8">
                {dealSteps.map((step, i) => (
                  <li key={step.n} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < dealSteps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[19px] top-10 h-[calc(100%-2rem)] w-px bg-plum/15"
                      />
                    )}
                    <span className="step-num relative z-10">{step.n}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold">{step.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-plum/55">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-plum/10 bg-pure p-5 shadow-card sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-grad font-display text-sm font-bold text-plum">
                    N
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">Nova Sound</p>
                    <p className="text-[11px] text-plum/45">Brand deal · 1 Vibe + 2 Drops</p>
                  </div>
                  <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-bold text-pink-700">
                    Paid
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-ink-800 p-3">
                    <p className="text-[10px] text-plum/45">Amount</p>
                    <p className="mt-1 font-display text-xl font-bold">$1,250</p>
                  </div>
                  <div className="rounded-xl bg-ink-800 p-3">
                    <p className="text-[10px] text-plum/45">Released</p>
                    <p className="mt-1 font-display text-sm font-bold">On approval</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-[10px] font-semibold text-plum/45">
                    <span>Brief</span>
                    <span>Draft</span>
                    <span>Approved</span>
                    <span>Paid</span>
                  </div>
                  <div className="mt-2 flex gap-1.5" aria-hidden="true">
                    {['Brief', 'Draft', 'Approved', 'Paid'].map((state) => (
                      <span key={state} className="h-1.5 flex-1 rounded-full bg-pink-500" />
                    ))}
                  </div>
                </div>

                <p className="mt-4 rounded-xl bg-ink-800 p-3 text-xs leading-relaxed text-plum/55">
                  Payment releases only after the brand approves the deliverable.
                  The same four steps are visible to both sides.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the directory ──────────────────────────────────────────────────── */}
      <section id="directory" className="section scroll-mt-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                A directory brands can <span className="text-grad">actually read</span>
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-plum/55">
                At 2,000 keeps, a public creator profile becomes eligible
                for the directory. Brands search the work instead of guessing
                from a number, then start the conversation in the app.
              </p>

              <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
                {[
                  'Public creator profiles only — you choose to be listed.',
                  'Search by field, format and interest, not keep count alone.',
                  'Every introduction happens in a Convo, with the profile one tap away.',
                ].map((point) => (
                  <li key={point} className="flex gap-3 py-3.5 text-sm leading-relaxed text-plum/60">
                    <Check size={15} className="mt-0.5 shrink-0 text-pink-500" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn btn-glow mt-7">
                Ask about the directory
                <ArrowRight size={16} />
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-plum/10 bg-pure p-4 shadow-card sm:p-5">
                <div className="flex items-center gap-2 rounded-xl border border-plum/10 bg-ink-800 px-3 py-2.5 text-sm text-plum/45">
                  <Search size={15} />
                  Search creators, fields or interests
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {['All', 'Music', 'Drops', 'Live'].map((tab, i) => (
                    <span
                      key={tab}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                        i === 0 ? 'bg-plum text-pure' : 'bg-ink-800 text-plum/55'
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <div className="mt-3 divide-y divide-plum/10">
                  {directoryCreators.map((creator) => (
                    <div key={creator.name} className="flex items-center gap-3 py-3">
                      <span className="shrink-0 rounded-full bg-brand-grad p-[2px]">
                        <span className="block rounded-full bg-pure p-[2px]">
                          <img
                            src={creator.art}
                            alt=""
                            loading="lazy"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1 text-sm font-bold">
                          {creator.name}
                          <BadgeCheck
                            size={13}
                            className="text-pink-500"
                            aria-hidden="true"
                          />
                        </p>
                        <p className="truncate text-[11px] text-plum/45">
                          {creator.handle} · {creator.field}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold">{creator.keeps}</p>
                        <p className="text-[10px] text-plum/40">keeps</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-2 rounded-xl bg-pink-50 px-3 py-2 text-[10px] leading-relaxed text-plum/50">
                  A sample of the directory. Listing is not a ranking.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── sparks and circles ─────────────────────────────────────────────── */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                An audience that <span className="text-grad">comes back</span>
              </h2>
              <p className="mt-4 leading-relaxed text-plum/55">
                A keep is the start, not the whole relationship. Sparks and
                Circles give people a reason to return to the same person, not
                just the same feed.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-plum/10 bg-pure p-6 shadow-card sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-pink-50 text-pink-600">
                  <Flame size={20} />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">Sparks</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum/55">
                  A day two people talk on is one spark. Keep the streak alive
                  and new looks open up for both of you — a small reward for
                  staying close, not a leaderboard.
                </p>

                <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={`grid h-8 flex-1 place-items-center rounded-lg text-[11px] font-bold ${
                        i < 6 ? 'bg-brand-grad text-plum' : 'bg-ink-800 text-plum/35'
                      }`}
                    >
                      <Flame size={13} />
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-xs font-semibold text-plum/45">
                  6 days with your people · still going
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-plum/10 bg-pure p-6 shadow-card sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-pink-50 text-pink-600">
                  <Users size={20} />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">Circles</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum/55">
                  Land in a circle of fifty who chose the same interest, with a
                  small daily task. The best take goes to the top, so the room
                  stays worth opening.
                </p>

                <div className="mt-5 space-y-1.5">
                  {[
                    ['01', 'Maya', 'A bridge that only exists at 2am'],
                    ['02', 'Jordan', 'The last song you replay'],
                    ['03', 'Sofia', 'A room with the lights off'],
                  ].map(([n, name, take]) => (
                    <div
                      key={n}
                      className="flex items-center gap-2.5 rounded-xl bg-ink-800 px-3 py-2"
                    >
                      <span className="font-display text-[11px] font-bold text-pink-500">{n}</span>
                      <span className="text-xs font-bold">{name}</span>
                      <span className="ml-auto min-w-0 truncate text-[10px] text-plum/45">
                        {take}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 text-xs font-semibold text-plum/45">
                  Today’s Circle · 47 of 50 places filled
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the questions ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Questions creators <span className="text-grad">ask</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-plum/55">
                The short answers to the things that come up before a first
                collaboration.
              </p>
              <Link
                to="/contact"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
              >
                Still unsure? Talk to us
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>

            <Accordion items={creatorFaqs} />
          </div>
        </div>
      </section>

      {/* ── on to the rest of the site ─────────────────────────────────────── */}
      <section className="pb-8">
        <div className="wrap flex flex-wrap justify-center gap-3">
          <Link to="/features/drops-vibes" className="chip">
            Drops &amp; Vibes
          </Link>
          <Link to="/explore" className="chip">
            Explore the app
          </Link>
          <Link to="/blog" className="chip">
            Stories &amp; updates
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
