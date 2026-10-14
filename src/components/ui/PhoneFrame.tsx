import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  /**
   * Drawn over the shell and deliberately NOT clipped by it — the layer a
   * marketing shot uses to let one card run off the edge of the phone instead
   * of staying behind the glass.
   *
   * It is positioned in *screen* coordinates: `top-0 left-0` is the top-left
   * corner of the display, and `w-full` is the width of the display, so a child
   * can be placed exactly where the screen leaves room for it and then pushed
   * out past the frame.
   */
  overlay?: ReactNode
  className?: string
  /** idle motion — the device rocks slowly in 3D while it sits on screen */
  drift?: boolean
  /** 3D tilt-on-hover */
  tilt?: boolean
  /** glow colour behind the device */
  glow?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fit'
}

/* Mobile takes the *wider* end of every size. A 270px mockup on a 360px phone
 * leaves the demo inside too small to read, so the shell grows to use the
 * gutter and only settles back to its designed width from `sm` up. `min()` in
 * a width utility keeps it from ever overrunning the column it sits in. */
const widths = {
  sm: 'w-[min(230px,74vw)] sm:w-[230px]',
  md: 'w-[min(300px,84vw)] sm:w-[270px]',
  lg: 'w-[min(320px,88vw)] sm:w-[300px]',
  xl: 'w-[min(344px,86vw)] sm:w-[344px]',
  /* The lightbox, and the only size measured against the viewport *height*.
     The display inside is 19.5 units tall for every 9 wide, so a frame that
     respects only the width is 690px of glass at 320px across — taller than
     the phone showing it, which is enough to push the caption and the arrows
     off the bottom of the screen. `30vh` keeps the whole frame, its caption
     and its controls inside the viewport, and only binds on a short one: on a
     1080p screen it resolves to the full 320px it has always been. */
  fit: 'w-[min(320px,88vw,30vh)]',
}

/**
 * A high-fidelity phone shell. Children render inside the screen area
 * (a 9:19.5 viewport). Use for screenshots OR live animated demos.
 */
export default function PhoneFrame({
  children,
  overlay,
  className = '',
  drift,
  tilt,
  glow = 'rgba(236,72,153,.35)',
  size = 'md',
}: Props) {
  return (
    /* The idle motion goes on a wrapper rather than on the motion.div below.
       A CSS `animation` on `transform` outranks Framer's inline transform, so
       parking both on one element silently kills the tilt-on-hover. */
    <div className={drift ? 'animate-tilt-drift' : undefined}>
      <motion.div
        className={`relative ${className}`}
        initial={tilt ? { rotateX: 0, rotateY: 0 } : undefined}
        whileHover={tilt ? { rotateY: -7, rotateX: 5, scale: 1.02 } : undefined}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      >
        {/* glow */}
        <div
          className="absolute -inset-8 -z-10 rounded-[4rem] blur-3xl"
          style={{ background: glow }}
        />
        <div
          className={`relative mx-auto ${widths[size]} rounded-[2.4rem] border border-plum/15 bg-gradient-to-b from-pure to-ink-700 p-[10px] shadow-phone`}
        >
          {/* side buttons */}
          <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-plum/25" />
          <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-plum/25" />
          <div className="absolute -right-[3px] top-28 h-20 w-[3px] rounded-r bg-plum/25" />
          {/* The screen shell carries NO solid fill — every demo paints its own
              full-bleed background. A dark fill here used to bleed a thin arc
              through the antialiased rounded corners (the corner "border"); with
              nothing dark behind the content, the corners stay clean. */}
          <div className="relative overflow-hidden rounded-[1.95rem]">
            {/* dynamic-island notch */}
            <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1c0614] ring-1 ring-pure/10" />
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.95rem]">
              {children}
            </div>
          </div>
        </div>

        {/* The escaping layer. `border border-transparent` + the same padding as
            the shell means its content box lines up with the display to the
            pixel, so a child can be placed in screen coordinates and still sit
            outside the frame — nothing here is clipped. */}
        {overlay && (
          <div
            className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border border-transparent p-[10px] ${widths[size]}`}
          >
            <div className="relative h-full w-full">{overlay}</div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
