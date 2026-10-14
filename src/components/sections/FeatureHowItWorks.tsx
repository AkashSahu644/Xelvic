import { motion } from 'framer-motion'
import { ChevronRight, MousePointerClick, Lightbulb, Navigation } from 'lucide-react'
import type { FeatureGuide } from '../../data/features'
import PhoneFrame from '../ui/PhoneFrame'
import PhoneDemo from '../ui/PhoneDemo'
import Reveal from '../ui/Reveal'

/**
 * The "how does this actually work / where do I tap / how do I get
 * there" block shown on every feature detail page.
 */
export default function FeatureHowItWorks({
  guide,
  color = '#ec4899',
}: {
  guide: FeatureGuide
  color?: string
}) {
  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-bg" />
      <div className="wrap">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Where to tap, and how to get there
          </h2>
        </Reveal>

        {/* navigation path */}
        <Reveal delay={0.05}>
          <div className="mt-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <Navigation size={16} className="text-blue-glow" />
            {guide.path.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white/80">{p}</span>
                {i < guide.path.length - 1 && (
                  <ChevronRight size={15} className="text-white/30" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
          {/* live demo */}
          <Reveal className="flex justify-center lg:sticky lg:top-[calc(7rem+env(safe-area-inset-top))]">
            <PhoneFrame tilt glow={`${color}55`}>
              <PhoneDemo kind={guide.demo} />
            </PhoneFrame>
          </Reveal>

          {/* tap-by-tap steps */}
          <div>
            <ol className="space-y-5">
              {guide.steps.map((s, i) => (
                <motion.li
                  key={s.tap}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="step-num">{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 font-bold">
                      <MousePointerClick size={15} className="shrink-0 text-blue-glow" />
                      {s.tap}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{s.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* tips */}
            <div className="mt-6 rounded-2xl border border-blue/20 bg-blue/[0.06] p-5">
              <h4 className="flex items-center gap-2 font-bold text-blue-glow">
                <Lightbulb size={16} /> Good to know
              </h4>
              <ul className="mt-3 space-y-2">
                {guide.tips.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-white/70">
                    <span className="text-blue-glow">›</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
