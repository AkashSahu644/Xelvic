import { motion } from 'framer-motion'

type Props = {
  src: string
  alt?: string
  className?: string
  drift?: boolean
  tilt?: boolean
}

export default function DeviceMockup({ src, alt = 'Xelvic app screen', className = '', drift, tilt }: Props) {
  return (
    /* Same split as PhoneFrame: the CSS idle motion goes on a wrapper so it
       can't outrank Framer's inline transform on the element below. */
    <div className={drift ? 'animate-tilt-drift' : undefined}>
      <motion.div
        className={`relative ${className}`}
        initial={tilt ? { rotateY: 0 } : undefined}
        whileHover={tilt ? { rotateY: -6, rotateX: 4, scale: 1.02 } : undefined}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      >
        {/* glow behind */}
        <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue/20 blur-3xl" />
        {/* `min()` for the same reason PhoneFrame uses it: a fixed 260px shell
            on a 320px phone leaves no gutter and no room for the drift, so the
            frame takes 80% of the viewport when that is the smaller number and
            only settles at its designed width once the column can hold it. */}
        <div className="relative mx-auto w-[min(260px,80vw)] rounded-[2.6rem] border border-white/15 bg-ink-800 p-2.5 shadow-card-dark sm:w-[280px]">
          {/* side buttons */}
          <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-white/20" />
          <div className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-white/20" />
          <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-white/20" />
          <div className="relative overflow-hidden rounded-[2.1rem] bg-black">
            {/* notch */}
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="aspect-[9/19.5] w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
