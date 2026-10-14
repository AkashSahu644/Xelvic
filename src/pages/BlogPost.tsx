import { useParams, Navigate, Link } from 'react-router-dom'
import { getPost, posts } from '../data/posts'
import Reveal from '../components/ui/Reveal'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, articleLd, breadcrumbLd } from '../data/jsonld'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined
  useSEO({
    title: post ? `${post.title} — Xelvic Blog` : 'Blog — Xelvic',
    description: post?.excerpt,
    image: post?.cover,
    type: 'article',
    noindex: !post,
    jsonLd: post
      ? graph(
          articleLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            image: post.cover,
            datePublished: post.date,
            author: post.author,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )
      : undefined,
  })
  if (!post) return <Navigate to="/blog" replace />
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      {/* The article starts under the fixed bar, so it carries the same notch
          clearance the PageHero does rather than a bare padding-top. */}
      <article className="pt-[calc(9rem+env(safe-area-inset-top))] md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="wrap max-w-3xl text-center">
          <Reveal><span className="eyebrow mb-5">{post.category}</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-white/50">{post.author} · {fmt(post.date)} · {post.readTime} read</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="wrap mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img src={post.cover} alt={post.title} className="aspect-video w-full object-cover" />
          </div>
        </Reveal>

        <div className="wrap mt-12 max-w-2xl">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="mb-6 text-lg leading-relaxed text-white/70">{para}</p>
            </Reveal>
          ))}
          <Link to="/blog" className="mt-6 inline-block text-sm font-semibold text-blue-glow">← Back to all posts</Link>
        </div>

        <section className="section">
          <div className="wrap">
            <h2 className="mb-8 font-display text-2xl font-bold">More reading</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {more.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1">
                  <img src={p.cover} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-glow">{p.category}</span>
                    <h3 className="mt-1.5 font-bold leading-snug">{p.title}</h3>
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
