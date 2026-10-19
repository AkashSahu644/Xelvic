import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, EyeOff, Heart, MessageCircle, RotateCcw, Share2 } from 'lucide-react'
import PhoneFrame from './PhoneFrame'
import { ConvoDemo } from './PhoneDemo'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * The five things worth watching for in a convo. `at` is a line count — the
 * number of messages that have landed in the thread — so a beat lights up at
 * the exact moment the screen shows it, and resets by itself when the thread
 * loops back to the top. No second timeline to drift out of step.
 */
const BEATS = [
  {
    at: 3,
    icon: Share2,
    label: 'It lands in the convo',
    body: 'A Vibe, a photo Drop or a track shared into a chat arrives as the thing itself, not a link — and it keeps its own heart and note count.',
  },
  {
    at: 4,
    icon: Heart,
    label: 'You feel it, right there',
    body: 'The heart fills on the post and the count moves 11 → 12. The app answers with “Felt. Tap to take it back.” Whether anyone sees that count is a setting.',
  },
  {
    at: 8,
    icon: MessageCircle,
    label: 'You comment — or leave a note',
    body: 'Tapping the comment icon on a post brings the sheet up over the thread. Comments on one tab go to everyone who can see the post; Notes on the other stay between the two of you.',
  },
  {
    at: 11,
    icon: Sparkles,
    label: 'You send a Spark',
    body: 'A Spark is not posted, it is sent to people — so the thread shows the Spark itself rather than a picture of one. Unlike a Drop, it is not a thing you keep.',
  },
  {
    at: 14,
    icon: EyeOff,
    label: 'And then it is gone',
    body: 'Opening it is the whole of a Spark. The card reads “Spark · opened” — and it goes for both sides of the thread, not just the one who opened it.',
  },
]

