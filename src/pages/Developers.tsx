import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { useSEO } from '../hooks/usePageMeta'
import { deepLinks } from '../data/developers'
import { Link2, Smartphone, ShieldCheck } from 'lucide-react'

/* The three platform facts, lifted out of the JSX for readability. The
   deep-link table the ItemList is built from now lives in src/data/developers,
   where this page and the prerenderer both read it. */
const platform = [
  { icon: Link2, t: 'Deep links', d: 'Route users straight to a profile, drop, room or live with the xelvic:// scheme.' },
  { icon: Smartphone, t: 'Built on Flutter', d: 'A single, fast codebase that feels native on both iOS and Android.' },
  { icon: ShieldCheck, t: 'WebRTC calls', d: 'Peer-to-peer voice and video with media encrypted in transit.' },
]

export default function Developers() {
  useSEO()
  return (
    <>
      <PageHero
        title={<>The Xelvic <span className="text-grad">platform</span></>}
        sub="Link straight into the app with deep links, and build experiences that connect to Xelvic."
        wall="/media/walls/studio.jpg"
      />

      <section className="pb-10">
        <div className="wrap grid gap-5 md:grid-cols-3">
          {platform.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-grad text-white"><Icon size={22} /></span>
                  <h3 className="mt-4 text-lg font-bold">{c.t}</h3>
                  <p className="mt-2 text-sm text-white/55">{c.d}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Deep link reference</h2>
            <p className="mt-3 max-w-xl text-white/55">Open any of these from a browser or another app to jump straight into Xelvic.</p>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            {deepLinks.map((l, i) => (
              <Reveal key={l.path} delay={i * 0.04}>
                <div className={`flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center ${i % 2 ? 'bg-pure/55' : 'bg-pure'}`}>
                  <code className="font-mono text-sm text-blue-glow">{l.path}</code>
                  <span className="text-sm text-white/50">{l.desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/40">A full public API is on our roadmap. Want early access? <Link to="/contact" className="text-blue-glow underline">Get in touch</Link>.</p>
        </div>
      </section>
    </>
  )
}
