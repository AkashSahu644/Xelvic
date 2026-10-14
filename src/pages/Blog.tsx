import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { posts } from '../data/posts'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd } from '../data/jsonld'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Blog() {
  useSEO({
    title: 'Blog — Xelvic',
    description: 'Stories, updates and behind-the-scenes from the Xelvic team.',
    jsonLd: graph(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ),
  })
  const [featured, ...rest] = posts
  return (
    <>
      <PageHero
        title={<>Stories & <span className="text-grad">updates</span></>}
        sub="Product news, design deep-dives and the thinking behind Xelvic."
        wall="/media/walls/raat.jpg"
      />

      <section className="pb-20">
        <div className="wrap">
          {/* featured */}
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-white/55">{featured.excerpt}</p>
                <p className="mt-5 text-sm text-white/40">{fmt(featured.date)} · {featured.readTime} read</p>
              </div>
            </Link>
          </Reveal>

          {/* grid */}
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1.5 hover:border-white/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-glow">{p.category}</span>
                    <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-white/50">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-white/40">{fmt(p.date)} · {p.readTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
