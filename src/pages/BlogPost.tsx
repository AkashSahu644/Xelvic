import { Navigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Sparkles } from 'lucide-react'
import { getPost, posts } from '../data/posts'
import Reveal from '../components/ui/Reveal'
import { CTABand } from '../components/sections/Bands'
import {
  AuthorAvatar,
  AuthorName,
  BRAND_ICON,
  PostActions,
} from '../components/ui/BlogBits'
import { useSEO } from '../hooks/usePageMeta'

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined
  /* An unknown slug is the only thing this page has to decide. The headline,
     the excerpt, the share card, the `article:*` tags and the BlogPosting node
     are all the route entry's — built from the same post object this page
     renders, so the date and byline in the head cannot disagree with the ones
     in the body. */
  useSEO({ noindex: !post })
  if (!post) return <Navigate to="/blog" replace />

  const sections = post.sections ?? []
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="pt-[calc(9rem+env(safe-area-inset-top))] md:pt-[calc(11rem+env(safe-area-inset-top))]">
        {/* ── the opening ───────────────────────────────────────────────────── */}
        <div className="wrap max-w-4xl">
          <Reveal delay={0.05}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
            >
              <ArrowLeft size={15} />
              All stories
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                {post.category}
              </span>
              <span className="text-plum/50">{fmt(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-plum/25" />
              <span className="text-plum/50">{post.readTime} read</span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-plum/60">{post.subtitle}</p>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-plum/10 py-4">
              <div className="flex items-center gap-3">
                <AuthorAvatar author={post.author} size={40} />
                <div className="min-w-0">
                  <p className="text-sm font-bold">
                    <AuthorName author={post.author} />
                  </p>
                  <p className="text-xs text-plum/45">
                    {post.authorRole ?? `Writing from ${post.category.toLowerCase()}`}
                  </p>
                </div>
              </div>
              <Link
                to="/blog#updates"
                className="rounded-full border border-plum/10 bg-pure px-4 py-2 text-xs font-bold text-plum/60 transition-colors hover:border-pink-300 hover:text-pink-600"
              >
                Keep the channel
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="wrap mt-10 max-w-4xl">
          <figure className="overflow-hidden rounded-[2rem] border border-plum/10 shadow-card">
            <img
              src={post.cover}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-pure px-5 py-3 text-xs text-plum/45">
              <span className="inline-flex items-center gap-1.5">
                <img src={BRAND_ICON} alt="" className="h-4 w-4 rounded-[22%]" />
                Xelvic · {post.category}
              </span>
              <span>{post.readTime} read</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ── the story, with its contents beside it ────────────────────────── */}
        <div className="wrap mt-12 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
            <div className="min-w-0">
              {post.body.map((para, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p
                    className={
                      i === 0
                        ? 'text-xl leading-relaxed text-plum/80'
                        : 'mt-5 text-lg leading-relaxed text-plum/70'
                    }
                  >
                    {para}
                  </p>
                </Reveal>
              ))}

              {post.takeaways && post.takeaways.length > 0 && (
                <Reveal>
                  <aside className="mt-8 rounded-2xl border border-plum/10 bg-ink-800 p-5 sm:p-6">
                    <p className="flex items-center gap-2 text-sm font-bold">
                      <Sparkles size={16} className="text-pink-500" />
                      The short version
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {post.takeaways.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-relaxed text-plum/65"
                        >
                          <Check size={15} className="mt-0.5 shrink-0 text-pink-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </Reveal>
              )}

              {sections.map((s, i) => (
                <div key={s.heading}>
                  <Reveal>
                    <section id={sectionId(s.heading)} className="scroll-mt-28">
                      <h2 className="mt-12 font-display text-2xl font-bold md:text-3xl">
                        {s.heading}
                      </h2>
                      {s.body.map((para, j) => (
                        <p key={j} className="mt-4 text-lg leading-relaxed text-plum/70">
                          {para}
                        </p>
                      ))}
                    </section>
                  </Reveal>

                  {i === 1 && post.quote && (
                    <Reveal>
                      <blockquote className="my-10 rounded-2xl border-l-4 border-pink-500 bg-ink-800 px-6 py-5">
                        <p className="font-display text-xl font-semibold leading-snug text-plum md:text-2xl">
                          “{post.quote}”
                        </p>
                        <footer className="mt-3 text-xs font-semibold text-plum/45">
                          Xelvic · {post.category}
                        </footer>
                      </blockquote>
                    </Reveal>
                  )}
                </div>
              ))}

              {post.tags && post.tags.length > 0 && (
                <Reveal>
                  <div className="mt-10 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-plum/45">Filed under</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-plum/10 bg-pure px-3 py-1 text-xs font-semibold text-plum/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              <Reveal>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-plum/10 bg-pure p-5 shadow-card">
                  <div>
                    <p className="text-sm font-bold">Take it into the app</p>
                    <p className="mt-1 text-xs text-plum/50">
                      Feel it, leave a note, or send it to a Convo.
                    </p>
                  </div>
                  <PostActions />
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-6 rounded-2xl border border-plum/10 bg-ink-800 p-5">
                  <div className="flex items-start gap-3">
                    <AuthorAvatar author={post.author} size={44} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold">
                        <AuthorName author={post.author} />
                      </p>
                      <p className="text-xs text-plum/45">
                        {post.authorRole ?? `Writing from ${post.category.toLowerCase()}`}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-plum/60">
                        {post.authorBio ??
                          'Notes from the people building Xelvic — what shipped, what changed and what is next.'}
                      </p>
                      <Link
                        to="/about"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-pink-600"
                      >
                        More about the team <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <Link
                  to="/blog"
                  className="group mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
                >
                  <ArrowLeft size={15} />
                  Back to all stories
                </Link>
              </Reveal>
            </div>

            {/* the contents rail */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                {sections.length > 0 && (
                  <nav
                    aria-label="In this story"
                    className="rounded-2xl border border-plum/10 bg-pure p-5 shadow-card"
                  >
                    <p className="text-sm font-bold">In this story</p>
                    <ol className="mt-3 space-y-2.5">
                      {sections.map((s, i) => (
                        <li key={s.heading}>
                          <a
                            href={`#${sectionId(s.heading)}`}
                            className="group flex gap-2 text-sm leading-snug text-plum/55 transition-colors hover:text-pink-600"
                          >
                            <span className="shrink-0 text-xs font-bold text-pink-500">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>{s.heading}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <div className="rounded-2xl border border-plum/10 bg-pure p-5 shadow-card">
                  <div className="flex items-center gap-2">
                    <img src={BRAND_ICON} alt="" className="h-8 w-8 rounded-[22%]" />
                    <span className="font-display text-sm font-extrabold lowercase">xelvic</span>
                    <BadgeCheck size={14} className="text-pink-500" />
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-plum/55">
                    The app behind these stories — chat, call, go live and vibe in one place.
                  </p>
                  <Link
                    to="/download"
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-plum px-4 py-2 text-xs font-bold text-pure transition-colors hover:bg-plum/90"
                  >
                    Get the app <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── more reading ─────────────────────────────────────────────────── */}
        <section className="section">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">More reading</h2>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
              >
                All stories
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 bg-pure shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-pink-soft"
                >
                  <div className="flex items-center gap-2.5 px-4 py-3">
                    <AuthorAvatar author={p.author} size={30} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold">
                        <AuthorName author={p.author} />
                      </p>
                      <p className="text-[10px] text-plum/45">{p.category}</p>
                    </div>
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

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-base font-bold leading-snug">{p.title}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-plum/50">
                      {p.excerpt}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-plum/40">
                      {fmt(p.date)} · {p.readTime} read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CTABand />
    </>
  )
}
