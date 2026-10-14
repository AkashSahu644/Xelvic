import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MagneticButton from '../components/ui/MagneticButton'
import { useSEO } from '../hooks/usePageMeta'

export default function NotFound() {
  useSEO({ title: 'Page not found — Xelvic', noindex: true })
  return (
    /* `min-h-screen` is 100vh, and on a phone 100vh is the height the page
       would have with the browser's own bars scrolled away — so a "full
       height" block is always a little taller than what is on screen, and this
       one is centred inside it, which is what pushes the character off the
       middle. The inline `svh` is the small-viewport height and wins wherever
       it is understood; the class is the fallback where it is not. */
    <section
      className="relative grid min-h-screen place-items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]"
      style={{ minHeight: '100svh' }}
    >
      {/* Measured against the viewport rather than fixed: a 600px-wide, 120px
          blur is a large layer for a phone to composite, and most of it is
          off-screen there anyway. From `sm` up it is the size it always was. */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[min(400px,70vw)] w-[min(600px,120vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
      <div className="wrap text-center">
        {/* The idle sway sits on a wrapper: a CSS `animation` on `transform`
            outranks Framer's inline transform, so sharing one element would
            quietly kill the entrance scale below. */}
        <div className="animate-sway origin-bottom">
          <motion.img
            src="/media/char/wait.png"
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto w-32"
          />
        </div>
        <h1 className="mt-6 font-display text-7xl font-bold text-grad md:text-8xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">This page wandered off</h2>
        <p className="mx-auto mt-3 max-w-md text-white/55">The page you're after doesn't exist — but your people are still just a tap away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <MagneticButton to="/" variant="glow">Back home</MagneticButton>
          <Link to="/characters" className="btn btn-ghost">Meet the cast</Link>
        </div>
      </div>
    </section>
  )
}
