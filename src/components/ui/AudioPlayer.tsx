import { useRef, useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { tracks } from '../../data/audio'

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0)
    const onEnd = () => {
      setCurrent(null)
      setProgress(0)
    }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = (slug: string, src: string) => {
    const a = audioRef.current
    if (!a) return
    if (current === slug) {
      a.pause()
      setCurrent(null)
      return
    }
    a.src = src
    a.play().catch(() => {})
    setCurrent(slug)
  }

  return (
    <div>
      <audio ref={audioRef} preload="none" />
      <div className="grid gap-3 sm:grid-cols-2">
        {tracks.map((t, i) => {
          const active = current === t.slug
          return (
            <button
              key={t.slug}
              onClick={() => toggle(t.slug, t.src)}
              className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-transparent bg-brand-grad shadow-glow-sm'
                  : 'border-plum/10 bg-pink-50 hover:border-pink-500/30 hover:bg-pink-100'
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                  active ? 'bg-pure text-plum' : 'bg-brand-grad text-plum'
                }`}
              >
                {active ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{t.title}</span>
                <span className={`block text-xs ${active ? 'text-white/80' : 'text-white/45'}`}>
                  {t.mood}
                </span>
                {/* fake equalizer / progress */}
                <span className={`mt-2 flex h-1 w-full overflow-hidden rounded-full ${active ? 'bg-plum/25' : 'bg-pink-500/20'}`}>
                  <span
                    className={`h-full transition-[width] ${active ? 'bg-plum' : 'bg-brand-grad'}`}
                    style={{ width: active ? `${progress * 100}%` : '0%' }}
                  />
                </span>
              </span>
              <span className="hidden shrink-0 items-end gap-0.5 sm:flex" aria-hidden>
                {[0, 1, 2, 3].map((b) => (
                  /* `eq-bar` scales, so the origin has to sit on the baseline —
                     otherwise the bars grow out of their middles and dip below
                     the row instead of rising like a level meter. */
                  <span
                    key={b}
                    className={`w-0.5 origin-bottom rounded-full ${
                      active ? 'bg-pure' : 'bg-plum/30'
                    }`}
                    style={{
                      height: active ? `${6 + ((i + b) % 4) * 5}px` : '6px',
                      animation: active ? `eq-bar ${0.6 + b * 0.15}s ease-in-out infinite` : 'none',
                    }}
                  />
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
