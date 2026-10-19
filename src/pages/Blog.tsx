import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bell, Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { CTABand } from '../components/sections/Bands'
import { AuthorAvatar, AuthorName, BRAND_ICON, PostActions } from '../components/ui/BlogBits'
import { posts } from '../data/posts'
import { useSEO } from '../hooks/usePageMeta'

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/**
 * The blog is Xelvic's own reading surface, not a skin of someone else's app.
 * The shapes borrow what people already understand — a rail of lanes to pick
 * from, an author row on every post, a channel you can keep — but the words,
 * marks and icons are the ones the product actually uses: Feels, Notes, Convo,
 * Memories, Sparks and Drip.
 */

const categoryArt: Record<string, string> = {
  Product: '/media/walls/xelvic.jpg',
  Design: '/media/themes/catgirl/convo.jpg',
  Engineering: '/media/themes/alone/live.jpg',
  Creators: '/media/themes/animeblue/drops.jpg',
}

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

const storyArt = (category: string) =>
  category === 'All' ? '/media/walls/xelvic.jpg' : (categoryArt[category] ?? posts[0].cover)

const countFor = (category: string) =>
  category === 'All' ? posts.length : posts.filter((p) => p.category === category).length

export default function Blog() {
  useSEO()
  const [active, setActive] = useState('All')

  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active)
  const [featured, ...rest] = shown

  const choose = (category: string) => {
    setActive(category)
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── the hero, with a rail of story lanes ───────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-20 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img src="/media/walls/raat.jpg" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/80 to-ink-900" />
          <div className="absolute left-1/4 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
          <div className="absolute bottom-10 right-0 h-[min(340px,52vw)] w-[min(600px,100vw)] translate-x-1/4 rounded-full bg-pink-400/25 blur-[110px]" />
        </div>

        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-bold leading-[1.02] tracking-tight md:text-[clamp(3.75rem,6.4vw,4.75rem)]">
                  Stories &amp; <span className="text-grad">updates</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-plum/55 md:text-lg">
                  Product notes, design deep-dives and the engineering behind
                  Xelvic — written in the open by the people building it.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#latest" className="btn btn-glow">
                    Read the latest
                    <ArrowRight size={16} />
                  </a>
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-plum/55 transition-colors hover:text-pink-600"
                  >
                    Meet the team
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* the story lanes */}
            <Reveal delay={0.2}>
              <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-plum/10 bg-pure p-5 shadow-card sm:p-6 lg:mr-0">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold">Story lanes</h2>
                    <p className="mt-1 text-xs text-plum/50">Tap a lane to filter the page.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-ink-800 px-2.5 py-1 text-[11px] font-bold text-plum/55">
                    {shown.length} showing
                  </span>
                </div>

                <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                  {categories.map((c) => {
                    const on = active === c
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(c)}
                        className="group relative h-40 w-28 shrink-0 overflow-hidden rounded-2xl text-left"
                      >
                        <img
                          src={storyArt(c)}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent" />
                        <span
                          className={`absolute inset-0 rounded-2xl ring-2 ring-inset transition-all ${
                            on ? 'ring-pink-500' : 'ring-transparent group-hover:ring-pink-300'
                          }`}
                        />
                        <img
                          src={BRAND_ICON}
                          alt=""
                          className="absolute left-2 top-2 h-5 w-5 rounded-[22%]"
                        />
                        <span className="absolute inset-x-0 bottom-0 p-2.5">
                          <span className="block truncate text-xs font-bold text-pure">{c}</span>
                          <span className="text-[10px] font-medium text-pure/70">
                            {countFor(c)} {countFor(c) === 1 ? 'story' : 'stories'}
                          </span>
                        </span>
                        {on && (
                          <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-pure text-pink-600">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the feed: one featured story, then the rest ───────────────────── */}
      <section id="latest" className="scroll-mt-28 pb-20">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Latest <span className="text-grad">stories</span>
                </h2>
                <p className="mt-2 max-w-xl text-plum/55">
                  {active === 'All'
                    ? 'Product news, design deep-dives and engineering notes — straight from the build.'
                    : `Everything we have written about ${active.toLowerCase()}.`}
                </p>
              </div>
              <span className="rounded-full border border-plum/10 bg-pure px-3.5 py-1.5 text-xs font-bold text-plum/55">
                {active === 'All' ? 'All stories' : active} · {shown.length}
              </span>
            </div>
          </Reveal>

          {featured && (
            <Reveal delay={0.05}>
              <Link
                to={`/blog/${featured.slug}`}
                className="group mt-8 grid overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card md:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[430px]">
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-plum/75 px-2.5 py-1 text-xs font-bold text-pure backdrop-blur">
                    <img src={BRAND_ICON} alt="" className="h-4 w-4 rounded-[22%]" />
                    {featured.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  <div className="flex items-center gap-2.5">
                    <AuthorAvatar author={featured.author} size={36} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">
                        <AuthorName author={featured.author} />
                      </p>
                      <p className="text-xs text-plum/45">
                        {fmt(featured.date)} · {featured.readTime} read
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-plum/10 px-2.5 py-1 text-[11px] font-semibold text-plum/50">
                      Featured
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight md:text-4xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-plum/55">{featured.excerpt}</p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600">
                    Read the story
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-plum/10 pt-4">
                    <PostActions />
                    <span className="text-[11px] font-semibold text-plum/40">
                      Everything here starts inside the app
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 bg-pure shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-pink-soft"
                  >
                    <div className="flex items-center gap-2.5 px-4 py-3">
                      <AuthorAvatar author={p.author} size={32} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          <AuthorName author={p.author} />
                        </p>
                        <p className="text-[11px] text-plum/45">{p.category}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold text-plum/40">
                        {p.readTime}
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <img
                        src={BRAND_ICON}
                        alt=""
                        className="absolute bottom-3 left-3 h-6 w-6 rounded-[22%] shadow-sm"
                      />
                    </div>

                    <div className="flex flex-col p-4">
                      <PostActions />
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug">{p.title}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-plum/55">{p.excerpt}</p>
                      <p className="mt-3 text-xs font-semibold text-plum/40">
                        {fmt(p.date)} · {p.readTime} read
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── the updates channel ────────────────────────────────────────────── */}
      <section id="updates" className="section scroll-mt-28 bg-ink-800">
        <div className="wrap">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Keep up with the build, <span className="text-grad">in the open</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-plum/55">
                Xelvic Updates is a channel, not a newsletter — product notes,
                design deep-dives and engineering war stories land there first,
                and the team answers in the replies.
              </p>

              <ul className="mt-7 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                  <p>
                    <b>Product notes.</b>{' '}
                    <span className="text-plum/55">What shipped this week, and why it shipped.</span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                  <p>
                    <b>Design deep-dives.</b>{' '}
                    <span className="text-plum/55">How a theme goes from mood to mascot to whole app.</span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                  <p>
                    <b>Engineering, unfiltered.</b>{' '}
                    <span className="text-plum/55">The trade-offs behind calls, sync and speed.</span>
                  </p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card">
                <div className="flex items-center gap-3 border-b border-plum/10 bg-pink-50 px-4 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-grad p-[2px]">
                    <img
                      src={BRAND_ICON}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <AuthorName
                      author="Xelvic Updates"
                      className="text-sm font-bold"
                    />
                    <p className="text-[11px] text-plum/50">Xelvic channel · 2.4k keeps</p>
                  </div>
                  <Bell size={17} className="shrink-0 text-plum/50" />
                </div>

                <div className="space-y-2 bg-[#fbfbfb] px-4 py-4">
                  <span className="mx-auto block w-fit rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[10px] font-semibold text-plum/45">
                    Today
                  </span>
                  {posts.slice(0, 2).map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      className="block max-w-[88%] rounded-2xl rounded-tl-md bg-pure px-3.5 py-2.5 text-sm leading-relaxed shadow-[0_1px_2px_rgba(58,10,36,.06)] transition-colors hover:bg-pink-50"
                    >
                      {p.excerpt}
                      <span className="mt-1.5 flex items-center justify-between gap-2 text-[10px] text-plum/40">
                        <span>
                          {fmt(p.date)} · {p.readTime} read
                        </span>
                        <ArrowRight size={12} className="text-pink-500" />
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-plum/10 bg-pure px-4 py-3">
                  <Link
                    to="/download"
                    className="flex-1 rounded-full bg-plum px-4 py-2.5 text-center text-xs font-bold text-pure transition-colors hover:bg-plum/90"
                  >
                    Join the channel
                  </Link>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-pink-100 text-pink-600">
                    <Bell size={16} />
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── on to the rest of the site ─────────────────────────────────────── */}
      <section className="pb-8 pt-16">
        <div className="wrap flex flex-wrap justify-center gap-3">
          <Link to="/features" className="chip">
            All features
          </Link>
          <Link to="/how-it-works" className="chip">
            How it works
          </Link>
          <Link to="/whats-new" className="chip">
            What&rsquo;s new
          </Link>
          <Link to="/explore" className="chip">
            Explore the app
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
