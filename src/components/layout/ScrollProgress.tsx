import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      /* `top-0` puts this under the status bar on a phone that paints to the
         edges, where it is invisible for the whole scroll. */
      className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-[60] h-0.5 origin-left bg-brand-grad"
    />
  )
}
