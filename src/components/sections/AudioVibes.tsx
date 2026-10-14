import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Music, Headphones, Volume2, Radio, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import AudioPlayer from '../ui/AudioPlayer'
import Reveal from '../ui/Reveal'

const highlights = [
  { icon: Music, label: '10 built-in tracks', desc: 'Curated vibes for every moment' },
  { icon: Headphones, label: 'Offline ready', desc: 'Save tracks for later' },
  { icon: Volume2, label: 'Share to chat', desc: 'Drop vibes into conversations' },
  { icon: Radio, label: 'Live mixing', desc: 'Set the mood in real-time' },
]

export default function AudioVibes() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* drifting pink blobs behind the deck */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #db2777, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #ff8fc4, transparent 65%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ---------- the pitch ---------- */}
        <div>
          <SectionHeading
            center={false}
            title={
              <>
                Audio vibes for <span className="text-grad">every mood</span>
              </>
            }
            sub="Golden hour, night drive, rainfall, neon… set the tone of your chats with a library of sounds built right into Xelvic."
          />

          <Reveal delay={0.15}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-4 rounded-2xl border border-plum/[0.08] bg-pure px-4 py-3.5 shadow-[0_14px_30px_-24px_rgba(58,10,36,.7)] transition-colors hover:border-pink-500/25"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-grad text-plum">
                    <h.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight text-plum">
                      {h.label}
                    </span>
                    <span className="block text-xs leading-tight text-plum/50">{h.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/features/audio"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-pink-600 transition-colors hover:text-pink-500"
            >
              Explore the audio library
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        {/* ---------- the deck ---------- */}
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-brand-grad opacity-[0.09] blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-plum/[0.08] bg-pure p-6 shadow-card md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-grad shadow-glow-sm">
                  <Music size={19} className="text-plum" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold leading-tight text-plum">
                    Xelvic Soundboard
                  </h3>
                  <p className="text-xs text-plum/45">Tap to preview · Ships with the app</p>
                </div>
                {/* live equalizer, purely decorative */}
                <span className="ml-auto flex shrink-0 items-end gap-[3px]" aria-hidden>
                  {[0, 1, 2, 3, 4].map((b) => (
                    <motion.span
                      key={b}
                      className="w-[3px] rounded-full bg-brand-grad"
                      animate={{ height: ['8px', `${14 + b * 4}px`, '8px'] }}
                      transition={{
                        duration: 0.8 + b * 0.15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </span>
              </div>

              <AudioPlayer />

              <p className="mt-5 text-center text-[11px] text-plum/40">
                Preview clips — full tracks live in the app
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
