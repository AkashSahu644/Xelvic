import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/* ─────────────────────────────────────────────────────────────── the hero ─── */

/* The pool the bed is built from. Every file below is artwork the app itself
   uses as a picture — a Moment, a Drop, a track's cover, a chat wallpaper. The
   screenshots (chat, convo, live, audio) are deliberately not here: this is
   imagery, so it carries no words of its own, in the layout or in the picture.

   Six rails all draw from this one list, so the wall costs fourteen requests
   rather than the eighty-odd it would if each rail brought its own. */
const pool = [
  '/media/themes/alone/moments.jpg',
  '/media/themes/animeblue/drops.jpg',
  '/media/themes/catgirl/moment.jpg',
  '/media/themes/animeblue/wall.jpg',
  '/media/themes/teddy/audio.jpg',
  '/media/themes/teddy/drops.jpg',
  '/media/themes/animeblue/moments.jpg',
  '/media/themes/alone/audio.jpg',
  '/media/themes/catgirl/drops.jpg',
  '/media/themes/alone/wall.jpg',
  '/media/themes/teddy/moments.jpg',
  '/media/themes/alone/drops.jpg',
  '/media/themes/catgirl/audio.jpg',
  '/media/themes/animeblue/audio.jpg',
]

/* Six rails of that artwork drifting past each other — odd ones upward, even
   ones down — each starting at a different place in the pool, carrying its own
   number of tiles, and looping on its own length. That is the whole reason
   there are six of them and not a grid: a grid of tiles moving at one speed
   reads as a static picture being dragged, and this reads as a wall.

   Six rather than three because the bed is now the full width of the screen.
   At six the tiles land back at roughly the size they had when the wall sat in
   the right half, so the bed still reads as artwork rather than as wallpaper.

   The counts are set by the loop, not by taste. A rail shows two copies of
   itself and travels exactly half that, so one copy has to be at least as tall
   as the hero or the seam opens a gap — and the 4/5 tiles are shorter than the
   3/4 ones, which is why they carry one more.

   Neighbouring rails never share a picture: what one carries, the next does
   not. */
const railSpecs = [
  { offset: 0, count: 6, down: false, ratio: 'aspect-[3/4]', duration: 54 },
  { offset: 6, count: 7, down: true, ratio: 'aspect-[4/5]', duration: 64 },
  { offset: 13, count: 6, down: false, ratio: 'aspect-[3/4]', duration: 58 },
  { offset: 5, count: 7, down: true, ratio: 'aspect-[4/5]', duration: 71 },
  { offset: 12, count: 6, down: false, ratio: 'aspect-[3/4]', duration: 61 },
  { offset: 4, count: 7, down: true, ratio: 'aspect-[4/5]', duration: 67 },
]

/* The tiles one rail carries: `count` of them from `offset`, wrapping round the
   pool, so every rail starts somewhere else in it. */
const rails: { tiles: string[]; down: boolean; ratio: string; duration: number }[] =
  railSpecs.map(({ offset, count, down, ratio, duration }) => ({
    tiles: Array.from({ length: count }, (_, i) => pool[(offset + i) % pool.length]),
    down,
    ratio,
    duration,
  }))

/* Three claims, each one already made elsewhere on the site and each one true
   as written: 33 themes (features.ts), the Private Vault (features.ts), and
   nothing sold (Data, Privacy and Settings all say so). */
const promises = ['33 themes', 'Private Vault', 'Nothing sold, ever']

/**
 * One rail of the wall.
 *
 * The tiles are laid down twice and the whole strip travels exactly half its
 * own height, which is what makes the loop seamless — at -50% the second copy
 * sits precisely where the first one started. The `pb-4` on each copy is load
 * bearing: without it the strip's height is one gap short of two copies and the
 * seam jumps by that gap every time round.
 *
 * With motion off the strip simply does not travel, and the first copy is the
 * whole of what you see.
 */
