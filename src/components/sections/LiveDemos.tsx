import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import PhoneFrame from '../ui/PhoneFrame'
import PhoneDemo, { type DemoKind } from '../ui/PhoneDemo'
import Reveal from '../ui/Reveal'
import { ArrowRight } from 'lucide-react'

const reels: {
  kind: DemoKind
  label: string
  title: string
  body: string
  to: string
  color: string
}[] = [
  {
    kind: 'chat',
    label: 'Messaging',
    title: 'Chats that just work',
    body: 'Texts, voice notes, media and files — offline-first, so nothing gets lost when the signal drops.',
    to: '/features/chat',
    color: '#ec4899',
  },
  {
    kind: 'call',
    label: 'Calls',
    title: 'HD voice & video',
    body: 'Ring anyone straight from a chat. Peer-to-peer and encrypted, smooth even on shaky networks.',
    to: '/features/calls',
    color: '#db2777',
  },
  {
    kind: 'moments',
    label: 'Moments',
    title: 'Share your day',
    body: 'Post a Moment with music and polls. Up today for the people you follow, a Memory tomorrow.',
    to: '/features/moments',
    color: '#ff5fa2',
  },
  {
    kind: 'live',
    label: 'Live & Rooms',
    title: 'Go live, host a room',
    body: 'Camera live, audio rooms where you hand out the mic, or Watch Together on the same screen.',
    to: '/features/live-rooms',
    color: '#be185d',
  },
  {
    kind: 'drops',
    label: 'Drops & Vibes',
    title: 'Your feed, your frame',
    body: 'Post a photo Drop — every picture pinned to the same clean frame — or a Vibe, short video with a track laid under it. React, reply and leave notes on anything.',
    to: '/features/drops-vibes',
    color: '#ff5fa2',
  },
  {
    kind: 'audio',
    label: 'Audio',
    title: 'A soundtrack built in',
    body: 'Stream the charts, build playlists and drop a track straight into any chat — online or off.',
    to: '/features/audio',
    color: '#ff8fc4',
  },
]

export default function LiveDemos() {
  const [active, setActive] = useState(0)
  const reel = reels[active]

  return (
    <section className="section relative overflow-hidden bg-ink-800">
      <div className="aurora-bg aurora-bg--drift" />
      <div className="wrap">
        <SectionHeading
          eyebrow="See it move"
          title={
            <>
              Watch Xelvic <span className="text-grad">in action</span>
            </>
          }
          sub="No downloads needed — these are live, interactive previews of the real app. Tap a feature to play it."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* picker */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2">
              {reels.map((r, i) => (
                <button
                  key={r.kind}
                  data-active={active === i}
                  onClick={() => setActive(i)}
                  className="tab"
                >
                  {r.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="mt-7"
              >
                <h3 className="font-display text-3xl font-bold md:text-4xl">{reel.title}</h3>
                <p className="mt-4 max-w-md text-lg text-white/60">{reel.body}</p>
                <Link
                  to={reel.to}
                  className="group mt-6 inline-flex items-center gap-2 font-semibold text-blue-glow"
                >
                  See how it works
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="mt-8 flex gap-2">
              {reels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show demo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-8 bg-brand-grad' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* phone */}
          <Reveal className="order-1 flex justify-center lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                transition={{ duration: 0.45 }}
              >
                <PhoneFrame tilt glow={`${reel.color}55`} size="lg">
                  <PhoneDemo kind={reel.kind} />
                </PhoneFrame>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
