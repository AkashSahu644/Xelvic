import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import PhoneFrame from './PhoneFrame'

export type Shot = { src: string; caption: string }

/**
 * A row of real app screenshots inside phone frames. Click to open a
 * swipeable lightbox. Fully keyboard + reduced-motion friendly.
 */
export default function ScreenshotGallery({
  shots,
  className = '',
}: {
  shots: Shot[]
  className?: string
}) {
  const [open, setOpen] = useState<number | null>(null)

  const go = (dir: number) =>
    setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length))

  /* Swipe. This component has described itself as a "swipeable lightbox" since
     it was written, and the only way to change screenshot was the pair of
     arrows — on a phone the smallest controls on the screen, and pushed below
     the caption rather than beside the frame. A picture viewer that does not
     answer a swipe is the one gesture people will try first, so this is what
     the arrows were standing in for.

     Only the two end points of the touch are read: a move that is mostly
     sideways and at least 45px long counts, and anything else is treated as a
     tap or as the page being scrolled. `justSwiped` is there because a browser
     still fires a synthetic click after a touch that moved, and that click
     lands on the scrim — which would close the lightbox the swipe was trying
     to navigate. It clears itself rather than being cleared by that click, so
     a suppressed click can never leave the scrim dead to the next real tap.

     The scrim carries `touch-pan-y`, which hands the horizontal axis to these
     handlers and leaves the vertical one to the browser, so a drag that is
     mostly up-and-down is still the browser's to deal with. */
  const touch = useRef<{ x: number; y: number } | null>(null)
  const justSwiped = useRef(false)

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current
    touch.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return
    justSwiped.current = true
    window.setTimeout(() => {
      justSwiped.current = false
    }, 350)
    go(dx < 0 ? 1 : -1)
  }

  return (
    <>
      <div className={`flex flex-wrap items-end justify-center gap-6 ${className}`}>
        {shots.map((s, i) => (
          <motion.button
            key={s.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => setOpen(i)}
            className="group relative"
            aria-label={`Open screenshot: ${s.caption}`}
          >
            <PhoneFrame size="sm" tilt glow="rgba(236,72,153,.25)">
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </PhoneFrame>
            <span className="mt-4 block text-center text-sm font-semibold text-plum/55 transition-colors group-hover:text-plum">
              {s.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (justSwiped.current) return
              setOpen(null)
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-[90] grid touch-pan-y place-items-center overscroll-contain bg-plum/90 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] backdrop-blur-md sm:p-6"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-[calc(1rem+env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full bg-pure/15 text-pure transition-colors hover:bg-pure/25 sm:right-5 sm:top-5"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* The extra bottom padding on this block is room for the arrow bar
                that sits under the caption below `sm`, so the caption never
                ends up underneath it. */}
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="pb-16 sm:pb-0"
            >
              <PhoneFrame size="fit" glow="rgba(236,72,153,.5)">
                <img
                  src={shots[open].src}
                  alt={shots[open].caption}
                  className="h-full w-full object-cover"
                />
              </PhoneFrame>
              <p className="mt-5 text-center font-semibold text-pure/85">
                {shots[open].caption}
              </p>
            </motion.div>

            {/* Arrows. On a phone they sit in a bar under the caption: a 48px
                control pinned over the left edge of a 320px screenshot covers
                the thing it is meant to be showing you. From `sm` up there is
                room beside the frame, so they go back to the sides, which is
                where a thumb looks for them. The wrapper is transparent to
                pointers so the scrim's click-to-dismiss keeps working between
                the two buttons. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] flex items-center justify-center gap-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:justify-between sm:px-8 md:px-12">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-pure/15 text-pure transition-colors hover:bg-pure/25"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-pure/15 text-pure transition-colors hover:bg-pure/25"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
