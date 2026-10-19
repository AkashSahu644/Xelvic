import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { themes, themeCovers } from '../../data/themes'
import { cast, mascotFor } from '../../data/characters'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

/* Themes that ship their own character, so the marquee can show the pair —
   the world and the mascot that comes with it. Unicorn is cover-only. */
const hasCast = new Set(cast.map((c) => c.slug))

export default function ThemesShowcase() {
  const withCover = themes.filter((t) => t.cover)
  return (
    <section className="section relative overflow-hidden bg-ink-800">
      <div className="wrap">
        <SectionHeading
          title={<>A look for <span className="text-grad">every you</span></>}
          sub="Flip your whole app into a brand-new world with a single tap — anime, kitsune, shinobi, unicorn, mecha, pastel, neon and dozens more. Each one brings its own character along."
        />

        {/* marquee of theme covers */}
        <div className="mt-16 space-y-5">
          {[0, 1].map((row) => {
            const slice = withCover.filter((_, i) => i % 2 === row)
            return (
              <div key={row} className="mask-fade-x overflow-hidden">
                <motion.div
                  className="flex gap-5"
                  animate={{ x: row === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  {[...slice, ...slice].map((t, i) => (
                    <Link
                      key={t.slug + i}
                      to="/features/themes"
                      className="group relative aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10"
                    >
                      <img
                        src={t.cover}
                        alt={t.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum/80 to-transparent" />
                      {hasCast.has(t.slug) && (
                        <img
                          src={mascotFor(t.slug, 'typing')}
                          alt=""
                          loading="lazy"
                          className="absolute inset-x-0 top-[12%] mx-auto h-[58%] w-auto object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.08]"
                        />
                      )}
                      <span className="absolute bottom-3 left-3 text-sm font-bold text-pure">
                        {t.emoji} {t.name}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* colour-theme swatch wall */}
        <Reveal className="mt-10">
          <div className="mask-fade-x overflow-hidden">
            <motion.div
              className="flex gap-3"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            >
              {[...themeCovers, ...themeCovers].map((t, i) => (
                <Link
                  key={t.name + i}
                  to="/features/themes"
                  title={t.name}
                  className="group relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-xl border border-white/10"
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* The name of the theme, which used to be revealed on
                      hover. On a phone there is no hover, so the whole swatch
                      wall was a grid of unnamed colours and the only way to
                      learn what any of them was called was to tap through to
                      another page — for a row whose entire job is to show you
                      the names. It is visible by default now and only hides
                      itself again on a device that can actually hover. */}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/80 to-transparent px-2 py-1.5 text-[10px] font-bold text-pure transition-opacity hoverable:opacity-0 hoverable:group-hover:opacity-100">
                    {t.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
          {themes.map((t) => (
            <Link key={t.slug} to="/features/themes" className="chip">
              {t.emoji} {t.name}
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Link
            to="/features/themes#cast"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-glow transition-colors hover:text-pink-400"
          >
            Meet all {cast.length} theme characters
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