function Rail({
  tiles,
  down,
  ratio,
  duration,
  reduced,
}: {
  tiles: string[]
  down: boolean
  ratio: string
  duration: number
  reduced: boolean
}) {
  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0"
        animate={reduced ? undefined : { y: down ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-4 pb-4">
            {tiles.map((src) => (
              <div
                key={src}
                className={`relative w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-plum/10 ${ratio}`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {/* A wash of the bed's own colour, so the wall sits *in* the
                    bed rather than on top of it. It is a light wash now that
                    the bed is light: the bed used to be near-black and the
                    artwork brighter than it, and the wash pulled the pictures
                    down towards the bed. The relationship is the same and the
                    direction has simply reversed.

                    Light, though, and getting lighter: at sixty per cent this
                    veil plus the scrim between them all but erased the
                    pictures, and the drift — the one thing in the hero that
                    moves — read as a slow smear rather than as artwork. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[#fff0f7]/30"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    /* One screen, and everything inside it. min-h-screen is the fallback for
       browsers that do not understand svh; the inline style wins where it is,
       and svh is the small-viewport height, so the section can never be taller
       than the space actually on screen with the browser chrome showing. */
    <section
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#ffd0e6_0%,#ffe9f3_52%,#ffffff_100%)] pt-[calc(92px+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] text-plum"
      style={{ minHeight: '100svh' }}
    >
      {/* ── the bed ──────────────────────────────────────────────────────────
          The wall of the app's own artwork, full bleed behind everything. It
          used to sit in the right half as a block you looked at; it is now the
          whole of the bed, and the words sit in it.

          No panel, no frame, no ring, no shadow, and no words — not a caption,
          not a label, not a number. No video either: the drifting wall is the
          moving thing now. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      >
        <div className="flex h-full gap-4">
          {rails.map((r) => (
            <Rail key={r.tiles[0]} {...r} reduced={reduced} />
          ))}
        </div>

        {/* The dissolve. The wall has no top and no bottom edge — the rails
            melt into the bed at both ends instead of stopping on a line,
            which is what stops the bed reading as a rectangle. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#ffd0e6] to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#ffffff] to-transparent"
        />
      </motion.div>

      {/* ── the scrim ────────────────────────────────────────────────────────
          A ramp from the left rather than a flat wash: solid where the words
          are, opening to the right so the wall shows through most where there
          is nothing to read. The vignette is what stops the open right-hand
          side reading as an accident.

          No frost on it at all. There was — forty pixels, then sixteen — and
          the case for it was that a collage of photographs at full sharpness
          competes with the headline for the same pixels. That case is still
          true and it loses anyway, because the wall is the only thing in this
          hero that moves: the section has no video, no card, no panel, and a
          blurred wall is a still-life of soft colour with a drift you have to
          be told about. The ramp already does the work the blur was there to
          do — the words sit on ninety-odd per cent of pink and the sharpness
          only opens up past them, on the right, where there is nothing to
          read. Dropping it also takes a full-screen backdrop filter off six
          rails of images that never stop moving.

          The tint is a light pink and little else. It carried a few per cent
          of black for a while, to take the glare off a bed that was reading
          flat and over-lit; it is back to near-pure `#fff0f7` now. Lighter
          also means further back — the same ramp, the same alphas, the same
          amount of the hero given up to it, but the pink stops announcing
          itself as a layer lying on the wall and lets the wall come forward
          instead. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(100deg,rgba(247,233,240,.93)_0%,rgba(247,233,240,.84)_38%,rgba(247,217,231,.48)_66%,rgba(247,202,223,.16)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(110%_90%_at_6%_50%,rgba(247,233,240,.78),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#ffffff] to-transparent" />

      <div className="wrap relative z-20 w-full">
        <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          {/* ── what the hero is saying ────────────────────────────────────── */}
          <div>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.07 }}
              /* Clamped rather than stepped. There is no height breakpoint in
                 Tailwind and this is a section that has to fit a laptop as well
                 as a desktop, so the type gives way to the viewport instead of
                 holding its size and pushing the section past the fold. The
                 ceiling is set by the widest line, which has to hold one line
                 in the left half of the grid. */
              className="font-display text-[clamp(2.6rem,5.3vw,4rem)] font-bold leading-[1] tracking-[-.055em]"
            >
              Focus, streak,
              <span className="mt-1 block bg-[linear-gradient(100deg,#9d174d,#ec4899_38%,#ff77b0_68%,#9d174d)] bg-[length:220%_auto] bg-clip-text text-transparent animate-gradient-pan">
                spark, vibe, chat.
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-6 max-w-[30rem] text-[16px] leading-[1.75] text-plum/70 sm:text-[17px]"
            >
              One app for the people you talk to every day. All four land in
              Chat — where you can like and comment on anything shared with you.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticButton to="/download" variant="glow">
                Get Xelvic
              </MagneticButton>
              {/* No colour overrides any more: the ghost variant is already
                  the light-page outline, and it was only being forced white
                  because the bed under it used to be black. */}
              <MagneticButton to="/how-it-works" variant="ghost">
                See how it works
              </MagneticButton>
            </motion.div>

            {/* The foot of the column, behind a rule so it reads as a standing
                promise rather than a third line of marketing. Hairline ticks
                rather than tick icons keep the hero free of glyphs. */}
            <motion.ul
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 hidden gap-x-7 gap-y-2.5 border-t border-plum/15 pt-5 sm:flex sm:flex-wrap"
            >
              {promises.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-plum/55"
                >
                  <span aria-hidden className="h-px w-4 bg-pink-500" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* The second column is deliberately empty: the grid still holds the
              words to the left half at the width they have always had, and the
              wall that used to be here is now the bed behind the whole
              section. */}
        </div>
      </div>
    </section>
  )
}
