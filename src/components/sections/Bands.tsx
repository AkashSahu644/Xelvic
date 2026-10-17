import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import StoreButton from '../ui/StoreButton'
import { themeCovers } from '../../data/themes'
import { site } from '../../data/site'

/* The closing pitch sits on the app's own wallpapers: every tile is a real
 * theme cover pulled from the build, so the band proves the "50+ themes"
 * claim instead of just decorating it. No character art here — the mascot
 * poses in /media/char are still the old blue robot, and blue fights a
 * pink-and-white page. */
const mosaic = themeCovers.slice(0, 24)

export function CTABand() {
  return (
    <section className="section relative overflow-hidden">
      {/* 4x6, 6x4 and 8x3 all come to 24 tiles, so the mosaic fills the band
          edge to edge at every breakpoint without a ragged last row. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-6 gap-1 sm:grid-cols-6 sm:grid-rows-4 lg:grid-cols-8 lg:grid-rows-3"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        {mosaic.map((t, i) => (
          <motion.img
            key={t.src}
            src={t.src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 8) * 0.035 + Math.floor(i / 8) * 0.09 }}
          />
        ))}
      </motion.div>

      {/* Wash: white top and bottom so the band melts into the page, plus a
          soft pool behind the card so the type has a calm field to sit on. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'linear-gradient(180deg,#fff 0%,rgba(255,255,255,0) 18%,rgba(255,255,255,0) 82%,#fff 100%)',
            'radial-gradient(ellipse 64% 54% at 50% 50%,rgba(255,255,255,.95) 0%,rgba(255,255,255,.86) 48%,rgba(255,244,249,.5) 76%,rgba(255,244,249,.5) 100%)',
          ].join(','),
        }}
      />

      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-plum/[0.07] bg-pure/80 px-5 py-8 text-center shadow-[0_28px_70px_-18px_rgba(157,23,77,.3)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-12 sm:py-12">

            <h2 className="font-display text-[clamp(1.85rem,8vw,2.25rem)] font-bold leading-[1.08] md:text-5xl">
              Your people are waiting on <span className="text-grad">Xelvic</span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-plum/60 sm:mt-5 sm:text-lg">
              Download the app, invite your crew and start chatting, calling and vibing in
              minutes.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
              {/* The Android badge goes straight to the Play listing: this is
                  the band that closes the pitch, and a person who has decided
                  to install should not have to pass through a second page to
                  say which phone they hold. The Apple badge still hands off to
                  /download, which is where the iPhone story lives. */}
              <StoreButton store="google" variant="glow" href={site.playStore} className="w-full max-w-[240px] sm:w-auto" />
              <StoreButton store="apple" variant="ghost" to="/download" className="w-full max-w-[240px] sm:w-auto" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm font-semibold text-plum/50">
            Free to download · Android · 50+ themes · Encrypted chats &amp; calls
          </p>
        </Reveal>
      </div>
    </section>
  )
}