/** True from `md` up, where there is room for the full-size mockup. */
function useWide() {
  // Read it on the first render rather than in an effect, so the mockup does not
  // visibly resize a frame after it appears.
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

/** The convo screen, reporting how much of the thread is up. */
function Convo({ onCount }: { onCount: (shown: number) => void }) {
  const reduced = useReducedMotion()
  return <ConvoDemo reduced={reduced} onCount={onCount} />
}

/**
 * The convo, playing, with the five in-chat moves called out as they happen:
 * a post lands, you feel it, you leave a note, you send a Spark, and it is gone.
 *
 * The phone and the callouts share one timeline — the screen reports how many
 * messages are up and the callouts are pinned to those counts — so what you
 * read beside the phone is always what the phone is doing.
 */
export default function ConvoStory({ className = '' }: { className?: string }) {
  // how much of the thread has landed, mirrored out of the screen
  const [shown, setShown] = useState(0)
  // bumping this remounts the phone, so the story can be replayed on demand
  const [run, setRun] = useState(0)
  const wide = useWide()

  // the last beat to have fired is the one to point at
  let active = -1
  BEATS.forEach((b, i) => {
    if (shown >= b.at) active = i
  })
  // before the first beat lands, card 0 stands in as "up next"
  const current = Math.max(active, 0)

  return (
    <div className={`grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-16 ${className}`}>
      {/* the phone */}
      <div className="flex justify-center">
        {/* 230px on a phone, so the thread still reads *and* leaves room
            underneath for the beat that is playing */}
        <PhoneFrame drift tilt glow="rgba(236,72,153,.42)" size={wide ? 'md' : 'sm'}>
          <Convo key={run} onCount={setShown} />
        </PhoneFrame>
      </div>

      {/* what to watch for, lighting up as it happens */}
      <div>
        {/* progress rail — on a phone the beat cards swap in place, so this is
            what tells you how many of them there are */}
        <div className="mb-5 flex items-center gap-2.5 md:hidden">
          {BEATS.map((b, i) => (
            <span
              key={b.label}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-brand-grad' : 'w-4 bg-plum/15'
              }`}
            />
          ))}
          <span className="ml-1 text-xs font-bold text-plum/45">
            {current + 1} / {BEATS.length}
          </span>
        </div>

        <ol className="space-y-2.5">
          {BEATS.map((b, i) => {
            const on = i === current && active >= 0
            const done = i < active
            const Icon = b.icon
            return (
              <li
                key={b.label}
                /* on a phone only the card for the beat that is playing shows,
                   so the whole story fits under the mockup */
                className={`${i === current ? 'block' : 'hidden md:block'}`}
              >
                <div
                  /* the fixed floor stops the card resizing as one body swaps
                     for another, which would jog the mockup above it */
                  className={`relative min-h-[148px] overflow-hidden rounded-2xl border p-3.5 transition-all duration-500 md:min-h-0 ${
                    on
                      ? 'border-pink-400/60 bg-pure shadow-pink-soft'
                      : done
                        ? 'border-plum/10 bg-pure/70'
                        : 'border-plum/10 bg-pure/45 opacity-60'
                  }`}
                >
                  {/* the accent slides from card to card rather than blinking */}
                  {on && (
                    <motion.span
                      layoutId="convo-beat"
                      className="absolute inset-y-3.5 left-0 w-[3px] rounded-full bg-brand-grad"
                    />
                  )}
                  <div className="flex gap-3.5 pl-1.5">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                        on
                          ? 'bg-brand-grad text-pure'
                          : done
                            ? 'bg-pink-100 text-pink-600'
                            : 'bg-plum/[0.06] text-plum/40'
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <h4 className={`font-bold ${on ? '' : 'text-plum/75'}`}>{b.label}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-plum/60">{b.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <button
          type="button"
          onClick={() => {
            // the fresh screen reports again as it goes; clear the callouts now
            // so they do not sit lit through the first couple of seconds
            setShown(0)
            setRun((r) => r + 1)
          }}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-plum/15 bg-pure px-4 py-2 text-sm font-semibold text-plum/70 transition-colors hover:border-pink-400 hover:text-pink-600 md:mx-0"
        >
          <RotateCcw size={14} />
          Play it again
        </button>
      </div>
    </div>
  )
}

/**
 * One run of the convo, replayable, with the screen reporting itself as the
 * thread grows. Callers place the phone and the callouts wherever their layout
 * needs them and pass this state to both, so the two halves never drift apart.
 */
export function useConvoStory() {
  const [shown, setShown] = useState(0)
  const [run, setRun] = useState(0)
  const replay = () => {
    // clear the callouts now, then remount the screen so it plays from the top
    setShown(0)
    setRun((r) => r + 1)
  }
  return { shown, run, replay, setShown }
}

/** The phone on its own — pair it with `ConvoBeats` and `useConvoStory`. */
export function ConvoPhone({
  run,
  onCount,
  className = '',
}: {
  run: number
  onCount: (shown: number) => void
  className?: string
}) {
  const wide = useWide()
  return (
    <div className={`flex justify-center ${className}`}>
      <PhoneFrame drift tilt glow="rgba(236,72,153,.42)" size={wide ? 'md' : 'sm'}>
        <Convo key={run} onCount={onCount} />
      </PhoneFrame>
    </div>
  )
}

/**
 * The moving half of the story: a rail of five beats, the one that is playing,
 * and the replay control. `shown` comes from `useConvoStory`.
 */
export function ConvoBeats({
  shown,
  onReplay,
  className = '',
}: {
  shown: number
  onReplay: () => void
  className?: string
}) {
  let active = -1
  BEATS.forEach((b, i) => {
    if (shown >= b.at) active = i
  })
  const current = Math.max(active, 0)
  const beat = BEATS[current]
  const Icon = beat.icon

  return (
    <div className={className}>
      {/* one segment per beat — filled as each one lands */}
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {BEATS.map((b, i) => (
          <span
            key={b.label}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              i <= active ? 'bg-brand-grad' : 'bg-plum/15'
            }`}
          />
        ))}
      </div>

      <div className="relative mt-3 min-h-[184px] overflow-hidden rounded-2xl border border-plum/10 bg-pure p-4 shadow-pink-soft sm:min-h-[136px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={beat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex gap-3.5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-grad text-plum shadow-glow-sm">
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <h4 className="font-bold leading-snug">{beat.label}</h4>
              <p className="mt-1 text-sm leading-relaxed text-plum/60">{beat.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onReplay}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-plum/15 bg-pure px-4 py-2 text-sm font-semibold text-plum/70 transition-colors hover:border-pink-400 hover:text-pink-600"
      >
        <RotateCcw size={14} />
        Play it again
      </button>
    </div>
  )
}
