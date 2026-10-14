import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo, { type DemoKind } from '../components/ui/PhoneDemo'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { features } from '../data/features'
import { graph, webPageLd, howToLd } from '../data/jsonld'
import { ChevronRight, Navigation } from 'lucide-react'

const steps: {
  n: string
  title: string
  body: string
  demo: DemoKind
  taps: string[]
}[] = [
  {
    n: '01',
    title: 'Create your account',
    body: 'Enter your phone number, confirm the one-time code we text you, and pick a username. No email, no fuss — the whole thing takes under a minute.',
    demo: 'chat',
    taps: ['Open Xelvic', 'Enter number', 'Confirm code', 'Pick a @username'],
  },
  {
    n: '02',
    title: 'Find your people',
    body: 'Allow contacts and everyone already on Xelvic shows up right away — your numbers never leave your device in readable form. Prefer to search? Find anyone by name or @handle.',
    demo: 'chat',
    taps: ['Allow contacts', 'See who is on Xelvic', 'or Search by @handle'],
  },
  {
    n: '03',
    title: 'Start talking',
    body: 'Send a message, hold the mic for a voice note, or tap the phone and camera icons to start a voice or video call. Everything is offline-first, so your messages always get there.',
    demo: 'call',
    taps: ['Open a chat', 'Type or hold 🎤', 'Tap 📞 / 🎥 to call'],
  },
  {
    n: '04',
    title: 'Share your day',
    body: 'Post a Moment, drop a photo, or go Live. What you share with the people you follow turns up today and becomes a Memory tomorrow.',
    demo: 'moments',
    taps: ['Tap your avatar +', 'Add text / music / poll', 'Post — lasts 24h'],
  },
  {
    n: '05',
    title: 'Make it yours',
    body: 'Flip into any of 50+ themes, set a chat wallpaper, and dress your profile in Drip. Keep a spark going with a friend — both of you say something before the day is out — to unlock even more.',
    demo: 'audio',
    taps: ['Profile → Settings ⚙️', 'Appearance → Themes', 'Pick a look & apply'],
  },
]

export default function HowItWorks() {
  /* The HowTo node is the reason this page is worth marking up at all. "How do
     I get started on Xelvic" is a question somebody asks an assistant in a
     full sentence, and a HowTo is the one schema that answers it with the
     actual steps rather than dumping the page and hoping. The steps below are
     the same five the page renders, in the same order, with the same taps —
     the markup is a transcription of the visible walkthrough, not a summary
     written for a crawler. */
  useSEO({
    title: 'How it works — Xelvic',
    description:
      'From your first hello to going live: the five steps to get started on Xelvic, with exactly where to tap at each one.',
    image: '/media/walls/safar.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'How Xelvic works',
        description:
          'Five steps from installing Xelvic to going live with your friends — create an account, find your people, start talking, share your day, and make the app yours.',
        path: '/how-it-works',
        image: '/media/walls/safar.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ],
      }),
      howToLd({
        name: 'How to get started on Xelvic',
        description:
          'Five steps from downloading Xelvic to going live with your friends, with the exact taps at each one.',
        path: '/how-it-works',
        totalTime: 'PT5M',
        tools: ['Xelvic for iOS or Android'],
        steps: steps.map((s) => ({
          name: s.title,
          text: `${s.body} In the app: ${s.taps.join(' → ')}.`,
        })),
      }),
    ),
  })
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <>
      <PageHero
        title={
          <>
            Up and running in <span className="text-grad">minutes</span>
          </>
        }
        sub="Five simple steps from downloading the app to going live with your people — with exactly where to tap at each one."
        wall="/media/walls/safar.jpg"
      />

      {/* interactive step walkthrough */}
      <section className="pb-10">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* phone */}
          <Reveal className="flex justify-center lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.demo + active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <PhoneFrame tilt>
                  <PhoneDemo kind={step.demo} />
                </PhoneFrame>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* steps */}
          <div className="space-y-3">
            {steps.map((s, i) => {
              const open = i === active
              return (
                <Reveal key={s.n} delay={i * 0.04}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full rounded-3xl border p-6 text-left transition-all duration-300 ${
                      open
                        ? 'border-blue/40 bg-blue/[0.07] shadow-glow-sm'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-display text-3xl font-bold ${
                          open ? 'text-grad' : 'text-white/25'
                        }`}
                      >
                        {s.n}
                      </span>
                      <h2 className="font-display text-xl font-bold md:text-2xl">{s.title}</h2>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-white/65">{s.body}</p>
                          <div className="mt-5 flex flex-wrap items-center gap-2">
                            <Navigation size={15} className="text-blue-glow" />
                            {s.taps.map((t, j) => (
                              <span key={t} className="flex items-center gap-2">
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                                  {t}
                                </span>
                                {j < s.taps.length - 1 && (
                                  <ChevronRight size={13} className="text-white/30" />
                                )}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* feature directory — how to reach each feature */}
      <section className="section relative overflow-hidden">
        <div className="aurora-bg" />
        <div className="wrap">
          <SectionHeading
            title={
              <>
                How to reach <span className="text-grad">every feature</span>
              </>
            }
            sub="Not sure where something lives? Here's the path to each one — tap through for the full walkthrough."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal key={f.slug} delay={(i % 3) * 0.06}>
                  <Link
                    to={`/features/${f.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl text-white"
                      style={{ background: `linear-gradient(135deg, ${f.color}, #ff8fc4)` }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-bold">{f.name}</h3>
                    <p className="mt-1 flex-1 text-sm text-white/55">{f.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-glow">
                      See how it works
                      <ChevronRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
