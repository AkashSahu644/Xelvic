import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import PhoneFrame from '../ui/PhoneFrame'
import PhoneDemo from '../ui/PhoneDemo'
import Reveal from '../ui/Reveal'
import { ArrowRight } from 'lucide-react'

const steps = [
  { n: '01', title: 'Sign up in seconds', body: 'Enter your number, confirm the code, pick a username. You are in.' },
  { n: '02', title: 'Find your people', body: 'Contacts already on Xelvic show up instantly — each number kept only as a one-way hash, with the name you saved it under.' },
  { n: '03', title: 'Start the vibe', body: 'Chat, call, go live, post a moment, or spin up a room. Make it yours with a theme.' },
]

export default function HowItWorksPreview() {
  return (
    <section className="section relative overflow-hidden">
      {/* Sized against the viewport so a phone is not asked to composite a
          600×400 layer under a 120px blur, most of which is off-screen there.
          From `sm` up it is the size it has always been. */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[min(400px,70vw)] w-[min(600px,120vw)] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]" />
      <div className="wrap">
        <SectionHeading
          title={<>Connecting, <span className="text-grad">minus the clutter</span></>}
          sub="No noise, no overload. Just a clean, delightful space to talk to your favourite people."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative flex justify-center">
            <PhoneFrame drift tilt>
              <PhoneDemo kind="chat" />
            </PhoneFrame>
            <motion.div
              className="absolute -right-2 top-10 glass hidden rounded-2xl px-4 py-3 sm:block"
              /* Off-axis drift instead of a straight bob, so this card and the
                 phone next to it don't pulse on the same vertical. */
              animate={{ y: [0, -9, 0], x: [0, 7, 0], rotate: [0, -1.6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm font-bold">💬 1,204 msgs</span>
              <span className="block text-xs text-white/50">delivered today</span>
            </motion.div>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="font-display text-2xl font-bold text-grad">{s.n}</span>
                  <div className="border-l border-white/10 pl-5">
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-white/55">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Link
                to="/how-it-works"
                className="group inline-flex items-start gap-2 pl-[2.6rem] text-sm font-semibold text-blue-glow sm:items-center"
              >
                See the full walkthrough — where to tap at every step
                <ArrowRight
                  size={16}
                  className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-1 sm:mt-0"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
