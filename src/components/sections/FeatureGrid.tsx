import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { features } from '../../data/features'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/* Two cards run wide so the seven features fill a 3-column grid exactly
   (2+1 / 1+1+1 / 1+2) — no half-empty last row. */
const wide = new Set(['chat', 'themes'])

/* Presentation-only: the seven defaults in data/features.ts draw on just two
   theme packs, so three cards would repeat the same artwork side by side.
   Spread them across all four packs (and different screens within each) so
   every card shows something different. Other pages keep using `f.screen`. */
const art: Record<string, string> = {
  chat: '/media/themes/animeblue/chat.jpg',
  calls: '/media/themes/teddy/live.jpg',
  moments: '/media/themes/teddy/moments.jpg',
  'live-rooms': '/media/themes/catgirl/live.jpg',
  'drops-vibes': '/media/themes/animeblue/drops.jpg',
  audio: '/media/themes/alone/audio.jpg',
  themes: '/media/themes/catgirl/convo.jpg',
}

/* Cards that carry a looping clip instead of a still. Each plays on hover and
   falls back to its `art` image as the poster (and when reduced-motion is on). */
const cardVideo: Record<string, string> = {
  chat: '/media/video/feature-chat.mp4',
  calls: '/media/video/feature-calls.mp4',
  moments: '/media/video/feature-moments.mp4',
  'live-rooms': '/media/video/feature-live-rooms.mp4',
  'drops-vibes': '/media/video/feature-drops-vibes.mp4',
  audio: '/media/video/feature-audio.mp4',
  themes: '/media/video/feature-themes.mp4',
}

export default function FeatureGrid() {
  const reduced = useReducedMotion()
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  // Play a card's clip only while it is hovered; rewind on leave.
  const playVideo = (slug: string) => videoRefs.current[slug]?.play().catch(() => {})
  const stopVideo = (slug: string) => {
    const v = videoRefs.current[slug]
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <section className="section relative">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            center={false}
            title={<>One app for <span className="text-grad">every way you connect</span></>}
            sub="From a quick hello to an all-night live room — Xelvic keeps your whole crew in one playful place."
          />
          <Reveal delay={0.15} className="shrink-0">
            <MagneticButton to="/features" variant="ghost">
              See all features
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const vid = cardVideo[f.slug]
            const useVideo = Boolean(vid) && !reduced
            return (
              <Reveal
                key={f.slug}
                delay={(i % 3) * 0.08}
                className={`h-full ${f.slug === 'chat' ? 'sm:col-span-2' : ''} ${wide.has(f.slug) ? 'lg:col-span-2' : ''}`}
              >
                <Link
                  to={`/features/${f.slug}`}
                  onMouseEnter={useVideo ? () => playVideo(f.slug) : undefined}
                  onMouseLeave={useVideo ? () => stopVideo(f.slug) : undefined}
                  className="group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl border border-plum/15 p-7 shadow-[0_18px_44px_-18px_rgba(58,10,36,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-22px_rgba(58,10,36,.6)]"
                >
                  {/* Cards with a clip play it on hover and show their theme
                      image as the poster at rest; the rest are the still. */}
                  {useVideo ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[f.slug] = el
                      }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={art[f.slug] ?? f.screen}
                    >
                      <source src={vid} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={art[f.slug] ?? f.screen}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  {/* a pink wash, then a plum scrim so the copy stays readable */}
                  <span className="absolute inset-0 bg-pink-500/15" />
                  <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/65 to-plum/25" />

                  <div className="relative">
                    <h3 className="text-xl font-bold text-pure">{f.name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-pure/75">{f.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-pink-200">
                      Explore
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
